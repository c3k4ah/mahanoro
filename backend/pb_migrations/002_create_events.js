migrate((app) => {
  const collection = new Collection({
    name: "events",
    type: "base",
    fields: [
      {
        name: "title",
        type: "text",
        required: true,
      },
      {
        name: "description",
        type: "text",
      },
      {
        name: "location",
        type: "text",
      },
      {
        name: "startDate",
        type: "date",
      },
      {
        name: "endDate",
        type: "date",
      },
      {
        name: "imageUrl",
        type: "url",
      },
      {
        name: "isArchived",
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
  return app.deleteCollection("events");
});
