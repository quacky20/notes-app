import React, { createContext, useContext, useEffect, useState } from 'react'
import { 
    getAllGroups, 
    getAllNotes, 
    createGroup, 
    createNote,
    updateGroup as updateGroupDB,
    updateNote as updateNoteDB,
    deleteGroup as deleteGroupDB,
    deleteNote as deleteNoteDB
} from '../services/database'

const NotesContext = createContext()

export const useNotes = () => {
    const context = useContext(NotesContext)
    if (!context) {
        throw new Error("useNotes must be used within NotesProvider")
    }
    return context
}

export const NotesProvider = ({ children }) => {
    const [groups, setGroups] = useState([])
    const [notes, setNotes] = useState([])
    const [activeGroupId, setActiveGroupId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            setLoading(true)
            setError(null)

            const [groupsData, notesData] = await Promise.all([
                getAllGroups(),
                getAllNotes()
            ])

            const transformedGroups = groupsData.map(group => ({
                ...group,
                id: group.$id
            }))

            setGroups(transformedGroups)
            setNotes(notesData)
        }
        catch(err){
            console.error('Error loading data: ', err)
            setError(err.message)
        }
        finally{
            setLoading(false)
        }
    }

    const getNotesForGroup = (groupId) => {
        if (groupId === null) return notes
        return notes.filter(note => note.groupId === groupId)
    }

    const getActiveGroup = () => {
        if (activeGroupId === null) return null
        return groups.find(group => group.id === activeGroupId || group.$id === activeGroupId)
    }

    const addGroup = async (name, color) => {
        try {
            const newGroup = await createGroup({ name, color })

            const transformedGroup = {
                ...newGroup,
                id: newGroup.$id
            }

            setGroups(prev => [...prev, transformedGroup])
            return transformedGroup
        }
        catch(err){
            console.error('Error adding group:', err)
            setError(err.message)
            throw err
        }
    }

    const updateGroup = async (groupId, updates) => {
        try {
            await updateGroupDB(groupId, updates)

            setGroups(prev => prev.map(group =>
                (group.id === groupId || group.$id === groupId) ? { ...group, ...updates } : group
            ))
        }
        catch(err){
            console.error('Error updating group:', err)
            setError(err.message)
            throw err
        }
    }

    const deleteGroup = async (groupId) => {
        try {
            await deleteGroupDB(groupId)

            setGroups(prev => prev.filter(group => group.id !== groupId && group.$id !== groupId))
            setNotes(prev => prev.filter(note => note.groupId !== groupId))
            if (activeGroupId === groupId){
                setActiveGroupId(null)
            }
        }
        catch(err) {
            console.err('Error deleting group:', err)
            setError(err.message)
            throw err
        }
    }

    const addNote = async (noteData) => {
        try {
            const newNote = await createNote({
                groupId: activeGroupId || groups[0]?.id || groups[0]?.$id,
                ...noteData
            })

            setNotes(prev => [...prev, newNote])
            return newNote
        }
        catch(err) {
            console.error('Error adding note:', err)
            setError(err.message)
            throw err
        }
    }

    const updateNote = async (noteId, updates) => {
        try {
            const updatedNote = await updateNoteDB(noteId, updates)

            setNotes(prev => prev.map(note => 
                note.$id === noteId ? updatedNote : note
            ))
        }
        catch(err) {
            console.error('Error updating note:', err)
            setError(err.message)
            throw err
        }
    }

    const deleteNote = async (noteId) => {
        try{
            await deleteNoteDB(noteId)

            setNotes(prev => prev.filter(note => note.$id !== noteId))
        }
        catch(err) {
            console.error('Error deleting note:', err)
            setError(err.message)
            throw err
        }
    }

    const value = {
        groups,
        notes,
        activeGroupId,
        setActiveGroupId,
        getNotesForGroup,
        getActiveGroup,
        addGroup,
        updateGroup,
        deleteGroup,
        addNote,
        updateNote,
        deleteNote,
        loading,
        error,
        refetch: loadData,
    }

    return (
        <NotesContext.Provider value={value}>
            {children}
        </NotesContext.Provider>
    )
}