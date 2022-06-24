import Header from "@/components/header";
import GitHubLogo from "@/components/icons/github";
import sanityClient from "@/lib/sanity";
import type { GetStaticProps } from "next";
import Link from "next/link";
import { Category } from "../typings";

interface HomePageProps {
  categories: Category[];
}

export default function Home({ categories }: HomePageProps): JSX.Element {
  return (
    <div className="flex flex-col items-center max-w-5xl min-h-screen px-4 mx-auto text-slate-800">
      <Header />

      <main className="grid w-full max-w-3xl grid-cols-2 gap-4 mt-8 mb-16 sm:mt-16 lg:grid-cols-3">
        {categories.map((category: Category) => (
          <div
            className="w-full bg-green-300 border border-green-700 rounded-md shadow-md h-28 sm:w-60 sm:mx-auto active:shadow-none"
            key={category._id}
          >
            <Link href={`/lista/${category.slug}`}>
              <a className="flex items-center justify-center w-full h-full text-2xl font-semibold text-center sm:text-3xl text-slate-800">
                {category.title}
              </a>
            </Link>
          </div>
        ))}
      </main>

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
  }`);

  return {
    props: {
      categories,
    },
  };
};
