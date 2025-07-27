
export interface Note {
    id: number;
    title: string;
    content: string;
    tag: string;
    createdAt: string;
    updatedAt: string;
}

export interface NewNote {
    content: string;
    tag: string;
    title: string;
}