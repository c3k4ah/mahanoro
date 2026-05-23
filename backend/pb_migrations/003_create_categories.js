migrate((app) => {
  const collection = new Collection({
    name: "categories",
    type: "base",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
      },
      {
        name: "slug",
        type: "text",
        required: true,
        unique: true,
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
  return app.deleteCollection("categories");
});
