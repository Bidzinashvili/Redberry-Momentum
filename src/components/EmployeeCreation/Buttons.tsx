import React from 'react'

interface Props {
    onSubmit: () => void
}

export default function Buttons({ onSubmit }: Props) {
    return (
        <div className='flex items-center justify-end gap-[22px]'>
            <button className='text-[#343A40] border border-[#8338EC] py-[11.5px] px-[16px] cursor-pointer'>გაუქმება</button>
            <button onClick={onSubmit} className='text-white text-[18px] bg-[#8338EC] px-[20px] py-[10px] cursor-pointer'>დაამატე თანამშრომელი</button>
        </div>
    )
}
