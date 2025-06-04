// src/lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export { cloudinary }


export async function getBackgroundsNeonImages() {
  return await cloudinary.search
    .expression('folder:Dalim/Graphic/Backgrounds/Neon/*')
    .sort_by('created_at', 'desc')
    .max_results(400)
    .execute();
}
 
 