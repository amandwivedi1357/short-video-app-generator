import { AssemblyAI } from 'assemblyai';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { audioFileUrl } = await req.json();
    
    if (!audioFileUrl) {
      return NextResponse.json({ error: 'audioFileUrl is required' }, { status: 400 });
    }

    if (!process.env.ASSEMBLYAI_API_KEY) {
      return NextResponse.json({ error: 'ASSEMBLYAI_API_KEY is not set in environment variables' }, { status: 500 });
    }

    const client = new AssemblyAI({
      apiKey: process.env.ASSEMBLYAI_API_KEY,
    });

    console.log('Initiating transcription for:', audioFileUrl);

    const data = {
      audio: audioFileUrl
    }

    console.log('Transcript created, waiting for completion...');

    const transcript = await client.transcripts.transcribe(data);

    console.log('Transcription completed:',transcript.text);

    // if (result.status !== 'completed') {
    //   return NextResponse.json({ error: `Transcription failed with status: ${result.status}` }, { status: 500 });
    // }

    return NextResponse.json({ result: transcript.words });
  } catch (error) {
    console.error('Error in generate-captions:', error);
    return NextResponse.json({ error: error.message || 'An unknown error occurred' }, { status: 500 });
  }
}

