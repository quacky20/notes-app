import React, { useEffect, useRef, useState } from 'react'
import Menu from './Menu';
import './Navbar.css'
import { useNotes } from './NotesContext';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const barRef = useRef(null);

    const { activeGroupId, getActiveGroup, getNotesForGroup } = useNotes()

    const currentNotes = getNotesForGroup(activeGroupId)
    const activeGroup = getActiveGroup()

    useEffect(() => {
        const bar = barRef.current;

        const handleMouseMove = (e) => {
            const x = e.pageX - bar.offsetLeft;
            const y = e.pageY - bar.offsetTop;

            bar.style.setProperty('--x', x + 'px');
            bar.style.setProperty('--y', y + 'px');
        };

        if (bar) {
            bar.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (bar) {
                bar.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    return (
        <div>
            <div id='navbar' className='flex items-center justify-between' ref={barRef}>
                <div className="relative z-1 text-white text-3xl pl-5 select-none flex flex-row gap-5 items-center">
                    {activeGroup ? activeGroup.name : 'All Notes'}
                    <div>
                        {activeGroup && (
                            <div className='flex items-center gap-2 mt-1'>
                                <div
                                    className='w-4 h-4 rounded'
                                    style={{ backgroundColor: activeGroup.color }}
                                ></div>
                                <span className='text-muted text-sm text-white'>
                                    {currentNotes.length} {currentNotes.length > 1 ? 'notes' : 'note'}
                                </span>
                            </div>
                        )}
                        {!activeGroup && (
                            <div className='text-muted text-sm text-white'>
                                {currentNotes.length} total {currentNotes.length > 1 ? 'notes' : 'note'}
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className="relative z-1 text-white text-3xl pr-5 hover:cursor-pointer select-none flex items-center"
                    onClick={() => {
                        setIsMenuOpen((prev) => !prev)
                    }}
                >
                    <div className='material-symbol text-3xl'>menu</div>
                </div>
            </div>
            <div className=''>
                <Menu isMenuOpen={isMenuOpen} />
            </div>
        </div>
    )
}

export default Navbar