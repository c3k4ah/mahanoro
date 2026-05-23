migrate((app) => {
  const collection = new Collection({
    name: "articles",
    type: "base",
    fields: [
      {
        name: "slug",
        type: "text",
        required: true,
        unique: true,
      },
      {
        name: "title",
        type: "text",
        required: true,
      },
      {
        name: "category",
        type: "text",
      },
      {
        name: "excerpt",
        type: "text",
      },
      {
        name: "content",
        type: "editor",
      },
      {
        name: "imageUrl",
        type: "url",
      },
      {
        name: "publishedAt",
        type: "date",
      },
      {
        name: "isFeatured",
        type: "bool",
      },
    ],
    indexes: [],
    listRule: "",
    viewRule: "",
    createRule: null,
    updateRule: null,
    deleteRule: null,
  });

  return app.save(collection);
}, (app) => {
  return app.deleteCollection("articles");
});
