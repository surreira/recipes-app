export default {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Name",
      type: "string",
    },
    {
      name: "visibility",
      title: "Visibility",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
  ],
};
