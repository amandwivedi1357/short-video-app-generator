import { storage } from "@/config/FirebaseConfig";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";

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

        // Return the first image's URL
        const imageUrl = data.photos[0].src.original;
        const base64Image = "data:image/png;base64,"+await convertImage(imageUrl);
        const fileName = 'clipVerse-Files/'+Date.now()+"png";

        const storageRef  = ref(storage,fileName);
        await uploadString(storageRef,base64Image,'data_url');

        const downloadURL = await getDownloadURL(storageRef)
        console.log(downloadURL)
        return NextResponse.json({ result: downloadURL });
        //return NextResponse.json({ result: imageUrl });
        
    } catch (error) {
        console.error("Error in fetching images from Pexels:", error);
        return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 });
    }
}



const convertImage = async(imageUrl) => {
  try {
    const resp = await axios.get(imageUrl,{responseType:'arraybuffer'})
    const base64Image = Buffer.from(resp.data).toString('base64')
    return base64Image
  } catch (error) {
    console.log(error)
  }
}