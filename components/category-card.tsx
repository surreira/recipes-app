import ResponsiveImage from "@/components/responsive-image";
import { Category } from "@/types/data";
import clsx from "clsx";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="h-48 rounded-md shadow-md cursor-pointer sm:h-44 active:shadow-none">
      <Link href={`/lista/${category.slug}`}>
        <a className="w-full h-full">
          <div
            className={clsx(
              "relative overflow-hidden rounded-md h-full",
              !category.photo && "bg-green-300"
            )}
          >
            {category.photo && (
              <ResponsiveImage
                alt={`Foto da categoria ${category.title}`}
                image={category.photo}
                className="object-cover rounded-md brightness-90"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <h2
                className={clsx(
                  "text-2xl font-semibold sm:text-3xl px-4 py-2 rounded-md",
                  category.photo
                    ? "text-slate-900 backdrop-blur-md bg-slate-50/50"
                    : "text-slate-800"
                )}
              >
                {category.title}
              </h2>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
