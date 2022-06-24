import RecipeImage from "@/components/recipe-image";
import StepSlider from "@/components/step-slider";
import sanityClient from "@/lib/sanity";
import type { Accessory, Recipe, Step } from "@/types/data";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface ReceitaPageProps {
  recipe: Recipe;
}

export default function Receita({ recipe }: ReceitaPageProps): JSX.Element {
  return (
    <div className="max-w-5xl px-4 mx-auto">
      <Head>
        <title>{recipe.title} - ReceitasTM</title>
      </Head>

      <div className="flex flex-row h-screen pt-12 overflow-y-hidden text-gray-800">
        <div className="flex flex-col items-center justify-between w-1/3 mr-6">
          <div className="w-full h-56 mb-4 border border-green-700 rounded-md">
            <div className="relative bg-green-300 h-44 rounded-t-md">
              <RecipeImage
                alt={`Foto da receita ${recipe.title}`}
                image={recipe.photo}
                className="rounded-t-md"
              />
            </div>

            <div className="flex justify-between h-12 px-4">
              <div className="flex flex-row items-center">
                <svg
                  className="w-5 h-5 text-green-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  ></path>
                </svg>
                <p className="pl-2 text-gray-600">{recipe.category}</p>
              </div>

              <div className="flex flex-row items-center">
                <svg
                  className="w-5 h-5 text-green-300"
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
                <p className="pl-2 text-gray-600">{recipe.time}</p>
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-semibold text-center">
                Ingredientes
              </h2>
              <ul className="ml-6 list-disc">
                {recipe.ingredients?.map(
                  (ingredient: string, index: number) => (
                    <li key={index}>
                      <ReactMarkdown>{ingredient}</ReactMarkdown>
                    </li>
                  )
                )}
              </ul>
            </div>

            {recipe.accessories?.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-center">
                  Acessórios
                </h2>
                <ul className="ml-6 list-disc">
                  {recipe.accessories.map((accessory: Accessory) => (
                    <li key={accessory._id}>{accessory.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="inline-block w-full mb-6">
            <Link href={`/lista/${recipe.categorySlug}`}>
              <a className="px-4 py-2 text-green-700 border border-green-700 rounded-md active:bg-green-100 active:shadow-inner">
                Voltar
              </a>
            </Link>
          </div>
        </div>

        <StepSlider title={recipe.title}>
          {recipe.steps.map((step: Step, index: number) => (
            <div
              key={step._key}
              id={`step-${index + 1}`}
              className="h-64 p-4 bg-green-100 border border-green-700 rounded-md"
            >
              <h3 className="text-3xl font-black">
                {step.tip ? "Dica" : index + 1}.
              </h3>
              <div className="pt-4 text-xl leading-relaxed">
                <ReactMarkdown>{step.text}</ReactMarkdown>
              </div>
            </div>
          ))}
        </StepSlider>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const recipe = await sanityClient.fetch(
    `*[_type == 'recipe' && slug.current == $slug][0]{
    title,
    time,
    photo,
    'category': category->title,
    'categorySlug': category->slug.current,
    ingredients,
    steps,
    accessories[]->{_id,title},
  }`,
    { slug: params?.slug }
  );

  return {
    props: {
      recipe,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const recipes = await sanityClient.fetch(`*[_type == 'recipe']{
    'slug': slug.current
  }`);

  return {
    paths: recipes.map((recipe: Recipe) => `/receita/${recipe.slug}`),
    fallback: false,
  };
};
