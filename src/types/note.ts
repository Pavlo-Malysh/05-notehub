
export interface Note {
    id: number;
    title: string;
    content: string;
    tag: string;
}

export interface NewNote {
    content: string;
    tag: string;
    title: string;
}