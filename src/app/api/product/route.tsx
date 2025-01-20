import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../../lib/cloudinaryConfig';
import { prisma } from '../../../../prisma/client';
import multer from 'multer';
import { Readable } from 'stream';

// Multer setup for storing images temporarily in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadMiddleware = upload.single('image');

// Helper function to upload to Cloudinary
interface CloudinaryResult {
  secure_url: string;
}

const uploadToCloudinary = async (imageBuffer: Buffer): Promise<CloudinaryResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    const readableStream = new Readable();
    readableStream.push(imageBuffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

// API route handler
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, since we're handling it manually
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    uploadMiddleware(req, res, async (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(400).json({ error: 'File upload error' });
      }

      try {
        const { name, description, price, categoryId, subCategoryId, status } = req.body;

        // Check if image was uploaded
        if (!req.file) {
          return res.status(400).json({ error: 'File upload is required.' });
        }

        // Upload image to Cloudinary
        const result = await uploadToCloudinary(req.file.buffer);

        // Save the product to the database
        const newProduct = await prisma.product.create({
          data: {
            name,
            description,
            price: parseFloat(price),
            categoryId: parseInt(categoryId, 10),
            subCategoryId: subCategoryId ? parseInt(subCategoryId, 10) : null,
            status: status || 'ACTIVE',
            imagePath: result.secure_url, // Save the Cloudinary URL in DB
          },
        });

        return res.status(201).json(newProduct);
      } catch (error) {
        console.error('Error creating product:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}