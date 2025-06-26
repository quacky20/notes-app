import { databases, DATABASE_ID, GROUP_COLLECTION_ID, NOTES_COLLECTION_ID, ID } from '../lib/appwrite'
import { Query } from 'appwrite'

export const createGroup = async (groupData) => {
    try {
        const response = await databases.createDocument(
            DATABASE_ID,
            GROUP_COLLECTION_ID,
            ID.unique(),
            {
                name: groupData.name,
                color: groupData.color,
                createdAt: new Date().toISOString()
            }
        )
        return response
    }
    catch (error) {
        console.error('Error creating group: ', error)
        throw error
    }
}

export const getAllGroups = async () => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            GROUP_COLLECTION_ID
        )
        return response.documents
    }
    catch(error) {
        console.error('Error fetching groups:', error)
        throw error
    }
}

export const updateGroup = async(groupId, groupData) => {
    try {
        const response = await databases.updateDocument(
            DATABASE_ID,
            GROUP_COLLECTION_ID,
            groupId,
            groupData
        )
        return response
    }
    catch(error) {
        console.error('Error updating group:', error)
        throw error
    }
}

export const deleteGroup = async(groupId) => {
    try{
        const notes = await getNotesByGroup(groupId)
        for (const note of notes){
            await deleteNote(note.$id)
        }

        await databases.deleteDocument(
            DATABASE_ID,
            GROUP_COLLECTION_ID,
            groupId
        )

        return true
    }
    catch(error){
        console.error('Error deleting group:', error)
        throw error
    }
}

export const createNote = async (noteData) => {
    try {
        const response = await databases.createDocument(
            DATABASE_ID,
            NOTES_COLLECTION_ID,
            ID.unique(),
            {
                groupId: noteData.groupId,
                body: noteData.body,
                colors: JSON.stringify(noteData.colors),
                position: JSON.stringify(noteData.position),
                createdAt: new Date().toISOString()
            }
        )
        return response
    }
    catch(error) {
        console.error('Error creating note:', error)
        throw error
    }
}

export const getAllNotes = async () => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            NOTES_COLLECTION_ID
        )
        return response.documents.map(note => ({
            ...note,
            colors: JSON.parse(note.colors),
            position: JSON.parse(note.position)
        }))
    }
    catch(error) {
        console.error('Error fetching notes:', error)
        throw error
    }
}

export const getNotesByGroup = async (groupId) => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            NOTES_COLLECTION_ID,
            [Query.equal('groupId', groupId)]
        )

        return response.documents.map(note => ({
            ...note,
            colors: JSON.parse(note.colors),
            position: JSON.parse(note.position)
        }))
    }
    catch(error) {
        console.error('Error fetching notes by group:', error)
        throw error
    }
}

export const updateNote = async (noteId, noteData) => {
    try {
        const updateData = { ...noteData }

        if (typeof updateData.colors === 'object') {
            updateData.colors = JSON.stringify(updateData.colors)
        }
        if (typeof updateData.position === 'object') {
            updateData.position = JSON.stringify(updateData.position)
        }

        const response = await databases.updateDocument(
            DATABASE_ID,
            NOTES_COLLECTION_ID,
            noteId,
            updateData
        )

        return {
            ...response,
            colors: JSON.parse(response.colors),
            position: JSON.parse(response.position)
        }
    }
    catch(error) {
        console.error('Error updating note:', error)
        throw error
    }
}

export const deleteNote = async (noteId) => {
    try {
        const response = await databases.deleteDocument(
            DATABASE_ID,
            NOTES_COLLECTION_ID,
            noteId
        )
        return true
    }
    catch(error) {
        console.error('Error deleting note:', error)
        throw error
    }
}

export const getNotesWithGroups = async () => {
    try {
        const [notes, groups] = await Promise.all([
            getAllNotes(),
            getAllGroups()
        ])

        const groupsMap = groups.reduce((acc, group) => {
            acc[group.$id] = group
            return acc
        })

        const notesWithGroups = notes.map(note => ({
            ...note,
            group: groupsMap[note.groupId] || null
        }))

        return { notes: notesWithGroups, groups}
    }
    catch(error) {
        console.error('Error fetching notes with groups:', error)
        throw error
    }
}