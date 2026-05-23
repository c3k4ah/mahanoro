import PocketBase from 'pocketbase';
const pb = new PocketBase('http://localhost:8090');
try {
  await pb.admins.authWithPassword('admin@mahanoroactu.mg', 'changeme123');
  
  async function replaceImageUrlWithFile(collectionName) {
    console.log(`Processing ${collectionName}...`);
    const col = await pb.collections.getOne(collectionName);
    
    // Find the imageUrl field
    const imageUrlField = col.fields.find(f => f.name === 'imageUrl');
    if (!imageUrlField) {
      console.log(`No imageUrl field found in ${collectionName}`);
      return;
    }
    
    console.log(`Found imageUrl field with ID: ${imageUrlField.id}`);
    
    // Delete the old imageUrl field
    await pb.collections.deleteField(col.id, imageUrlField.id);
    console.log(`Deleted old imageUrl field from ${collectionName}`);
    
    // Add a new imageUrl field of type file
    const newField = {
      name: 'imageUrl',
      type: 'file',
      required: false,
      // Optional: set options for file type (max size, mime types, etc.)
      options: {
        'maxSize': 5242880, // 5MB
        'mimeTypes': ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        'thumbs': [],
        'protected': false
      }
    };
    
    await pb.collections.createField(col.id, newField);
    console.log(`Added new imageUrl field (file type) to ${collectionName}`);
    
    // Verify
    const updatedCol = await pb.collections.getOne(collectionName);
    const updatedField = updatedCol.fields.find(f => f.name === 'imageUrl');
    console.log(`${collectionName} imageUrl field type now: ${updatedField?.type}`);
  }
  
  await replaceImageUrlWithFile('articles');
  await replaceImageUrlWithFile('events');
  
  console.log('\nAll collections updated successfully!');
} catch(e) {
  console.error('Error:', e.message);
  if (e.originalError) {
    console.error('Original error:', e.originalError.response?.data || e.originalError);
  }
}