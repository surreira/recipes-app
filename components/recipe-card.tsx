import ClockIcon from "@/components/icons/clock";
import ResponsiveImage from "@/components/responsive-image";
import { Recipe } from "@/types/data";
import clsx from "clsx";
import Link from "next/link";
import FoldersIcon from "./icons/folders";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps): JSX.Element {
  return (
    <article className="h-48 rounded-md shadow-md active:shadow-none sm:h-52 xl:h-56">
      <Link href={`/receita/${recipe.slug}`}>
        <a className="w-full h-full">
          <div
            className={clsx(
              "relative overflow-hidden rounded-t-md h-3/4",
              !recipe.photo && "bg-green-300"
            )}
          >
            <ResponsiveImage
              alt={`Foto da receita ${recipe.title}`}
              className="object-cover object-center rounded-t-sm brightness-95"
              image={recipe.photo}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2
                className={clsx(
                  "text-xl font-semibold text-slate-900 sm:text-2xl md:text-3xl p-2 rounded-md mx-8 md:mx-12 text-center",
                  recipe.photo && "backdrop-blur-md bg-slate-50/50"
                )}
              >
                {recipe.title.length > 35
                  ? recipe.title.substring(0, 32) + "..."
                  : recipe.title}
              </h2>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full px-2 h-1/4">
            {recipe.category && (
              <div className="flex flex-row items-center">
                <FoldersIcon className="w-5 h-5 text-green-700" />
                <p className="pl-2 text-sm md:text-base">{recipe.category}</p>
              </div>
            )}

            <div className="flex flex-row items-center">
              <ClockIcon className="w-5 h-5 text-green-700" />
              {recipe.time?.length !== 0 && (
                <p className="pl-2 text-sm md:text-base">{recipe.time}</p>
              )}
            </div>
          </div>
        </a>
      </Link>
    </article>
  );
}
