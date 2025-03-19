import { Department, Priority, Employee } from '../types/types'

export const initialDepartments: Department[] = [
    { id: 1, name: "მარკეტინგის დეპარტამენტი", checked: true },
    { id: 2, name: "დიზაინის დეპარტამენტი", checked: true },
    { id: 3, name: "ლოგისტიკის დეპარტამენტი", checked: false },
    { id: 4, name: "IT დეპარტამენტი", checked: false },
]

export const initialPriorities: Priority[] = [
    { id: 1, name: "მაღალი", checked: false },
    { id: 2, name: "საშუალო", checked: false },
    { id: 3, name: "დაბალი", checked: false },
]

export const initialEmployees: Employee[] = [
    { id: 1, name: "გიორგი გიორგაძე", checked: false },
    { id: 2, name: "ნინო ნინიძე", checked: false },
    { id: 3, name: "დავით დავითაძე", checked: false },
]