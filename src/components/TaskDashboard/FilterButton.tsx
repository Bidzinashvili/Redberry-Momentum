"use client"

import { ChevronDown } from "lucide-react"
import { FilterType } from "./types/types"

interface FilterButtonProps {
    label: string
    isActive: boolean
    onClick: () => void
}

export default function FilterButton({ label, isActive, onClick }: FilterButtonProps) {
    return (
        <div
            className="py-[12.5px] px-[18px] flex items-center gap-[13px] cursor-pointer group"
            onClick={onClick}
        >
            <p
                className={`text-[#0D0F10] transition-all ease-in-out delay-75 ${isActive ? "text-[#8338EC]" : "group-hover:text-[#8338EC]"
                    }`}
            >
                {label}
            </p>
            <ChevronDown
                className={`transition-all ease-in-out delay-75 ${isActive ? "text-[#8338EC] rotate-180" : "group-hover:text-[#8338EC]"
                    }`}
                size={24}
            />
        </div>
    )
}