import FillImage from "@/components/fill-image";
import ClockIcon from "@/components/icons/clock";
import FoldersIcon from "@/components/icons/folders";
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
        <title key="page_title">{recipe.title} - ReceitasTM</title>
      </Head>

      <div className="flex flex-row h-screen pt-12 overflow-y-hidden text-gray-800">
        <div className="flex flex-col items-center justify-between w-1/3 mr-6">
          <div className="w-full h-56 mb-4 border border-green-700 rounded-md">
            <div className="relative bg-green-300 h-44 rounded-t-md">
              <FillImage
                alt={`Foto da receita ${recipe.title}`}
                image={recipe.photo}
                className="object-cover rounded-t-md"
              />
            </div>

            <div className="flex justify-between h-12 px-4">
              <div className="flex flex-row items-center">
                <FoldersIcon className="w-5 h-5 text-green-700" />
                <p className="pl-2 text-slate-700">{recipe.category}</p>
              </div>

              <div className="flex flex-row items-center">
                <ClockIcon className="w-5 h-5 text-green-700" />
                <p className="pl-1 text-slate-700">{recipe.time}</p>
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
