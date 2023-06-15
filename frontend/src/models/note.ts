export interface Note {
    _id: string,
    title: string,
    text?: string, // ? is for optional
    createdAt: string,
    updatedAt: string
}