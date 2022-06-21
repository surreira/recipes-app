import type { NextApiRequest, NextApiResponse } from "next";
import indexer from "sanity-algolia";
import { algoliaIndex } from "../../../lib/algolia";
import sanityClient from "../../../lib/sanity";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const sanityAlgolia = indexer(
    {
      recipe: {
        index: algoliaIndex,
        projection: `{
        title,
        time,
        ingredients,
        "mainImageRef": photo.asset._ref,
        "steps": steps[tip == false].text,
        "category": category->{
          _id,
          title
        },
        "accessories": accessories[]->{
          _id,
          title
        }
      }`,
      },
    },
    (document) => document
  );

  return sanityAlgolia
    .webhookSync(sanityClient as any, req.body)
    .then(() => res.json({ message: "success." }))
    .catch(() => res.status(500).json({ message: "Something went wrong." }));
}
