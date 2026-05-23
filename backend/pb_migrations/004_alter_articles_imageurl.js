migrate((app) => {
  const collection = app.findCollectionByNameOrId("articles");
  
  // Update the imageUrl field type from url to file
  const imageUrlField = collection.fields.find(f => f.name === "imageUrl");
  if (imageUrlField) {
    imageUrlField.type = "file";
    // For file type, we might want to specify options like accepted mime types, max size, etc.
    imageUrlField.options = {
      "maxSize": 5242880, // 5MB
      "mimeTypes": ["image/jpeg", "image/png", "image/gif", "image/webp"]
    };
  }
  
  return app.save(collection);
}, (app) => {
  // Revert: change back to url
  const collection = app.findCollectionByNameOrId("articles");
  
  const imageUrlField = collection.fields.find(f => f.name === "imageUrl");
  if (imageUrlField) {
    imageUrlField.type = "url";
    imageUrlField.options = {};
  }
  
  return app.save(collection);
});
