import PocketBase from 'pocketbase';
const pb = new PocketBase('http://localhost:8090');
try {
  await pb.admins.authWithPassword('admin@mahanoroactu.mg', 'changeme123');
  
  async function migrateImageUrls(collectionName) {
    console.log(`Migrating imageUrls for ${collectionName}...`);
    const records = await pb.collection(collectionName).getFullList();
    
    for (const record of records) {
      const oldValue = record.imageUrl;
      if (oldValue && typeof oldValue === 'string' && oldValue.startsWith('http')) {
        // Extract filename from URL
        const url = new URL(oldValue);
        const filename = url.pathname.split('/').pop();
        
        // Update the record with just the filename
        await pb.collection(collectionName).update(record.id, {
          imageUrl: filename
        });
        console.log(`Updated ${collectionName} record ${record.id}: ${oldValue} -> ${filename}`);
      }
    }
    console.log(`Finished migrating ${collectionName}`);
  }
  
  await migrateImageUrls('articles');
  await migrateImageUrls('events');
  
  console.log('Image URL migration completed!');
} catch(e) {
  console.error('Error:', e.message);
  if (e.originalError) {
    console.error('Original error:', e.originalError.response?.data || e.originalError);
  }
}