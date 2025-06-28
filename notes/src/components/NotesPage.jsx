import React, { useState } from 'react'
import './NotesPage.css'
import NoteCard from './NoteCard'
import { useNotes } from './NotesContext'

function NotesPage() {
    const {
        groups,
        getNotesForGroup,
        activeGroupId,
        getActiveGroup,
        addNote,
        loading,
        error
    } = useNotes()

    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
    const [showNoGroupsPopup, setShowNoGroupsPopup] = useState(false)

    const currentNotes = getNotesForGroup(activeGroupId)
    const activeGroup = getActiveGroup()

    const colorOptions = [
        {
            id: "color-yellow",
            colorHeader: "#FFEFBE",
            colorBody: "#FFF5DF",
            colorText: "#594A3A",
        },
        {
            id: "color-blue",
            colorHeader: "#B8E0FF",
            colorBody: "#E3F2FF",
            colorText: "#2C5282",
        },
        {
            id: "color-green",
            colorHeader: "#C6F6D5",
            colorBody: "#E9FFF0",
            colorText: "#22543D",
        },
        {
            id: "color-pink",
            colorHeader: "#FED7E2",
            colorBody: "#FFF5F7",
            colorText: "#97266D",
        },
        {
            id: "color-purple",
            colorHeader: "#E9D8FD",
            colorBody: "#FAF5FF",
            colorText: "#553C9A",
        },
        {
            id: "color-orange",
            colorHeader: "#FED7B7",
            colorBody: "#FFF7ED",
            colorText: "#C05621",
        }
    ]

    const handleAddNote = async (selectedColor) => {
        if (!groups || groups.length === 0) {
            setShowNoGroupsPopup(true)
            setIsColorPickerOpen(false)
            return
        }

        const defaultNoteData = {
            body: JSON.stringify('Write something here!'),
            colors: JSON.stringify(selectedColor),
            position: JSON.stringify({
                x: Math.random() * 400 + 50,
                y: Math.random() * 300 + 50
            })
        }

        try {
            await addNote(defaultNoteData)
            setIsColorPickerOpen(false)
        }
        catch (err) {
            console.error('Failed to add note:', err)
        }
    }

    const toggleColorPicker = () => {
        if (!groups || groups.length === 0) {
            setShowNoGroupsPopup(true)
            return
        }
        setIsColorPickerOpen(!isColorPickerOpen)
    }

    const closeNoGroupsPopup = () => {
        setShowNoGroupsPopup(false)
    }

    if (loading) {
        return (
            <div className='notes-area h-[calc(100vh-5rem)] z-0 flex items-center justify-center'>
                <div className='text-gray-500'>Loading notes...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='notes-area h-[calc(100vh-5rem)] z-0 flex items-center justify-center'>
                <div className='text-red-500'>Error: {error}</div>
            </div>
        )
    }

    return (
        <div className='notes-area h-[calc(100vh-5rem)] z-0'>
            <div className='relative'>
                {currentNotes.filter(note => note && (note.id || note.$id)).map((note) => (
                    <NoteCard
                        key={note.$id}
                        note={note}
                    />
                ))}
            </div>

            {showNoGroupsPopup && (
                <div className='fixed inset-0 bg-black/20 flex items-center justify-center z-999'>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-teal-400 rounded-lg p-6 mx-4 max-w-sm w-full blur-lg"></div>
                        <div className='bg-menu relative rounded-lg p-6 mx-4 max-w-sm w-full shadow-2xl border-2 border-gray-300'>
                            <div className='text-yellow-500 text-2xl mr-3'>⚠️</div>
                            <h3 className='text-lg font-semibold text-gray-50'>No Groups Available</h3>

                            <p className='text-gray-200 mb-4'>
                                You need to make atleast one note before adding notes.
                                Please create a group first using the menu on the right.
                            </p>
                            <div className='flex justify-end'>
                                <button
                                    onClick={closeNoGroupsPopup}
                                    className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
                                >
                                    Got it
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='fixed bottom-6 right-6 z-999 select-none'>
                <div
                    className={`bg-slate-800 rounded-full shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isColorPickerOpen ? 'w-14 h-88' : 'w-14 h-14'}`}
                >
                    <button
                        className={`w-14 h-14 absolute bottom-0 right-0 flex items-center justify-center text-2xl material-symbol text-white transition-transform duration-300 ${isColorPickerOpen ? 'rotate-45' : 'rotate-0'}`}
                        onClick={toggleColorPicker}
                        disabled={loading}
                        title={
                            !groups || groups.length === 0
                                ? 'Create a group first'
                                : activeGroup
                                    ? `Add note to ${activeGroup.name}` : `Add note to ${groups[0].name}`
                        }
                    >
                        add
                    </button>

                    <div
                        className={`px-2 py-3 transition-all duration-300 ${isColorPickerOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4 pointer-events-none'}`}
                    >
                        <div className='space-y-2'>
                            {colorOptions.map((color) => (
                                <button
                                    key={color.id}
                                    onClick={() => {
                                        handleAddNote(color)
                                    }}
                                    className='w-10 h-10 rounded-full border-2 border-white/20 hover:border-white/60 hover:scale-110 transition-all duration-200 shadow-sm hover:shadow-md'
                                    style={{
                                        background: `linear-gradient(135deg, ${color.colorHeader} 0%, ${color.colorBody} 100%)`
                                    }}
                                    title={`Add ${color.id.replace('color-', '')} note`}
                                >
                                    <div
                                        className='w-full h-full rounded-full opacity-40'
                                        style={{
                                            backgroundColor: color.colorHeader
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotesPage