import React, { useState } from 'react'
import {Thumbnail} from "@remotion/player"
import RemotionVideo from './RemotionVideo'
import PlayerDialogue from './PlayerDialogue'

const VideoList = ({videoList}) => {
    const [openPlayerDialog, setopenPlayerDialog] = useState();
    const [videoId, setVideoId] = useState(null);

    const handleVideoClick = (id) => {
        setopenPlayerDialog(Date.now());
        setVideoId(id);
    }

    const handleDialogClose = () => {
        setVideoId(null);
    }

    return (
        <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {videoList?.map((video,idx)=>(
                <div
                key={video.id}
                onClick={() => handleVideoClick(video.id)}
                className='hover:scale-105 transition-all duration-300'>
                    <Thumbnail
                        component={RemotionVideo}
                        compositionWidth = {250}
                        compositionHeight = {350}
                        frameToDisplay={30}
                        durationInFrames={120}
                        fps={30}
                        inputProps={{
                            ...video,
                            setDurationInFrame:(v)=>console.log(v)
                        }}
                        style={{
                            borderRadius:'20px',
                            cursor:'pointer'
                        }}
                    />
                </div>
            ))}
            <PlayerDialogue 
                playVideo={openPlayerDialog} 
                videoId={videoId} 
                onClose={handleDialogClose}
            />
        </div>
    )
}

export default VideoList