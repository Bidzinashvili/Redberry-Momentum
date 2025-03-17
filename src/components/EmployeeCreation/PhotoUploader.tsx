'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Props {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function PhotoUploader({ value, setValue }: Props) {
    const [preview, setPreview] = useState<string>(value);
    const [error, setError] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            if (file.size > 600 * 1024) {
                setError('ფაილის ზომა უნდა იყოს 600KB-ზე ნაკლები.');
                setTimeout(() => {
                    setError('')
                }, 3000)
                return;
            }

            setError('');
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                setPreview(imageUrl);
                setValue(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemove = () => {
        setPreview('');
        setValue('');
        setError('');
    };

    return (
        <div className="flex flex-col items-center">
            <label className="text-[#343A40] font-medium mb-2 w-full text-[14px]">ავატარი*</label>
            <div className="relative w-full h-[120px] flex items-center justify-center border border-dashed border-[#CED4DA] rounded-lg p-2">
                {preview ? (
                    <div className="relative w-[88px] h-[88px] rounded-full">
                        <Image src={preview} alt="Uploaded Avatar" layout="fill" objectFit="cover" className="rounded-full" />
                        <button
                            className="w-[24px] h-[24px] absolute bottom-0 right-[3px] p-[5px] bg-white rounded-[50%] z-10 cursor-pointer border border-[#6C757D]"
                            onClick={handleRemove}
                        >
                            <Image src="/delete-icon.svg" alt="Delete" width={14} height={14} />
                        </button>
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center w-[120px] h-[120px] cursor-pointer">
                        <Image src="/upload.svg" alt="Upload" width={24} height={24} />
                        <span className="text-sm text-gray-600 mt-2">ატვირთე ფოტო</span>
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleFileChange}
                        />
                    </label>
                )}
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
}
