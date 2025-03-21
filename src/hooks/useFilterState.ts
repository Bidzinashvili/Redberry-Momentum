import { useState, useEffect } from 'react'
import axios from 'axios'
import { FilterItem, FilterType } from '@/components/TaskDashboard/types/types'

const API_URLS = {
    departments: 'https://momentum.redberryinternship.ge/api/departments',
    employees: 'https://momentum.redberryinternship.ge/api/employees',
    priorities: 'https://momentum.redberryinternship.ge/api/priorities'
}

const AUTH_TOKEN = '9e68b0cd-e37e-4a1b-a82d-a5e71bcdcf90'
const STORAGE_KEY = 'task-dashboard-filters'

export function useFilterState() {
    const [openDropdown, setOpenDropdown] = useState<FilterType>(null)

    const [departments, setDepartments] = useState<FilterItem[]>([])
    const [priorities, setPriorities] = useState<FilterItem[]>([])
    const [employees, setEmployees] = useState<FilterItem[]>([])

    const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null)

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (!isMounted) return

        const loadSavedFilters = () => {
            try {
                const savedFilters = localStorage.getItem(STORAGE_KEY)
                if (savedFilters) {
                    const { departments: savedDepts, priorities: savedPrios, employees: savedEmps } = JSON.parse(savedFilters)

                    if (savedDepts && departments.length > 0) {
                        setDepartments(departments.map(dept => ({
                            ...dept,
                            checked: savedDepts.some((saved: number) => saved === dept.id)
                        })))
                    }

                    if (savedPrios && priorities.length > 0) {
                        setPriorities(priorities.map(prio => ({
                            ...prio,
                            checked: savedPrios.some((saved: number) => saved === prio.id)
                        })))
                    }

                    if (savedEmps && employees.length > 0) {
                        setEmployees(employees.map(emp => ({
                            ...emp,
                            checked: savedEmps === emp.id
                        })))
                    }
                }
            } catch (err) {
                console.error('Error loading saved filters:', err)
            }
        }

        if (!isLoading && departments.length > 0 && priorities.length > 0 && employees.length > 0) {
            loadSavedFilters()
        }
    }, [isMounted, isLoading, departments.length, priorities.length, employees.length])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            setError(null)

            try {
                const deptRequest = axios.get(API_URLS.departments)

                const empRequest = axios.get(API_URLS.employees, {
                    headers: {
                        Authorization: `Bearer ${AUTH_TOKEN}`
                    }
                })

                const prioRequest = axios.get(API_URLS.priorities)

                const [deptResponse, empResponse, prioResponse] = await Promise.all([
                    deptRequest,
                    empRequest,
                    prioRequest
                ])

                setDepartments(deptResponse.data.map((dept: any) => ({
                    id: dept.id,
                    name: dept.name,
                    checked: false
                })))

                setEmployees(empResponse.data.map((emp: any) => ({
                    id: emp.id,
                    name: `${emp.name} ${emp.surname}`,
                    avatar: emp.avatar || emp.profile_image || emp.image || null,
                    checked: false
                })))

                setPriorities(prioResponse.data.map((prio: any) => ({
                    id: prio.id,
                    name: prio.name,
                    checked: false
                })))
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(`API Error: ${err.response?.status} - ${err.message}`)
                } else {
                    setError('An unknown error occurred')
                }
                console.error('Error fetching filter data:', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    const toggleDropdown = (dropdown: FilterType) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown)
    }

    const toggleFilter = (id: number, type: FilterType) => {
        if (!type) return

        const updateState = (items: FilterItem[], setter: React.Dispatch<React.SetStateAction<FilterItem[]>>) => {
            setter(items.map(item =>
                item.id === id ? { ...item, checked: !item.checked } : item
            ))
        }

        switch (type) {
            case 'department':
                updateState(departments, setDepartments)
                break
            case 'priority':
                updateState(priorities, setPriorities)
                break
            case 'employee':
                setEmployees(employees.map(employee =>
                    employee.id === id ? { ...employee, checked: true } : { ...employee, checked: false }
                ))
                break
        }
    }

    const applyFilters = () => {
        setOpenDropdown(null);

        const selectedDepartmentsStorage = departments.filter(d => d.checked).map(d => d.id);
        const selectedPrioritiesStorage = priorities.filter(p => p.checked).map(p => p.id);
        const selectedEmployeeStorage = employees.find(e => e.checked)?.id || null;

        setSelectedEmployee(selectedEmployeeStorage);

        const filtersToSave = {
            departments: selectedDepartmentsStorage,
            priorities: selectedPrioritiesStorage,
            employees: selectedEmployeeStorage
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtersToSave));
    };


    const selectedDepartments = departments.filter(d => d.checked).map(d => d.id)
    const selectedPriorities = priorities.filter(p => p.checked).map(p => p.id)

    return {
        openDropdown,
        departments,
        priorities,
        employees,
        isLoading,
        error,
        toggleDropdown,
        toggleFilter,
        applyFilters,
        selectedDepartments,
        selectedPriorities,
        selectedEmployee
    }
}
