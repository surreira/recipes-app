import CategoryCard from "@/components/category-card";
import Header from "@/components/header";
import GitHubLogo from "@/components/icons/github";
import sanityClient from "@/lib/sanity";
import { Category } from "@/types/data";
import type { GetStaticProps } from "next";
import Link from "next/link";

interface HomePageProps {
  categories: Category[];
}

export default function Home({ categories }: HomePageProps): JSX.Element {
  return (
    <div className="flex flex-col items-center max-w-5xl min-h-screen px-4 mx-auto text-slate-800">
      <Header />

      <section className="grid w-full grid-cols-1 gap-4 mt-4 mb-16 lg:gap-6 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category: Category) => (
          <CategoryCard category={category} key={category._id} />
        ))}
      </section>

      <footer className="flex items-center justify-center my-10">
        <Link href="https://github.com/surreira/recipes-app">
          <a className="text-gray-200">
            <GitHubLogo className="w-6 h-6 sm:w-8 sm:h-8" />
          </a>
        </Link>
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

  return {
    props: {
      categories,
    },
  };
};
