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

export interface Status {
    id: number;
    name: string;
}

export interface Task {
    id: string;
    name: string;
    description: string;
    due_date: string;
    status: Status;
    priority: Priority;
    department: Department;
    employee: Employee;
}

export interface Comment {
    id: number;
    text: string;
    task_id: number;
    parent_id: number | null;
    author_avatar: string;
    author_nickname: string;
    sub_comments?: Comment[];
}