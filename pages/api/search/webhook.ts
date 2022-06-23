import { algoliaIndex } from "@/lib/algolia";
import sanityClient from "@/lib/sanity";
import { isValidRequest } from "@sanity/webhook";
import type { NextApiRequest, NextApiResponse } from "next";
import indexer from "sanity-algolia";
import { RECIPE_PROJECTION } from "./index-all";

type Data = {
  message: string;
};

const secret = process.env.SANITY_WEBHOOK_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!isValidRequest(req, secret!)) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const sanityAlgolia = indexer(
    {
      recipe: {
        index: algoliaIndex,
        projection: RECIPE_PROJECTION,
      },
    },
    (document) => document
  );

  return sanityAlgolia
    .webhookSync(sanityClient as any, req.body)
    .then(() => res.json({ message: "success." }))
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong." });
    });
}
