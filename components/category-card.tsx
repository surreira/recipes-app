import FillImage from "@/components/fill-image";
import { Category } from "@/types/data";
import clsx from "clsx";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/lista/${category.slug}`}>
      <a
        className={clsx(
          "relative h-48 sm:h-40 overflow-hidden rounded-md shadow-md shadow-slate-200 cursor-pointer active:shadow-none",
          !category.photo && "bg-green-300"
        )}
      >
        <FillImage
          image={category.photo}
          className="object-cover w-full h-full brightness-75"
          alt={`Foto da categoria ${category.title}`}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <p
            className={clsx(
              "text-2xl font-semibold sm:text-3xl px-4 py-2 rounded-md",
              category.photo
                ? "text-slate-900 backdrop-blur-md bg-slate-50/50"
                : "text-slate-800"
            )}
          >
            {category.title}
          </p>
        </div>
      </a>
    </Link>
  );
}
