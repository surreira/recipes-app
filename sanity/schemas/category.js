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
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "position",
      title: "Position",
      type: "number",
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
        {
          name: "attribution",
          title: "Attribution",
          type: "string",
        },
      ],
    },
  ],
};
