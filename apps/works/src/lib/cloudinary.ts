// src/lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export async function getFestiveImages() {
  return await cloudinary.search
    .expression('folder:Dalim/Works/Creatives/festive/*')
    .sort_by('created_at', 'desc')
    .max_results(400)
    .execute();
}

export async function getPackagingImages() {
  return await cloudinary.search
    .expression('folder:Dalim/Works/Creatives/packaging/*')
    .sort_by('created_at', 'desc')
    .max_results(400)
    .execute();
}

export async function getLogosImages() {
  return await cloudinary.search
    .expression('folder:Dalim/Works/Creatives/logos/*')
    .sort_by('created_at', 'desc')
    .max_results(400)
    .execute();
}

export async function getUIUXImages() {
  return await cloudinary.search
    .expression('folder:Dalim/Works/Creatives/uiux/*')
    .sort_by('created_at', 'desc')
    .max_results(400)
    .execute();
}

export async function getMusicImages() {
  return await cloudinary.search
    .expression('folder:Dalim/Works/Creatives/music/*')
    .sort_by('created_at', 'desc')
    .max_results(400)
    .execute();
}

export async function getCampaignsImages() {
  return await cloudinary.search
    .expression('folder:Dalim/Works/Creatives/campaigns/*')
    .sort_by('created_at', 'desc')
    .max_results(400)
    .execute();
}

export async function getReelsImages() {
  return await cloudinary.search
    .expression('folder:Dalim/Works/Creatives/reels/*')
    .sort_by('created_at', 'desc')
    .max_results(400)
    .execute();
}

export async function getVideosImages() {
  return await cloudinary.search
    .expression('folder:Dalim/Works/Creatives/vid/*')
    .sort_by('created_at', 'desc')
    .max_results(400)
    .execute();
}

export async function get3DImages() {
  return await cloudinary.search
    .expression('folder:Dalim/Works/Creatives/3d/*')
    .sort_by('created_at', 'desc')
    .max_results(400)
    .execute();
}

export async function getCreativeImages() {
  return await cloudinary.search
    .expression('folder:Dalim/Works/Creatives/creative/*')
    .sort_by('created_at', 'desc')
    .max_results(400)
    .execute();
}