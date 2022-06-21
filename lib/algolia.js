import algoliasearch from "algoliasearch";

export const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID || "",
  process.env.ALGOLIA_ADMIN_KEY || ""
);

export const algoliaIndex = algoliaClient.initIndex(
  process.env.ALGOLIA_RECIPE_INDEX || ""
);

export const algoliaIndexName = process.env.ALGOLIA_RECIPE_INDEX || "";
