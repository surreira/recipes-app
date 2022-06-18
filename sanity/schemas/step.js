export default {
  name: "step",
  title: "Step",
  type: "object",
  fields: [
    {
      name: "text",
      title: "Text",
      type: "markdown",
    },
    {
      name: "tip",
      title: "Tip",
      type: "boolean",
      initialValue: false,
    },
  ],
};
