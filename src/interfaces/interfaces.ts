export interface Department {
    name: string
    id: number;
}

export interface Employee {
    name: string;
    surname: string;
    avatar: string;
    department: {
        id: number;
        name: string;
    }
    id: number;
}

export interface Priority {
    id: number;
    name: string;
    icon: string;
}