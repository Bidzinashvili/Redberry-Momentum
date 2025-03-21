"use client"

import { useState, useEffect } from "react"
import { FilterItem } from "@/components/TaskDashboard/types/types"
import axios from "axios"
import { useSearchParams, useRouter } from "next/navigation"

type FilterType = 'დეპარტამენტი' | 'პრიორიტეტი' | 'თანამშრომელი' | null;
type AllItemsType = {
    'დეპარტამენტი': FilterItem[],
    'პრიორიტეტი': FilterItem[],
    'თანამშრომელი': FilterItem[]
};

export const useFilter = () => {
    const [dropdownOpen, setDropdownOpen] = useState<FilterType>(null);
    const [allItems, setAllItems] = useState<AllItemsType>({
        'დეპარტამენტი': [],
        'პრიორიტეტი': [],
        'თანამშრომელი': []
    });
    const [items, setItems] = useState<FilterItem[]>([]);

    const searchParams = useSearchParams();
    const router = useRouter();

    const filterKeyMap: Record<string, string> = {
        'დეპარტამენტი': 'departments',
        'პრიორიტეტი': 'priorities',
        'თანამშრომელი': 'employees'
    };

    const apiLinks = {
        'დეპარტამენტი': 'https://momentum.redberryinternship.ge/api/departments',
        'პრიორიტეტი': 'https://momentum.redberryinternship.ge/api/priorities',
        'თანამშრომელი': 'https://momentum.redberryinternship.ge/api/employees'
    };

    useEffect(() => {
        fetchItems();
    }, [searchParams]);

    useEffect(() => {
        if (dropdownOpen) {
            setItems(allItems[dropdownOpen]);
        } else {
            setItems([]);
        }
    }, [dropdownOpen, allItems]);

    const fetchItems = async () => {
        const token = '9e68b0cd-e37e-4a1b-a82d-a5e71bcdcf90';
        const headers = { Authorization: `Bearer ${token}` };

        try {
            const requests = Object.entries(apiLinks).map(async ([key, url]) => {
                const response = await axios.get(url, { headers });
                return { key, data: response.data };
            });

            const results = await Promise.all(requests);

            const itemsData: AllItemsType = {
                'დეპარტამენტი': [],
                'პრიორიტეტი': [],
                'თანამშრომელი': []
            };

            results.forEach(({ key, data }) => {
                const typedKey = key as keyof AllItemsType;
                const englishKey = filterKeyMap[typedKey];
                const selectedIds = searchParams.get(englishKey)?.split(',').map(Number) || [];

                const formattedItems = data.map((item: any) => ({
                    id: item.id,
                    name: typedKey === 'თანამშრომელი' ? `${item.name} ${item.surname}` : item.name,
                    checked: selectedIds.includes(item.id),
                    avatar: typedKey === 'თანამშრომელი' ? item.avatar : undefined,
                }));

                itemsData[typedKey] = formattedItems;
            });

            setAllItems(itemsData);
        } catch (error) {
            console.error('Error fetching filter items:', error);
        }
    };

    const handleSelect = (id: number) => {
        if (!dropdownOpen) return;

        const updatedItems = items.map(item => {
            if (dropdownOpen === 'თანამშრომელი') {
                const isCurrentlyChecked = items.find(i => i.id === id)?.checked;
                return { ...item, checked: item.id === id ? !isCurrentlyChecked : false };
            } else {
                return item.id === id ? { ...item, checked: !item.checked } : item;
            }
        });

        setItems(updatedItems);

        setAllItems(prev => ({
            ...prev,
            [dropdownOpen]: updatedItems
        }));
    };

    const applyFilters = () => {
        if (!dropdownOpen) return;

        const selectedIds = items.filter(item => item.checked).map(item => item.id);

        const englishKey = filterKeyMap[dropdownOpen];
        const params = new URLSearchParams(searchParams.toString());

        if (selectedIds.length > 0) {
            params.set(englishKey, selectedIds.join(','));
        } else {
            params.delete(englishKey);
        }

        router.push(`?${params.toString()}`, { scroll: false });
        setDropdownOpen(null);
    };

    return {
        dropdownOpen,
        setDropdownOpen,
        items,
        handleSelect,
        applyFilters,
        fetchItems
    };
};