import React, { useEffect, useState, useCallback } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {Player} from "@remotion/player"
// import {renderMedia} from "@remotion/renderer"
import RemotionVideo from './RemotionVideo'
import { useAudioData, useVideoConfig } from '@remotion/media-utils'

import { Button } from '@/components/ui/button'
import { db } from '@/config/db'
import { VideoData } from '@/config/schema'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'
  
const PlayerDialogue = ({playVideo, videoId}) => {
    const [DurationInFrame, setDurationInFrame] = useState(100);
    const [openDialogue, setOpenDialogue] = useState(false);
    const [videoData, setVideoData] = useState(null);
    const router = useRouter()

    useEffect(() => {
        // Only open the dialog if videoId is provided
        if (videoId) {
            setOpenDialogue(true);
            GetVideoData();
        } else {
            setOpenDialogue(false);
        }
    }, [playVideo, videoId]);

    const GetVideoData = async () => {
        const result = await db.select().from(VideoData)
            .where(eq(VideoData.id, videoId));
        setVideoData(result[0]);
    }

    const renderPlayer = () => {
        if (!videoData) return null;

        return (
            <Player
                component={RemotionVideo}
                durationInFrames={Number(DurationInFrame.toFixed(0))}
                compositionWidth={300}
                compositionHeight={450}
                fps={30}
                controls={true}
                inputProps={{
                    ...videoData,
                    setDurationInFrame: ((frameValue) => setDurationInFrame(frameValue))
                }}
            />
        );
    }

    const handleExport = useCallback(async () => {
        if (!videoData) return;
    
        // try {
        //     const outputLocation = `/public/temp/${videoId}-export.mp4`;  // Save to a public directory
    
        //     // Render the video using renderMedia
        //     const videoBlob = await renderMedia({
        //         composition: {
        //             component: RemotionVideo,
        //             durationInFrames: Number(DurationInFrame.toFixed(0)),
        //             fps: 30,
        //             height: 450,
        //             width: 300,
        //             defaultProps: {
        //                 ...videoData
        //             }
        //         },
        //         codec: 'h264',
        //         outputLocation,
        //     });
    
        //     // Generate a URL for the rendered video blob
        //     const videoURL = URL.createObjectURL(videoBlob);
    
        //     // Save the file to user's computer using FileSaver.js
        //     saveAs(videoURL, `${videoData.title || 'exported-video'}.mp4`);
    
        //     // Optionally close the dialog
        //     setOpenDialogue(false);
        // } catch (error) {
        //     console.error("Error exporting video:", error);
        // }
    }, [videoData, videoId, DurationInFrame]);

    return (
        <Dialog open={openDialogue} onOpenChange={setOpenDialogue}>
            <DialogContent className='bg-white flex flex-col items-center gap-4'>
                <DialogHeader>
                    <DialogTitle className='font-bold text-2xl text-black'>Your Video Is Ready!</DialogTitle>
                    <DialogDescription>
                        {renderPlayer()}
                        <div className='flex gap-10 justify-center mt-5'>
                            <Button onClick={()=>{router.replace('/dashboard');
                                setOpenDialogue(false)

                            }} variant='ghost' className='border-black border-2 text-black hover:border-none font-semibold'>Cancel</Button>
                            <Button className='bg-purple-500 hover:bg-white hover:text-black hover:border-2 text-white font-semibold' onClick={handleExport}>Export</Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default PlayerDialogue
