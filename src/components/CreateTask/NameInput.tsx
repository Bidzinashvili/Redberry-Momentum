import React from 'react'

interface Props {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    validateField: (name: string, value: any) => void;
    error?: string;
}

export default function NameInput({ name, setName, validateField, error }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setName(val);
        validateField('name', val);
    };

    return (
        <div className='flex flex-col'>
            <label>სათაური*</label>
            <input
                value={name}
                onChange={handleChange}
                className={`w-[550px] mt-[6px] h-[45px] px-[10px] rounded-[5px] bg-white border-[1px] outline-none 
                    ${error ? 'border-red-500' : 'border-[#DEE2E6]'}`}
                type="text"
            />
            {error ? (
                <p className='text-[10px] font-[350] text-red-700 mt-[4px]'>{error}</p>
            ) : (
                <>
                    <p className='text-[10px] font-[350] text-[#6C757D] mt-[4px]'>მინიმუმ 2 სიმბოლო</p>
                    <p className='text-[10px] font-[350] text-[#6C757D] mt-[2px]'>მაქსიმუმ 255 სიმბოლო</p>
                </>
            )}
        </div>
    )
}
