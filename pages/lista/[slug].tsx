import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import sanityClient from "../../lib/sanityClient";
import type { Category, Recipe } from "../../typings";

interface PageProps {
  category: Category;
}

const Lista = ({ category }: PageProps) => {
  return (
    <div className="max-w-5xl px-4 mx-auto mb-8 md:mb-24">
      <Head>
        <title>Lista {category.title} - ReceitasTM</title>
      </Head>

      <header className="flex flex-col mt-4 text-center md:mt-24">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
          {category.title}
        </h1>
      </header>

      <div className="grid grid-cols-1 gap-4 mt-8 lg:gap-6 md:mt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {category.recipes.map((recipe: Recipe) => (
          <article
            key={recipe._id}
            className="border border-green-700 rounded-lg shadow-md active:shadow-none h-28 sm:h-32 md:h-52"
          >
            <Link href={`/receita/${recipe.slug}`}>
              <a className="w-full h-full">
                <div className="flex items-start bg-green-300 rounded-t-lg h-3/4">
                  <h2 className="w-full px-2 pt-2 text-xl font-semibold text-gray-900 sm:text-2xl md:text-3xl">
                    {recipe.title.length > 35
                      ? recipe.title.substring(0, 32) + "..."
                      : recipe.title}
                  </h2>
                </div>
                <div className="flex items-center px-2 h-1/4">
                  <svg
                    className="w-4 h-4 mr-1 text-green-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  {recipe.time?.length !== 0 && (
                    <p className="text-sm">{recipe.time}</p>
                  )}
                </div>
              </a>
            </Link>
          </article>
        ))}
      </div>

      <div className="flex mt-12">
        <Link href="/">
          <a className="px-4 py-2 text-green-700 border border-green-700 rounded-md active:bg-green-100 active:shadow-inner">
            Voltar
          </a>
        </Link>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = await sanityClient.fetch(
    `*[_type == 'category' && visibility == true && slug.current == $slug]{
      _id,
      title,
      'recipes': *[_type == 'recipe' && references(^._id)]{
        _id,
        title,
        'slug': slug.current,
        time,
      },
    }[0]`,
    { slug: params?.slug }
  );

  return {
    props: {
      category,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories =
    await sanityClient.fetch(`*[_type == 'category' && visibility == true]{
    'slug': slug.current
  }`);

  return {
    paths: categories.map((category: Category) => `/lista/${category.slug}`),
    fallback: false,
  };
};

export default Lista;
