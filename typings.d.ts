export type Slug = {
  _type: "slug";
  current: string;
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
}
