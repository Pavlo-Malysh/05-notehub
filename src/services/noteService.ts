import axios from "axios";
import type { NewNote, Note } from "../types/note";

interface fetchNotesResponse {
    notes: Note[];
    totalPages: number;
}
interface Params {
    page: number;
    perPage: number;
    search: string;
}


axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN

export const fetchNotes = async (page: number, search: string): Promise<fetchNotesResponse> => {

    const params: Params = {
        page,
        perPage: 10,
        search,
    };

    const response = await axios.get<fetchNotesResponse>("/notes", {
        params,
        headers: {
            Authorization: `Bearer ${myKey}`,
        }
    })

    return response.data;

}

export const createNote = async (newNote: NewNote) => {
    const res = await axios.post<Note>("/notes", newNote, {
        headers: {
            Authorization: `Bearer ${myKey}`,
        },
    })
    return res.data
}

export const deleteNote = async (noteId: string) => {
    const res = await axios.delete(`/notes/${noteId}`, {
        headers: {
            Authorization: `Bearer ${myKey}`,
        },
    });
    return res.data
}