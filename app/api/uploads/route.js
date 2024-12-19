import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads'); 
  try {
    const files = fs.readdirSync(uploadsDir).filter(file => file.endsWith('.jpg'));
    return NextResponse.json(
      files.map(file => ({
        name: file,
        url: `/uploads/${file}`,
      }))
    );
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load files' }, { status: 500 });
  }
}
