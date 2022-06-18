export interface Category {
  _id: string;
  _rev: string;
  _type: "category";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: Slug;
}

export type Slug = {
  _type: "slug";
  current: string;
};
