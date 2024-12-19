import fs from 'fs';
import path from 'path';

export async function GET(request) {
  const uploadDir = path.resolve('./public/uploads');

  try {
    const files = await fs.promises.readdir(uploadDir);
    
    const fileCount = files.filter(file => {
      const filePath = path.join(uploadDir, file);
      return fs.statSync(filePath).isFile();
    }).length;

    return new Response(JSON.stringify({ count: fileCount }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error reading directory:', error);
    return new Response(JSON.stringify({ error: 'Unable to read the directory' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}