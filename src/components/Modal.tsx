import React from 'react';

interface Props {
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Modal({ children, isOpen, setIsOpen }: Props) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-start pt-[118px] justify-center z-50"
        >
            <div onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-black bg-opacity-15"
                style={{ backgroundColor: "#0D0F10", opacity: 0.15 }}
            />

            {children}
        </div>
    );
}