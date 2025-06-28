import React, { useRef, useEffect, act } from 'react'
import './Group.css'
import { useNotes } from './NotesContext';

function Group({ name, colour, groupId }) {
    const groupRef = useRef(null);
    const blurRef = useRef(null)

    const { deleteGroup, activeGroupId } = useNotes()

    const handleDelete = async (e) => {

        e.stopPropagation()

        try {
            if (window.confirm(`Are you sure you want to delete "${name}"? This will also delete all notes in this group.`)) {
                await deleteGroup(groupId)
            }
        }
        catch (err) {
            console.error('Failed to delete group:', err)
            alert('Failed to delete group. Please try again.')
        }
    }

    useEffect(() => {
        const group = groupRef.current;
        group.style.setProperty('--clr', colour)

        const handleMouseMove = (e) => {
            const rect = group.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            group.style.setProperty('--x', x + 'px');
            group.style.setProperty('--y', y + 'px');
        };

        if (group) {
            group.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (group) {
                group.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, [colour]);

    useEffect(() => {
        const blur = blurRef.current;
        blur.style.setProperty('--clr', colour)
    }, [colour]);

    return (
        <div className="relative">
            <div ref={blurRef} className={`card-blur absolute inset-0 bg-white m-2 p-2 rounded-[0.5rem] blur-md ${groupId === activeGroupId ? 'opacity-100' : 'opacity-0'} transition-all duration-300`}>

            </div>
            <div ref={groupRef} className='group-component relative m-2 p-2 cursor-pointer flex flex-row justify-between items-center'>
                <div className='relative z-1 text-white select-none'>
                    {name}
                </div>
                <button
                    className='z-2 flex items-center cursor-pointer hover:opacity-100 opacity-0 transition-all duration-300 select-none'
                    onClick={handleDelete}
                    title={`Delete ${name}`}
                >
                    <div className='material-symbol text-white'>
                        delete
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Group