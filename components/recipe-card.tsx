import FillImage from "@/components/fill-image";
import ClockIcon from "@/components/icons/clock";
import { Recipe } from "@/types/data";
import clsx from "clsx";
import Link from "next/link";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps): JSX.Element {
  return (
    <article className="h-48 border border-green-700 rounded-lg shadow-md active:shadow-none sm:h-52 xl:h-56">
      <Link href={`/receita/${recipe.slug}`}>
        <a className="w-full h-full">
          <div className="relative overflow-hidden bg-green-300 rounded-t-lg h-3/4">
            <FillImage
              alt={`Foto da receita ${recipe.title}`}
              image={recipe.photo}
              className="object-cover rounded-t-sm"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2
                className={clsx(
                  "text-xl font-semibold text-slate-900 sm:text-2xl md:text-3xl py-2 px-4 rounded-md mx-2 sm:mx-4 md:mx-8 text-center",
                  recipe.photo && "backdrop-blur-md bg-slate-50/50"
                )}
              >
                {recipe.title.length > 35
                  ? recipe.title.substring(0, 32) + "..."
                  : recipe.title}
              </h2>
            </div>
          </div>
          <div className="flex items-center px-2 h-1/4">
            <ClockIcon className="w-4 h-4 mr-1 text-green-700" />
            {recipe.time?.length !== 0 && (
              <p className="text-sm">{recipe.time}</p>
            )}
          </div>
        </a>
      </Link>
    </article>
  );
}