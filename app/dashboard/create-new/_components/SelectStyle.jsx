import Image from 'next/image';
import React, { useState } from 'react';

const SelectStyle = ({ onUserSelect }) => {
    const styleOptions = [
        {
            name: 'realistic',
            img: '/real.jpg'
        },
        {
            name: 'Cartoon',
            img: '/cartoon.jpeg'
        },
        {
            name: 'Comic',
            img: '/comic.jpg'
        },
        {
            name: 'watercolor',
            img: '/Watercolor.jpeg'
        },
        {
            name: 'GTA',
            img: '/gta.jpeg'
        },
    ];
    const [selectedOption, setSelectedOption] = useState();

    return (
        <div className='mt-7'>
        <h2 className='font-bold text-xl text-purple-600 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 '>
        Style</h2>
            <p className='text-gray-500'>Select your Style</p>
            <div className='w-full mt-3 grid grid-cols-2 md:grid-cols-1 lg:grid-cols-5 xl:grid-cols-6 gap-5'>
                {styleOptions.map((item, idx) => (
                    <div
                        className={`relative hover:scale-105 transition-all cursor-pointer dark:shadow-purple dark:shadow-sm rounded-lg 
                        ${selectedOption === item.name 
                            ? 'ring-4 ring-purple-500 shadow-lg shadow-purple-500/50' 
                            : 'border border-gray-300'}`} 
                        key={idx}
                        onClick={() => {
                            setSelectedOption(item.name);
                            onUserSelect('imageStyle', item.name);
                        }}
                    >
                        <Image 
                            src={item.img} 
                            width={130} 
                            height={130} 
                            className='h-56 object-cover rounded-lg w-full'
                        />
                        <h2 className='absolute p-1 text-white font-semibold text-center rounded-b-lg bg-black bottom-0 w-full'>
                            {item.name}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectStyle;
