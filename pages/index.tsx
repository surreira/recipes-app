import CategoryCard from "@/components/category-card";
import Header from "@/components/header";
import GitHubLogo from "@/components/icons/github";
import RecipeCard from "@/components/recipe-card";
import sanityClient from "@/lib/sanity";
import { Category, Recipe } from "@/types/data";
import type { GetStaticProps } from "next";

interface HomePageProps {
  categories: Category[];
  recipes: Recipe[];
}

export default function Home({
  categories,
  recipes,
}: HomePageProps): JSX.Element {
  return (
    <div className="flex flex-col items-center max-w-5xl min-h-screen px-4 mx-auto text-slate-800">
      <Header />

      <section className="grid w-full grid-cols-1 gap-4 mt-4 mb-16 lg:gap-6 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category: Category) => (
          <CategoryCard category={category} key={category._id} />
        ))}
      </section>

      {recipes.length > 0 && (
        <section className="w-full mt-6 mb-16">
          <h2 className="text-2xl font-bold text-slate-800">
            Últimas receitas
          </h2>
          <div className="grid w-full grid-cols-1 gap-4 mt-4 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe: Recipe) => (
              <RecipeCard recipe={recipe} key={recipe._id} />
            ))}
          </div>
        </section>
      )}

      <footer className="flex items-center justify-center my-10">
        <a
          href="https://github.com/surreira/recipes-app"
          target="_blank"
          rel="noreferrer"
          className="text-gray-200"
        >
          <GitHubLogo className="w-6 h-6 sm:w-8 sm:h-8" />
        </a>
      </footer>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const categories = await sanityClient.fetch(`*[_type == 'category']{
    _id,
    title,
    'slug': slug.current,
    position,
    photo,
  } | order(position asc)`);

  const latest = await sanityClient.fetch(`* [_type == "recipe"]{
    _id,
    title,
    time,
    "slug": slug.current,
    'category': category->title,
    photo,
    _createdAt,
  } | order(_createdAt desc)[0..2]`);

  return {
    props: {
      categories,
      recipes: latest,
    },
  };
};
