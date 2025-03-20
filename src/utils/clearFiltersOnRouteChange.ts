const STORAGE_KEY = 'task-dashboard-filters'

export function clearFiltersOnRouteChange(currentPath: string) {
    if (typeof window !== 'undefined') {
        if (currentPath !== '/') {
            localStorage.removeItem(STORAGE_KEY)
        }
    }
}