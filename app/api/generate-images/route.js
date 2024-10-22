import { storage } from "@/config/FirebaseConfig";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";
import axios from 'axios';

export async function POST(req) {
    try {
        const { prompt } = await req.json();

        // Validate if the prompt is provided
        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        // Validate if the Pexels API key is set in the environment
        if (!process.env.PEXELS) {
            return NextResponse.json({ error: "Pexels API key is not set" }, { status: 500 });
        }

        // Fetch images from Pexels API
        const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(prompt)}&per_page=1`, {
            headers: {
                Authorization: process.env.PEXELS
            }
        });

        // Parse the response from Pexels API
        const data = await response.json();

        // Check if images are available in the response
        if (!data.photos || data.photos.length === 0) {
            return NextResponse.json({ error: "No images found" }, { status: 404 });
        }

        const imageUrl = data.photos[0].src.original;
        
        // Validate the image by trying to fetch it
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        if (imageResponse.status !== 200 || imageResponse.data.byteLength < 1000) {
            throw new Error('Invalid or corrupted image received from Pexels');
        }

        const base64Image = Buffer.from(imageResponse.data).toString('base64');
        const fileName = `clipVerse-Files/${Date.now()}.png`;

        const storageRef = ref(storage, fileName);
        await uploadString(storageRef, `data:image/png;base64,${base64Image}`, 'data_url');

        const downloadURL = await getDownloadURL(storageRef);
        console.log("Image uploaded, download URL:", downloadURL);

        return NextResponse.json({ result: downloadURL });
    } catch (error) {
        console.error("Error in generating/uploading image:", error);
        return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 });
    }
}
