import { NextResponse } from 'next/server';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../config/FirebaseConfig';

export async function POST(request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    const apiKey = process.env.ELEVEN_API_KEYS;
    const voiceId = '9BWtsMINqrJLrRacOk9x';

    const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

    // Make request to Eleven Labs TTS API
    const response = await axios.post(
      apiUrl,
      {
        text: text,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      },
      {
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
      }
    );

    const audioBuffer = Buffer.from(response.data);

    // Generate a unique ID for the file
    const id = Date.now().toString();

    // Create a reference to the file location in Firebase Storage
    const storageRef = ref(storage, `clipVerse-Files/${id}.mp3`);

    // Set metadata for the file
    const metadata = {
      contentType: 'audio/mp3'  // Set the MIME type to audio/mp3
    };

    // Upload the audio buffer to Firebase Storage with metadata
    await uploadBytes(storageRef, audioBuffer, metadata);

    // Get the download URL for the uploaded file
    const downloadURL = await getDownloadURL(storageRef);

    console.log('Audio file uploaded to Firebase. Download URL:', downloadURL);

    return NextResponse.json({
      message: 'Audio file created and uploaded successfully',
      audioUrl: downloadURL
    });
  } catch (error) {
    console.error('Error generating and uploading audio:', error);
    return NextResponse.json({ error: 'Failed to create and upload audio file', details: error.message }, { status: 500 });
  }
}