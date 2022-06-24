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

export interface SanityImage {
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
}

export interface Category {
  _id: string;
  _type: "category";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: Slug;
  recipes: Recipe[];
  position: number;
}

export interface Recipe {
  _id: string;
  title: string;
  slug: Slug;
  time: string;
  photo: SanityImage;
  category: string;
  categorySlug: string;
  ingredients: string[];
  steps: Step[];
  accessories: Accessory[];
}
