import { algoliaIndex } from "@/lib/algolia";
import sanity from "@/lib/sanity";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export const RECIPE_PROJECTION: string = `
  {
    _type,
    _rev,
    title,
    time,
    "objectID": _id,
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
  }
`;

const QUERY: string = `
  *[
    _type == "recipe"
    && !(_id in path("drafts.**"))
    && defined(slug.current)
  ]${RECIPE_PROJECTION}
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Must be POST request." });
  }

  if (req.headers["x-authentication"] !== process.env.ALGOLIA_WEBHOOK_SECRET) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  let recipes;
  try {
    recipes = await sanity.fetch(QUERY);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to fetch Sanity data to index." });
    return;
  }

  try {
    if (recipes) {
      await algoliaIndex.saveObjects(recipes);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to index data in Algolia." });
    return;
  }

  res.json({ message: "Indexing success" });
}
