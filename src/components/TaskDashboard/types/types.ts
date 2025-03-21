export type FilterItem = {
    id: number
    name: string
    checked: boolean
    avatar?: string;
}

export type Department = FilterItem
export type Priority = FilterItem
export type Employee = FilterItem

export type FilterType = 'department' | 'priority' | 'employee' | null