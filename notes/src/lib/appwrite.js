import { Client, Databases, ID } from 'appwrite'

const client = new Client()
    .setEndpoint(import.meta.env.VITE_ENDPOINT)
    .setProject(import.meta.env.VITE_PROJECT_ID)

export const databases = new Databases(client)

export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID
export const GROUP_COLLECTION_ID = import.meta.env.VITE_GROUPS_COLLECTION_ID
export const NOTES_COLLECTION_ID = import.meta.env.VITE_NOTES_COLLECTION_ID

export { ID }