import React, { useEffect, useRef, useState } from 'react'
import './NoteCard.css'
import { setNewOffset, autoGrow, setZIndex } from '../utils'

function NoteCard({ note }) {
    const body = JSON.parse(note.body)
    // let positiion = JSON.parse(note.position)
    let colours = JSON.parse(note.colors)

    const cardRef = useRef(null)
    const textAreaRef = useRef(null)

    const [positiion, setPosition] = useState(JSON.parse(note.position))

    let mouseStartPos = { x: 0, y: 0}

    const mouseDown = (e) => {
        setZIndex(cardRef.current)
        mouseStartPos.x = e.clientX
        mouseStartPos.y = e.clientY

        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
    }

    const mouseUp = (e) => {
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mousedown', mouseDown)
    }

    const mouseMove = (e) => {
        let mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        }

        mouseStartPos.x = e.clientX
        mouseStartPos.y = e.clientY

        const newPosition = setNewOffset(cardRef.current, mouseMoveDir)
        setPosition(newPosition)
    }

    useEffect(() => {
        autoGrow(textAreaRef)
    },[])

    return (
        <div
            ref={cardRef}
            className='card absolute w-sm rounded-lg cursor-pointer backdrop-blur-2xl border-2 text-white'
            style={{
                borderColor: colours.colorBody,
                left: `${positiion.x}px`,
                top: `${positiion.y}px`,
            }}
        >
            <div
                className='card-header bg-[#9bd1de] flex justify-between items-center p-2 select-none'
                style={{ backgroundColor: colours.colorHeader }}
                onMouseDown={ mouseDown }
            >
                <div className='material-symbol text-xl'>
                    delete
                </div>
            </div>
            <div className='card-body p-2'>
                <textarea
                    ref={textAreaRef}
                    className='w-full h-full resize-none text-[16px] focus:outline-none focus:h-full focus:w-full'
                    style={{ color: colours.colorText }}
                    defaultValue={body}
                    onInput={() => {
                        autoGrow(textAreaRef)
                    }}
                    onFocus={() => {
                        setZIndex(cardRef.current)
                    }}
                ></textarea>
            </div>
        </div>
    )
}

export default NoteCard