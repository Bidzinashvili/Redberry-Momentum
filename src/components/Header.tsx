import Image from 'next/image'
import React from 'react'

export default function Header() {
    return (
        <div className='flex items-center justify-between py-[30px] px-[120px]'>
            <Image src={'/logo.svg'} alt='logo' width={210} height={38} />

            <div className='flex items-center gap-10'>
                <button className='border-[#8338EC] border-[1px] text-[#212529] py-[10px] px-[20px] rounded-[5px] cursor-pointer'>თანამშრომლის შექმნა</button>
                <button className='bg-[#8338EC] rounded-[5px] text-white py-[10px] px-[20px] cursor-pointer'>შექმენი ახალი დავალება</button>
            </div>
        </div>
    )
}
