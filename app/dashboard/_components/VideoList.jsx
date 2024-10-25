import React, { useState } from 'react'
import {Thumbnail} from "@remotion/player"
import RemotionVideo from './RemotionVideo'
import PlayerDialogue from './PlayerDialogue'
import { Button } from '@/components/ui/button'

const VideoList = ({videoList, onDeleteVideos}) => {
    const [openPlayerDialog, setopenPlayerDialog] = useState();
    const [videoId, setVideoId] = useState(null);
    const [selectedVideos, setSelectedVideos] = useState([]);

    const handleVideoClick = (id) => {
        setopenPlayerDialog(Date.now());
        setVideoId(id);
    }

    const handleDialogClose = () => {
        setVideoId(null);
    }

    const handleCheckboxChange = (id) => {
        setSelectedVideos(prev => 
            prev.includes(id) ? prev.filter(videoId => videoId !== id) : [...prev, id]
        );
    }

    return (
        <div>
            <div className='mb-4 flex justify-between items-center'>
                <h3 className='font-semibold text-lg'>Your Videos</h3>
                {selectedVideos.length > 0 && (
                    <Button
                        onClick={() => onDeleteVideos(selectedVideos)}
                        className="px-6 py-2 my-3 text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
                    >
                        <span>Delete Selected</span>
                        <span className="bg-white text-purple-600 rounded-full px-2 py-1 text-xs font-bold">
                            {selectedVideos.length}
                        </span>
                    </Button>
                )}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center'>
                {videoList?.map((video,idx)=>(
                    <div
                    key={video.id}
                    className='relative'>
                        <input
                            type="checkbox"
                            checked={selectedVideos.includes(video.id)}
                            onChange={() => handleCheckboxChange(video.id)}
                            className='absolute top-2 left-2 z-10 w-6 h-6'
                        />
                        <div
                            onClick={() => handleVideoClick(video.id)}
                            className='hover:scale-105 transition-all duration-300 dark:shadow-lg rounded-lg dark:shadow-purple-500'>
                            <Thumbnail
                                component={RemotionVideo}
                                compositionWidth = {200}
                                compositionHeight = {300}
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
                    </div>
                ))}
            </div>
            <PlayerDialogue 
                playVideo={openPlayerDialog} 
                videoId={videoId} 
                onClose={handleDialogClose}
            />
        </div>
    )
}

export default VideoList
