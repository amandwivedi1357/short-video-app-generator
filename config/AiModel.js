const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

  export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "write a script to generate 30 seconds video on topic : Interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"imagePrompt\": \"A bustling marketplace in ancient Rome, with merchants selling goods and people going about their daily lives. Focus on the details, including the clothing, architecture, and expressions on people's faces.\",\n    \"ContentText\": \"In the heart of ancient Rome, a vibrant marketplace buzzed with activity. Merchants hawked their wares, the air thick with the scent of spices and the murmur of bartering. Amidst the chaos, a young boy named Gaius clutched a small clay figurine, his eyes wide with wonder.\"\n  },\n  {\n    \"imagePrompt\": \"A portrait of Gaius, a young boy with inquisitive eyes and a determined expression. He is dressed in simple clothing, but there is a spark of intelligence in his gaze.\",\n    \"ContentText\": \"Gaius was a curious boy, always eager to learn. He spent his days observing the world around him, absorbing knowledge like a sponge.\"\n  },\n  {\n    \"imagePrompt\": \"Gaius standing in front of a large library, awestruck by the vast collection of scrolls. He is looking up at the towering shelves, filled with knowledge from across the empire.\",\n    \"ContentText\": \"One day, Gaius stumbled upon the city's grand library. The sight of countless scrolls stacked high on shelves filled him with awe. He yearned to unlock the secrets hidden within those ancient texts.\"\n  },\n  {\n    \"imagePrompt\": \"A close-up shot of Gaius's hands tracing the delicate script on a scroll. He is engrossed in reading, his brow furrowed in concentration.\",\n    \"ContentText\": \"He spent hours poring over the scrolls, his young mind expanding with each new discovery. He learned about history, philosophy, and the wonders of the natural world.\"\n  },\n  {\n    \"imagePrompt\": \"Gaius presenting his findings to a group of scholars, his voice passionate and his words flowing effortlessly. The scholars listen intently, their faces reflecting admiration and surprise.\",\n    \"ContentText\": \"As Gaius grew older, his knowledge surpassed that of many scholars. He became known throughout Rome for his insightful interpretations of ancient texts.\"\n  },\n  {\n    \"imagePrompt\": \"A panoramic shot of Rome at night, with the Colosseum illuminated in the background. The city is alive with light and activity, showcasing its grandeur and power.\",\n    \"ContentText\": \"Gaius's life mirrored the rise and fall of Rome, a city that was both magnificent and flawed.\"\n  },\n  {\n    \"imagePrompt\": \"Gaius, now an elderly man, sitting in a quiet garden, his face etched with the wisdom of a lifetime. He is looking at a young boy reading a scroll, a gentle smile on his face.\",\n    \"ContentText\": \"In his later years, Gaius dedicated his life to teaching others, passing on the knowledge he had accumulated over a lifetime.\"\n  },\n  {\n    \"imagePrompt\": \"A close-up shot of Gaius's hand placing a scroll in the hands of the young boy. The boy's eyes light up with excitement, reflecting the same spark of curiosity that Gaius once possessed.\",\n    \"ContentText\": \"His legacy lived on in the minds of countless students who learned from his teachings, carrying his spirit of curiosity and the thirst for knowledge into the future.\"\n  }\n]\n```\n\n**How to Use This JSON Data:**\n\n1. **Image Generation:** Use the `imagePrompt` field to generate images using an AI image generator like Midjourney, DALL-E, or Stable Diffusion.\n2. **Video Editing:**\n   - Import the generated images into a video editing software.\n   - Add the corresponding `ContentText` as voiceover or subtitles for each scene.\n   - Combine the images and text with appropriate transitions and music to create a 30-second video.\n\n**Note:**\n\n- The image prompts are designed to create realistic images that fit the historical context.\n- You can adjust the prompts to suit your specific style and preferences.\n- The `ContentText` provides a basic story structure, but you can modify it to fit your creative vision. \n"},
          ],
        },
      ],
    });
  
 
  
  