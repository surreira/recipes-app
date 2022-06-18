export type Slug = {
  _type: "slug";
  current: string;
};

export type Accessory = {
  _id: string;
  title: string;
};

export type Step = {
  _key: string;
  text: string;
  tip: boolean;
};

export interface Category {
  _id: string;
  _rev: string;
  _type: "category";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: Slug;
  recipes: Recipe[];
}

export interface Recipe {
  _id: string;
  title: string;
  slug: Slug;
  time: string;
  photo: string;
  category: string;
  categorySlug: string;
  ingredients: string[];
  steps: Step[];
  accessories: Accessory[];
}
