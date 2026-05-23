import PocketBase from 'pocketbase';
const pb = new PocketBase('http://localhost:8090');
try {
  await pb.admins.authWithPassword('admin@mahanoroactu.mg', 'changeme123');
  
  async function replaceImageUrlField(collectionName) {
    console.log(`Processing ${collectionName}...`);
    const col = await pb.collections.getOne(collectionName);
    
    // Find the imageUrl field
    const imageUrlField = col.fields.find(f => f.name === 'imageUrl');
    if (!imageUrlField) {
      console.log(`No imageUrl field found in ${collectionName}`);
      return;
    }
    
    console.log(`Found imageUrl field with ID: ${imageUrlField.id}`);
    
    // Create new fields array without the old imageUrl field
    const newFields = col.fields.filter(f => f.name !== 'imageUrl');
    
    // Add the new imageUrl field of type file
    newFields.push({
      name: 'imageUrl',
      type: 'file',
      required: false,
      options: {
        'maxSize': 5242880, // 5MB
        'mimeTypes': ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        'thumbs': [],
        'protected': false
      }
    });
    
    // Update the collection with the new fields array
    col.fields = newFields;
    const updatedCol = await pb.collections.update(col.id, col);
    console.log(`Updated ${collectionName} collection with new fields`);
    
    // Verify
    const verifyCol = await pb.collections.getOne(collectionName);
    const verifyField = verifyCol.fields.find(f => f.name === 'imageUrl');
    console.log(`${collectionName} imageUrl field type now: ${verifyField?.type}`);
  }
  
  await replaceImageUrlField('articles');
  await replaceImageUrlField('events');
  
  console.log('\nAll collections updated successfully!');
} catch(e) {
  console.error('Error:', e.message);
  if (e.originalError) {
    console.error('Original error:', e.originalError.response?.data || e.originalError);
  }
}