/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // remove field
  collection.fields.removeById("url2548032275")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "file2548032275",
    "maxSelect": 0,
    "maxSize": 0,
    "mimeTypes": null,
    "name": "imageUrl",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": null,
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // add field
  collection.fields.addAt(6, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "url2548032275",
    "name": "imageUrl",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  // remove field
  collection.fields.removeById("file2548032275")

  return app.save(collection)
})
