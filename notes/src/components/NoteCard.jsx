import React, { useEffect, useRef, useState } from 'react'
import './NoteCard.css'
import { setNewOffset, autoGrow, setZIndex } from '../utils'
import { useNotes } from './NotesContext'

function NoteCard({ note }) {
    // const body = JSON.parse(note.body)
    // let colours = JSON.parse(note.colors)
    
    const body = typeof note.body === 'string' ? JSON.parse(note.body) : note.body
    const colours = typeof note.colors === 'string' ? JSON.parse(note.colors) : note.colors
    const [position, setPosition] = useState(
        typeof note.position === 'string' ? JSON.parse(note.position) : note.position
    )

    const [isDeleted, setIsDeleted] = useState(false)
    const { updateNote, deleteNote } = useNotes()
    const [text, setText] = useState(body)
    const [isEditing, setIsEditing] = useState(false)

    const cardRef = useRef(null)
    const textAreaRef = useRef(null)
    const latestPositionRef = useRef(position)

    // const [position, setPosition] = useState(JSON.parse(note.position))

    const handleDelete = async () => {
        try {
            setIsDeleted(true)

            document.removeEventListener('mousemove', mouseMove)
            document.removeEventListener('mouseup', mouseUp)

            await deleteNote(note.$id)
        }
        catch (err) {
            console.error("Delete failed: ", err)
        }
    }

    let mouseStartPos = { x: 0, y: 0 }

    const mouseDown = (e) => {
        if (isDeleted) return

        setZIndex(cardRef.current)
        mouseStartPos.x = e.clientX
        mouseStartPos.y = e.clientY

        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
    }

    const mouseUp = (e) => {
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mousedown', mouseDown)

        if(isDeleted) return

        const finalPosition = latestPositionRef.current

        updateNote(note.$id, {
            body: JSON.stringify(text),
            position: JSON.stringify(finalPosition),
        })
    }

    const mouseMove = (e) => {
        if (isDeleted) return

        let mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        }

        mouseStartPos.x = e.clientX
        mouseStartPos.y = e.clientY

        const newPosition = setNewOffset(cardRef.current, mouseMoveDir)
        latestPositionRef.current = newPosition
        setPosition(newPosition)
    }

    useEffect(() => {
        autoGrow(textAreaRef)
    }, [])

    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', mouseMove)
            document.removeEventListener('mouseup', mouseUp)

            // console.log("Unmounting note:", note.$id)
        }
    }, [])

    useEffect(() => {
        if (!isEditing || isDeleted) return

        const timeout = setTimeout(() => {
            updateNote(note.$id, {
                body: JSON.stringify(text),
                position: JSON.stringify(position),
            })
        }, 500);

        return () => clearTimeout(timeout)
    }, [text, position])

    if (isDeleted){
        return null
    }

    return (
        <div
            ref={cardRef}
            className='card absolute w-sm rounded-[8px] cursor-pointer backdrop-blur-2xl border-2 text-white'
            style={{
                borderColor: colours.colorBody,
                left: `${position.x}px`,
                top: `${position.y}px`,
                boxShadow: `0 0 10px ${colours.colorHeader}`
            }}
        >
            <button 
                    onClick={handleDelete}
                    title='Delete note'
                    className='cursor-pointer fixed top-2 right-2'
                >
                    <div className='material-symbol text-xl'>
                        delete
                    </div>    
            </button>
            <div
                className='card-header rounded-t-[5px] flex justify-between items-center select-none min-h-9 text-white px-2'
                style={{ background: `linear-gradient(to right, ${colours.colorHeader}, ${colours.colorText}` }}
                onMouseDown={mouseDown}
            >
                {text.length} / 1000
            </div>
            <div className='card-body p-2'>
                <textarea
                    ref={textAreaRef}
                    className='w-full h-full resize-none text-[16px] focus:outline-none focus:h-full focus:w-full'
                    style={{ color: colours.colorText }}
                    defaultValue={body}
                    onChange={(e) => {
                        setText(e.target.value)
                        setIsEditing(true)
                    }}
                    onInput={() => {
                        autoGrow(textAreaRef)
                    }}
                    onFocus={() => {
                        setZIndex(cardRef.current)
                    }}
                    maxLength={1000}
                ></textarea>
            </div>
        </div>
    )
}

export default NoteCard