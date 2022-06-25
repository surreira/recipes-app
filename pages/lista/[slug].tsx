import Header from "@/components/header";
import RecipeCard from "@/components/recipe-card";
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

      <section className="grid w-full grid-cols-1 gap-4 mt-4 lg:gap-6 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {category.recipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </section>

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
        photo,
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
