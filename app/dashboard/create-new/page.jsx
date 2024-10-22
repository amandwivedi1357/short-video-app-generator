'use client'
import React, { useContext, useEffect, useState } from 'react'
import SelectTopic from "./_components/SelectTopic"
import SelectStyle from "./_components/SelectStyle"
import SelectDuration from "./_components/SelectDuration"
import CustomLoading from "./_components/CustomLoading"
import { toast } from "@/hooks/use-toast"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { VideoDataContext } from '@/app/_context/VideoDataContext'
// import { db } from '@/config/db'

import { useUser } from '@clerk/nextjs'
import { VideoData } from '@/config/schema'
import PlayerDialogue from "../_components/PlayerDialogue"
import { db } from '@/config/db'
import { useRouter } from 'next/navigation'
const Page = () => {
  const [loading, setLoading] = useState(false);
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState([]);
  const [videoScript, setVideoScript] = useState();
  const {videoData,setVideoData}  = useContext(VideoDataContext)
  const {user}  = useUser()
  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [formData, setFormData] = useState({
    duration: '',
    topic: '',
    imageStyle: ''
  });

  // const videoSCRIPT = [
  // {
  //   "imagePrompt": "A bustling medieval marketplace in the heart of a European city. People are buying and selling goods, children are playing, and merchants are hawking their wares. It is a vibrant scene full of life and activity. Realistic style, high detail.",
  //   "ContentText": "In the heart of medieval Europe, a bustling marketplace hummed with activity. Merchants, their stalls overflowing with colorful fabrics, spices, and handcrafted wares, called out to passersby. The air was thick with the smells of roasting meats, fresh bread, and exotic perfumes."
  // },
  // {
  //   "imagePrompt": "A young woman, dressed in simple but elegant clothing, walks through the marketplace with a determined look on her face. She carries a small satchel and her eyes scan the crowds as she searches for something. Realistic style, focus on her face and expression.",
  //   "ContentText": "Among the throngs of people, a young woman named Elara navigated the crowded stalls, her eyes focused on a specific goal. She carried a small satchel, its contents a secret, but her determined expression revealed the importance of her mission."
  // },
  // {
  //   "imagePrompt": "An old man, with a long white beard and piercing blue eyes, sits at a small table tucked away in a corner of the marketplace. He holds a worn book in his hand and appears to be deep in thought. Realistic style, soft lighting, focus on his hands and the book.",
  //   "ContentText": "In a secluded corner, a wizened old man with a long, flowing white beard sat engrossed in a worn leather-bound book. His piercing blue eyes seemed to hold centuries of knowledge, his hands tracing the faded script with reverence."
  // },
  // {
  //   "imagePrompt": "Elara approaches the old man and hands him the satchel. He opens it, revealing a golden key, and his eyes widen in surprise. Dramatic lighting, close-up shot on the key.",
  //   "ContentText": "Elara, having finally located the old man, approached him with a nervous tremor in her steps.  She presented him with the satchel, revealing a single, gleaming golden key. The old man's eyes widened in surprise, the gravity of the moment sinking in."
  // },
  // {
  //   "imagePrompt": "The old man takes the key and nods solemnly. He then reaches into his own satchel and pulls out a rolled-up parchment. He unfolds it, revealing a detailed map with markings in red ink. Dramatic lighting, focus on the map and the key.",
  //   "ContentText": "With a solemn nod, the old man took the key. He reached into his own satchel and pulled out a rolled-up parchment, the intricate markings of a map in red ink visible against the worn surface. The key and the map, together, held the key to a forgotten secret."
  // },
  // {
  //   "imagePrompt": "Elara looks at the map with a mixture of hope and fear. The scene fades to black. Dramatic lighting, focus on her expression.",
  //   "ContentText": "Elara, her heart pounding with a mixture of hope and fear, looked at the map. Its intricate lines pointed towards a forgotten truth, a hidden treasure, a secret buried deep in the past. The story was just beginning..."
  // }
//]
  

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue)
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))
  }

  const onCreateClickHandler = () => {
    getVideoScript()
    //generateImages()
  }


  /*
    videoScriptGeneration
  */

  const getVideoScript = async () => {
    setLoading(true)
    const prompt = `Write a script to generate ${formData.duration} video on topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as fields. No Plain text.`;
    try {
      const res = await axios.post('/api/get-video-script', { prompt: prompt });
      console.log('API Response:', res.data);
      if (res.data && res.data.result) {
        setVideoScript(res.data.result);
        await generateAudioFile(res.data.result);
        // await generateAudioCaption('https://firebasestorage.googleapis.com/v0/b/clipverse-72194.appspot.com/o/clipVerse-Files%2F1729407888326.mp3?alt=media&token=296fd0e8-7fe3-4972-bede-831301bcc090')
        // Import the toast function at the top of your file
        
        setVideoData(prev=>({
          ...prev,
          'script':res.data.result
        }))
        // Show success toast
        toast({
          title: "Success",
          description: "Video script has been generated successfully.Audio File is in process.Please wait...",
        });
      } else {
        toast({
          title: "Error",
          description: "Invalid response from get-video-script API.",
        });
        throw new Error('Invalid response from get-video-script API');
      }
    } catch (error) {
      console.error("Error getting video script:", error);
      // You might want to set an error state here to display to the user
    } finally {
      
      setLoading(false)
    }
  }


  // Audio File generation
  const generateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let fullScript = '';
  
    try {
      const scriptObject = typeof videoScriptData === 'string' ? JSON.parse(videoScriptData) : videoScriptData;
  
      scriptObject.forEach(scene => {
        if (scene && scene.ContentText) {
          fullScript += scene.ContentText + ' ';
        }
      });
  
      const response = await fetch('/api/generate-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: fullScript }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(`Failed to create audio: ${data.error || response.statusText}`);
      }
  
      console.log('Audio file saved at:', data.audioUrl);
      setAudioFileUrl(data.audioUrl);
       generateAudioCaption(data.audioUrl,videoScriptData);  // for future refrence
       setVideoData(prev=>({
        ...prev,
        'audioFileUrl':data.audioUrl
      }))
    } catch (error) {
      console.error('Error generating audio:', error);
    } finally {
      setLoading(false);
      
    }
   };


  //  Audio Caption Generation
  const generateAudioCaption = async (fileUrl,videoScriptData) => {
    setLoading(true);
    try {
      console.log('Generating captions for:', fileUrl);
      const response = await axios.post('/api/generate-captions', {
        audioFileUrl: fileUrl,
      });
      console.log('Caption generation response:', response.data);
      toast({
        title: "Success",
        description: "Captions generated successfully.",
      });
      setCaptions(response?.data?.result)
      response?.data?.result&&generateImages(videoScriptData)
      setVideoData(prev=>({
        ...prev,
        'captions':response?.data?.result
      }))
      
    } catch (error) {
      console.error('Error generating captions:', error);
      let errorMessage = 'An unknown error occurred';
      if (error.response) {
        console.error('Error response:', error.response.data);
        errorMessage = error.response.data.error || error.response.statusText;
      } else if (error.request) {
        console.error('Error request:', error.request);
        errorMessage = 'No response received from server';
      } else {
        console.error('Error message:', error.message);
        errorMessage = error.message;
      }
      toast({
        title: "Error",
        description: "Failed to generate captions: " + errorMessage,
      });
    } finally {
      setLoading(false);
     console.log(captions)
    }
  };

// Images Generation
  const generateImages = async (videoScriptData) => {
    setLoading(true);
    let images = [];
    try {
      for (const element of videoScriptData) {
        try {
          const res = await axios.post('/api/generate-images', {
            prompt: element?.imagePrompt
          });

          const imageUrl = res.data.result;
          console.log("Generated image URL:", imageUrl);

          // Validate the image URL
          if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.startsWith('http')) {
            throw new Error('Invalid image URL received');
          }

          images.push(imageUrl);
        } catch (error) {
          console.error("Error generating individual image:", error);
          // Instead of breaking the loop, we'll add a placeholder or skip this image
          images.push(null); // or a placeholder URL
        }
      }

      console.log("All generated images:", images);
      setVideoData(prev => ({
        ...prev,
        'imageList': images.filter(Boolean) // Remove any null values
      }));
      setImageList(images.filter(Boolean));

      toast({
        title: "Success",
        description: "Images generated successfully.",
      });
    } catch (error) {
      console.error("Error in image generation process:", error);
      toast({
        title: "Error",
        description: "Failed to generate all images. Some may be missing.",
      });
    } finally {
      setLoading(false);
    }
  }
useEffect(() => {
  console.log(videoData)
  console.log(Object.keys(videoData).length)
  if(videoData?.script && videoData?.audioFileUrl && videoData?.captions && videoData?.imageList){
    saveVideoData(videoData)
  }
}, [videoData]);

const saveVideoData = async(videoData)=>{
setLoading(true)

try {
  const result = await db.insert(VideoData).values({
    script: videoData?.script,
    audioFileUrl: videoData?.audioFileUrl,
    captions: videoData?.captions,
    imageList: videoData?.imageList,
    createdBy: user?.primaryEmailAddress.emailAddress
  }).returning({ id: VideoData?.id })

  console.log(result)
  setVideoId(result[0].id)
  setPlayVideo(true)  // Only set to true after successful video creation
  
  toast({
    title: "Success",
    description: "Video created successfully!",
  });
} catch (error) {
  console.error("Error saving video data:", error);
  toast({
    title: "Error",
    description: "Failed to save video data. Please try again.",
  });
} finally {
  setLoading(false)
}
}
  
  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-purple-500 text-center'>
        Create New
      </h2>
      <div className='mt-10 shadow-md dark:shadow-purple-500 dark:shadow-md rounded-md p-10'>
        <SelectTopic onUserSelect={onHandleInputChange}/>
        <SelectStyle onUserSelect={onHandleInputChange}/>
        <SelectDuration onUserSelect={onHandleInputChange}/>
        <Button
          onClick={onCreateClickHandler}
          className='bg-purple-500 w-full mt-4 dark:text-white font-semibold dark:hover:text-black'>
          Create Video
        </Button>
      </div>
      <CustomLoading loading={loading}/>
      {videoId && <PlayerDialogue playVideo={playVideo} videoId={videoId}/>}
    </div>
  )
}

export default Page
