import FillImage from "@/components/fill-image";
import ClockIcon from "@/components/icons/clock";
import FoldersIcon from "@/components/icons/folders";
import StepSlider from "@/components/step-slider";
import sanityClient from "@/lib/sanity";
import type { Accessory, Recipe, Step } from "@/types/data";
import clsx from "clsx";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import ReactMarkdown from "react-markdown";

interface ReceitaPageProps {
  recipe: Recipe;
}

export default function Receita({ recipe }: ReceitaPageProps): JSX.Element {
  return (
    <div className="max-w-5xl px-4 mx-auto">
      <Head>
        <title key="page_title">{recipe.title} - ReceitasTM</title>
      </Head>

      <div className="flex flex-col pt-6 text-gray-800 md:pt-12 md:flex-row md:h-screen md:overflow-y-hidden">
        <div className="flex flex-col w-full md:mr-6 md:w-1/3">
          <h1 className="block mb-2 text-xl font-bold md:hidden">
            {recipe.title}
          </h1>

          <div className="w-full rounded-md shadow-md h-44 lg:h-56">
            <div
              className={clsx(
                "relative overflow-hidden h-4/5 rounded-t-md",
                recipe.photo ? "bg-white" : "bg-green-300"
              )}
            >
              <FillImage
                alt={`Foto da receita ${recipe.title}`}
                image={recipe.photo}
                className="object-cover rounded-t-md"
              />
            </div>

            <div className="flex justify-between px-4 h-1/5">
              <div className="flex flex-row items-center">
                <FoldersIcon className="w-4 h-4 text-green-700 md:w-5 md:h-5" />
                <p className="pl-2 text-sm text-slate-700 md:text-base">
                  {recipe.category}
                </p>
              </div>

              <div className="flex flex-row items-center">
                <ClockIcon className="w-4 h-4 text-green-700 md:w-5 md:h-5" />
                <p className="pl-1 text-sm text-slate-700 md:text-base">
                  {recipe.time}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold">Ingredientes</h2>
            <ul className="ml-6 list-disc">
              {recipe.ingredients?.map((ingredient: string, index: number) => (
                <li key={index}>
                  <ReactMarkdown>{ingredient}</ReactMarkdown>
                </li>
              ))}
            </ul>
          </div>

          {recipe.accessories?.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Acessórios</h2>
              <ul className="ml-6 list-disc">
                {recipe.accessories.map((accessory: Accessory) => (
                  <li key={accessory._id}>{accessory.title}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <StepSlider title={recipe.title}>
          {recipe.steps.map((step: Step, index: number) => (
            <div
              key={step._key}
              id={`step-${index + 1}`}
              className="min-h-[192px] md:h-64 p-2 bg-green-100 border border-green-700 rounded-md md:p-4"
            >
              <h3 className="text-xl font-black md:text-3xl">
                {step.tip ? "Dica" : index + 1}.
              </h3>
              <div className="text-lg leading-relaxed md:pt-4 md:text-xl">
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
