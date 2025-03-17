import React, { useEffect } from 'react'

interface Props {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    validateField: (field: string, value: any) => void;
    error?: string;
    label: string;
    storageKey?: string;
    inputName: string;
    labelSize: 14 | 16;
}

export default function NormalInput({ value, setValue, validateField, error, label, storageKey, inputName, labelSize }: Props) {

    useEffect(() => {
        if (storageKey) {
            setValue(localStorage.getItem(storageKey) || '')
        }
    }, [storageKey, setValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setValue(val);
        if (storageKey) {
            localStorage.setItem(storageKey, val);
        }
        validateField(inputName, val);
    };

    return (
        <div className='flex flex-col'>
            <label className={`text-[${labelSize}px]`}>{label}*</label>
            <input
                name={inputName}
                value={value}
                onChange={handleChange}
                className={`w-full mt-[6px] h-[45px] px-[10px] rounded-[5px] bg-white border-[1px] outline-none 
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
