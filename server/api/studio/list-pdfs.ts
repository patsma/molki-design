import { defineEventHandler } from 'h3';
import { readdir } from 'fs/promises';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  try {
    const publicDir = join(process.cwd(), 'public', 'pdf');
    const files = await readdir(publicDir);
    return files.filter((file) => file.endsWith('.pdf')).map((file) => `/pdf/${file}`);
  } catch (error) {
    console.error('Error reading PDF directory:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to list PDF files',
    });
  }
});
