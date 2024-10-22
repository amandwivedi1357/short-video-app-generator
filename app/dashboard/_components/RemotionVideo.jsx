import React from 'react'
import { AbsoluteFill, Audio, Img, Sequence, useVideoConfig } from 'remotion'

const RemotionVideo = ({script, imageList, audioFileUrl, captions, setDurationInFrame}) => {
    const {fps} = useVideoConfig();
    
    // Calculate the total duration in frames based on captions
    const getVideoDurationFrame = () => {
        const totalFrames = captions[captions.length - 1]?.end / 1000 * fps;
        setDurationInFrame(totalFrames);  // Update the parent state with duration
        return totalFrames;
    };

    // Cache the duration result
    const totalFrames = getVideoDurationFrame();

    return (
        <AbsoluteFill className='bg-black'>
            {imageList?.map((item, idx) => (
                <Sequence
                    key={idx}
                    from={(idx * totalFrames / imageList?.length)} // Start time for each image
                    durationInFrames={totalFrames / imageList?.length} // Each image lasts for an equal portion of the total duration
                >
                    <Img
                        src={item}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </Sequence>
            ))}
            <Audio
                src={audioFileUrl}
            />
        </AbsoluteFill>
    );
};

export default RemotionVideo;

