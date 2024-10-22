import { AssemblyAI } from 'assemblyai';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Transcription ID is required' }, { status: 400 });
  }

  const client = new AssemblyAI({
    apiKey: process.env.ASSEMBLYAI_API_KEY,
  });

  try {
    const transcript = await client.transcripts.get(id);

    if (transcript.status === 'completed') {
      return NextResponse.json({ status: 'completed', result: transcript.words });
    } else if (transcript.status === 'error') {
      return NextResponse.json({ status: 'error', error: 'Transcription failed' });
    } else {
      return NextResponse.json({ status: 'processing' });
    }
  } catch (error) {
    console.error('Error checking transcription status:', error);
    return NextResponse.json({ error: error.message || 'An unknown error occurred' }, { status: 500 });
  }
}