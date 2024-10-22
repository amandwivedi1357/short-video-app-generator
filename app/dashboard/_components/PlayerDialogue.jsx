import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {Player} from "@remotion/player"
import RemotionVideo from './RemotionVideo'
import { Button } from '@/components/ui/button'
import { db } from '@/config/db'
import { VideoData } from '@/config/schema'
import { eq } from 'drizzle-orm'
  
const PlayerDialogue = ({playVideo, videoId}) => {
    const [DurationInFrame, setDurationInFrame] = useState(100);
    const [openDialogue, setOpenDialogue] = useState(false);
    const [videoData, setVideoData] = useState(null);

    useEffect(() => {
        setOpenDialogue(playVideo);
        if (videoId) {
            GetVideoData();
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

    return (
        <Dialog open={openDialogue}>
            <DialogContent className='bg-white flex flex-col items-center gap-4'>
                <DialogHeader>
                    <DialogTitle className='font-bold text-2xl text-black'>Your Video Is Ready!</DialogTitle>
                    <DialogDescription>
                        {renderPlayer()}
                        <div className='flex gap-10 justify-center mt-5'>
                            <Button variant='ghost' className='border-black border-2 text-black hover:border-none font-semibold'>Cancel</Button>
                            <Button className='bg-purple-500 hover:bg-white hover:text-black hover:border-2 text-white font-semibold'>Export</Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default PlayerDialogue
