import Header from "@/components/header";
import ClockIcon from "@/components/icons/clock";
import sanityClient from "@/lib/sanity";
import type { Category, Recipe } from "@/types/data";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

interface ListaPageProps {
  category: Category;
}

export default function Lista({ category }: ListaPageProps): JSX.Element {
  return (
    <div className="max-w-5xl px-4 mx-auto mb-8 md:mb-24">
      <Head>
        <title key="page_title">Lista {category.title} - ReceitasTM</title>
      </Head>

      <Header title={category.title} />

      <div className="grid grid-cols-1 gap-4 mt-6 lg:gap-6 sm:mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                  <ClockIcon className="w-4 h-4 mr-1 text-green-700" />
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
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = await sanityClient.fetch(
    `*[_type == 'category' && slug.current == $slug]{
      _id,
      title,
      'recipes': *[_type == 'recipe' && references(^._id)]{
        _id,
        title,
        'slug': slug.current,
        time,
      } | order(title asc),
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
  const categories = await sanityClient.fetch(`*[_type == 'category']{
    'slug': slug.current
  }`);

  return {
    paths: categories.map((category: Category) => `/lista/${category.slug}`),
    fallback: false,
  };
};
