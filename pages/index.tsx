import CategoryCard from "@/components/category-card";
import Header from "@/components/header";
import ClockIcon from "@/components/icons/clock";
import FoldersIcon from "@/components/icons/folders";
import GitHubLogo from "@/components/icons/github";
import RecipeCard from "@/components/recipe-card";
import ResponsiveImage from "@/components/responsive-image";
import sanityClient from "@/lib/sanity";
import { Category, Recipe } from "@/types/data";
import type { GetStaticProps } from "next";
import Link from "next/link";

interface HomePageProps {
  categories: Category[];
  recipes: Recipe[];
  featured: Recipe;
}

export default function Home({
  categories,
  recipes,
  featured,
}: HomePageProps): JSX.Element {
  return (
    <div className="flex flex-col items-center max-w-5xl min-h-screen px-4 mx-auto text-slate-800">
      <Header />

      <section className="grid w-full grid-cols-1 gap-4 mt-4 mb-16 lg:gap-6 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category: Category) => (
          <CategoryCard category={category} key={category._id} />
        ))}
      </section>

      {featured && (
        <section className="w-full mt-6 mb-16">
          <div className="relative my-6 mt-4 overflow-hidden md:h-80">
            <h2 className="mb-4 text-2xl font-bold md:hidden text-slate-500">
              Receita em destaque
            </h2>
            <div className="inset-y-0 right-0 w-full md:absolute md:h-80 md:w-2/3 lg:w-3/5">
              <ResponsiveImage
                image={featured.photo}
                width={600}
                height={320}
                className="object-cover rounded-md brightness-90"
              />
            </div>
            <div className="relative h-full max-w-md">
              <svg
                className="absolute inset-y-0 right-0 z-0 hidden h-full text-white transform translate-x-1/3 lg:translate-x-1/2 w-80 md:block"
                fill="currentColor"
                viewBox="0 0 100 100"
              >
                <polygon points="0,0 100,0 50,100 0,100" />
              </svg>
              <div className="flex flex-col items-start justify-center h-full text-slate-700">
                <div className="z-10">
                  <h2 className="hidden mb-2 text-lg font-semibold md:block text-slate-500">
                    Receita em destaque
                  </h2>
                  <h3 className="mt-2 mb-1 text-2xl font-black md:mt-0 md:text-4xl">
                    {featured.title}
                  </h3>
                  <div className="flex flex-row space-x-8">
                    <div className="flex flex-row items-center">
                      <FoldersIcon className="w-4 h-4" />
                      <p className="ml-1">{featured.category}</p>
                    </div>
                    <div className="flex flex-row items-center">
                      <ClockIcon className="w-4 h-4" />
                      <p className="ml-1">{featured.time}</p>
                    </div>
                  </div>
                </div>

                <Link href={`/receita/${featured.slug}`}>
                  <a className="inline-block px-4 py-2 mt-6 text-white bg-green-700 border border-green-700 rounded-md shadow-md md:py-3 md:mt-12 active:bg-green-300 active:border active:border-green-400 active:text-slate-700 active:shadow-none">
                    Abrir receita
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {recipes.length > 0 && (
        <section className="w-full mt-6 mb-16">
          <h2 className="text-2xl font-bold text-slate-500">
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

  const featured = await sanityClient.fetch(
    `* [_type == "recipe" && _id == $id]{
      _id,
      title,
      time,
      "slug": slug.current,
      'category': category->title,
      photo,
      _createdAt,
    }[0]`,
    { id: "lzCsMQsnnXcROFuyO3emxw" }
  );

  return {
    props: {
      categories,
      recipes: latest,
      featured,
    },
  };
};
