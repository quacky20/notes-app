import React from 'react'
import './NotesPage.css'
import NoteCard from './NoteCard'
import { useNotes } from './NotesContext'
import { fakeData as data } from "../assets/fakeData"

function NotesPage() {
    const { getNotesForGroup, activeGroupId, getActiveGroup } = useNotes()

    const currentNotes = getNotesForGroup(activeGroupId)
    const activeGroup = getActiveGroup()

    return (
        <div className='notes-area h-[calc(100vh-5rem)] z-0'>         
            <div className='relative'>
                {currentNotes.map((note) => (
                    <NoteCard 
                        key={note.$id}
                        note={note}
                    />
                ))}
            </div>

            <button
                className='fixed bottom-6 right-6 w-14 h-14 bg-slate-500 rounded-full shadow-lg flex items-center justify-center text-2xl material-symbol'
                onClick={() => {

                }}
            >
                add
            </button>
        </div>
    )
}

export default NotesPage