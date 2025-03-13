import React from 'react'

interface Props {
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    validateField: (name: string, value: any) => void;
    error?: string;
}

export default function DescriptionInput({ description, setDescription, validateField, error }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setDescription(val);
        validateField('description', val);
    };

    return (
        <div className='flex flex-col'>
            <label>აღწერა*</label>
            <textarea
                value={description}
                onChange={handleChange}
                className={`resize-none mt-[6px] h-[133px] w-[550px] p-[10px] rounded-[5px] bg-white border-[1px] outline-none 
                    ${error ? 'border-red-500' : 'border-[#DEE2E6]'}`}
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
