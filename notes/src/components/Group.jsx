import React, { useRef, useEffect } from 'react'
import './Group.css'

function Group({name, colour}) {
    const groupRef = useRef(null);

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

    return (
        <div ref={groupRef} className='group-component relative m-2 p-2 cursor-pointer'>
            <div className='relative z-1 text-white select-none'>
                {name}
            </div>
        </div>
    )
}

export default Group