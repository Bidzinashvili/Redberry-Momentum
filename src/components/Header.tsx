import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <div className='flex items-center justify-between py-[30px] px-[120px]'>
            <Link href={'/'}>
                <Image src={'/logo.svg'} alt='logo' width={210} height={38} />
            </Link>

            <div className='flex items-center gap-10'>
                <Link href={'/employee/create'}>
                    <button className='border-[#8338EC] border-[1px] text-[#212529] py-[10px] px-[20px] rounded-[5px] cursor-pointer'>თანამშრომლის შექმნა</button>
                </Link>
                <Link href={'/task/create'}>
                    <button className='bg-[#8338EC] rounded-[5px] text-white py-[10px] px-[20px] cursor-pointer'>შექმენი ახალი დავალება</button>
                </Link>
            </div>
        </div>
    )
}
