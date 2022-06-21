import type { GetStaticProps } from "next";
import Link from "next/link";
import sanityClient from "../lib/sanity";
import { Category } from "../typings";

interface PageProps {
  categories: Category[];
}

const Home = ({ categories }: PageProps) => {
  return (
    <div className="flex flex-col items-center max-w-5xl min-h-screen px-4 mx-auto text-slate-800">
      <header className="flex flex-col mt-4 text-center md:mt-24">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
          Receitas{" "}
          <span className="inline-block px-4 py-2 font-black text-green-400 rounded-3xl bg-slate-800">
            TM
          </span>
        </h1>
        <div className="relative mt-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-400">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </span>
          </div>
          <input
            type="text"
            name="price"
            id="price"
            className="block w-full h-12 max-w-md pl-12 pr-12 text-2xl leading-none border border-slate-800 md:h-16 md:text-4xl focus:ring-2 focus:outline-none focus:ring-green-300 focus:border-green-300"
            placeholder="Pesquisa"
          />
        </div>
      </header>

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
    </div>
  );
};

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

export default Home;
