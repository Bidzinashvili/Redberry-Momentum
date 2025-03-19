"use client"

import { Check } from "lucide-react"
import { FilterItem, FilterType } from "./types/types"

interface FilterDropdownProps {
    items: FilterItem[]
    filterType: FilterType
    toggleFilter: (id: number, type: FilterType) => void
    applyFilters: () => void
}

export default function FilterDropdown({
    items,
    filterType,
    toggleFilter,
    applyFilters
}: FilterDropdownProps) {
    return (
        <div className="absolute left-0 right-0 top-full z-10 bg-white border border-[#DEE2E6] rounded-[10px] p-4 mt-1 shadow-lg">
            <div className="grid grid-cols-1 gap-2">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 mb-3">
                        <div
                            className={`w-5 h-5 border border-black rounded flex items-center justify-center cursor-pointer`}
                            onClick={() => toggleFilter(item.id, filterType)}
                        >
                            {item.checked && <Check size={16} color="black" />}
                        </div>

                        {filterType === 'employee' && (
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs overflow-hidden">
                                {item.avatar && (
                                    <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                                )}
                            </div>
                        )}

                        <span className="text-[#0D0F10]">{item.name}</span>
                    </div>
                ))}
            </div>
            <button
                className="cursor-pointer mt-[25px] bg-[#8338EC] px-[49.5px] py-[8px] text-white rounded-[20px] w-auto float-right"
                onClick={applyFilters}
            >
                არჩევა
            </button>
            <div className="clear-both"></div>
        </div>
    )
}