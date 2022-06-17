export default {
  name: "recipe",
  title: "Recipe",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Name",
      type: "string",
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
    {
      name: "photo",
      title: "Photo",
      type: "image",
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    },
    {
      name: "category",
      title: "category",
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "time",
      title: "Time",
      type: "string",
    },
    {
      name: "ingredients",
      title: "Ingredients",
      type: "array",
      of: [
        {
          type: "markdown",
        },
      ],
    },
    {
      name: "steps",
      title: "Steps",
      type: "array",
      of: [{ type: "step" }],
    },
    {
      name: "accessories",
      title: "Accessories",
      type: "array",
      of: [{ type: "reference", to: { type: "accessory" } }],
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
  ],
};
