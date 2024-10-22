import { NextResponse } from "next/server"
import { chatSession } from "../../../config/AiModel"

export async function POST(req) {
    try {
        const { prompt } = await req.json()
        console.log(prompt)
        
        // Send the prompt to the chat session
        const result = await chatSession.sendMessage(prompt)
        
        // Await and parse the result properly
        const responseText = await result.response.text(); // .text() returns a Promise
        const parsedResult = JSON.parse(responseText); // Parse it as JSON
        
        // Return the parsed JSON result
        return NextResponse.json({ 'result': parsedResult });
    } catch (error) {
        console.error('Error:', error); // Log the error for debugging
        return NextResponse.json({ 'Error': error.message }); // Return the error message
    }
}
