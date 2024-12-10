import React from 'react'
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion'
const RemotionVideo = ({script, imageList, audioFileUrl, captions, setDurationInFrame}) => {
    const {fps} = useVideoConfig();
    const frame = useCurrentFrame()
    // Calculate the total duration in frames based on captions
    const getVideoDurationFrame = () => {
        const totalFrames = captions[captions.length - 1]?.end / 1000 * fps;
        setDurationInFrame(totalFrames);  // Update the parent state with duration
        return totalFrames;
    };

    // Cache the duration result
    const totalFrames = getVideoDurationFrame();

    const getCurrentCaption = ()=>{
        const currentTime = frame/30*1000;
        const currentCaption = captions.find((word)=>currentTime>=word.start && currentTime<=word.end)
        return currentCaption?currentCaption?.text:'';
    }
    return (
        <AbsoluteFill className='bg-black'>
            {imageList?.map((item, idx) => 
            {
                const startTime = (idx * totalFrames / imageList?.length)
                const duration = getVideoDurationFrame();

                const scale =(index)=> interpolate(
                    frame,
                    [startTime,startTime+duration/2,startTime+duration],  //zoom in /zoom-out logic
                    index%2==0?[1,1.8,1]:[1.8,1,1.8],
                    {extrapolateLeft:'clamp',extrapolateRight:'clamp'}
                )
                return (
                <Sequence
                    key={idx}
                    from={startTime} // Start time for each image
                    durationInFrames={totalFrames / imageList?.length} // Each image lasts for an equal portion of the total duration
                >
                    <AbsoluteFill style={{
                        justifyContent:'center',
                        alignItems:'center'
                    }}>

                    <Img
                        src={item}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transform:`scale(${scale(idx)})`
                        }}
                    />
                    <AbsoluteFill style={{
                        color:'white',
                        justifyContent:'center',
                        top:undefined,
                        bottom:50,
                        height:150,
                        textAlign:'center',
                        width:'100%'
                    }}>
                        <div className='p-2 bg-black'>

                       <h2 className='text-2xl text-white font-bold'>{getCurrentCaption()}</h2> 
                        </div>
                        </AbsoluteFill>
                    </AbsoluteFill>
                </Sequence>
)})}
            <Audio
                src={audioFileUrl}
            />

        </AbsoluteFill>
    );
};

export default RemotionVideo;

