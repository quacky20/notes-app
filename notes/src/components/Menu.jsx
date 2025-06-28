import React, { useRef, useState, useEffect } from 'react'
import Group from './Group'
import { useNotes } from './NotesContext'
import './Menu.css'

function Menu({ isMenuOpen }) {
    const { groups, activeGroupId, setActiveGroupId, addGroup } = useNotes()
    const [showAddGroup, setShowAddGroup] = useState(false)
    const [newGroupName, setNewGroupName] = useState('')
    const [newGroupColor, setNewGroupColor] = useState('#4fe2ff')

    const addRef = useRef(null)

    const handleGroupClick = (groupId) => {
        setActiveGroupId(groupId)
    }

    const handleShowAllClick = () => {
        setActiveGroupId(null)
    }

    const handleAddGroup = async () => {
        if (newGroupName.trim()) {
            try {
                addGroup(newGroupName.trim(), newGroupColor)
                setNewGroupName('')
                setNewGroupColor('#4fe2ff')
                setShowAddGroup(false)
            }
            catch (err) {
                console.error("Failed to add group:", err)
                alert('Failed to add group. Please try again.')
            }
        }
    }

    const predefinedColors = [
        '#49FF00', '#00CAFF', '#FFDB00', '#FF6D28',
        '#EA047E', '#00FFD1', '#9900F0', '#FF0000'
    ];

    useEffect(() => {
            const addBtn = addRef.current;
            addBtn.style.setProperty('--clr', "oklch(77.7% 0.152 181.912)")
    
            const handleMouseMove = (e) => {
                const rect = addBtn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
    
                addBtn.style.setProperty('--x', x + 'px');
                addBtn.style.setProperty('--y', y + 'px');
            };
    
            if (addBtn) {
                addBtn.addEventListener('mousemove', handleMouseMove);
            }
    
            return () => {
                if (addBtn) {
                    addBtn.removeEventListener('mousemove', handleMouseMove);
                }
            };
        }, []);

    return (
        <>
            <div
                className={`fixed top-20 right-0 bg-menu transition-all duration-300 h-[calc(100vh-5rem)] w-40 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'} flex flex-col justify-between z-10 rounded-bl-2xl`}
            >
                <div className='flex flex-col overflow-y-auto'>
                    <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-tr from-blue-700 to-teal-400 m-2 p-2 rounded-[0.5rem] blur-sm ${activeGroupId === null ? 'opacity-100' : 'opacity-0'} transition-all duration-300`}>
                        </div>
                        <div
                            className={`relative m-2 p-2 rounded-[0.5rem] cursor-pointer transition-colors bg-menu text-white border-2 ${activeGroupId === null ? 'border-gray-400' : 'border-gray-900'} hover:bg-[#1b1e28] transition-colors duration-300`}
                            onClick={handleShowAllClick}
                        >
                            <div className='text-center text-sm'>All Notes</div>
                        </div>
                    </div>

                    {groups.map((group) => (
                        <div
                            key={group.id}
                            onClick={() => handleGroupClick(group.id)}
                            className={`cursor-pointer transition-opacity ${activeGroupId === group.id ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                        >
                            <Group
                                name={group.name}
                                colour={group.color}
                                groupId={group.id}
                            />
                        </div>
                    ))}

                    {showAddGroup && (
                        <div className="relative">
                            <div className="absolute inset-0 m-2 rounded-[0.5rem] bg-gradient-to-tr from-blue-700 to-teal-400 blur-md">
                            </div>
                            <div className='relative m-2 p-2 bg-menu rounded-[0.5rem] border-gray-400 border-2'>
                                <input
                                    type="text"
                                    value={newGroupName}
                                    onChange={(e) => setNewGroupName(e.target.value)}
                                    placeholder='Group name'
                                    className='w-full p-1 mb-2 text-xs bg-white/20 text-white placeholder-white rounded-[0.5rem] border-none outline-none'
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddGroup}
                                />
                                <div className='flex flex-wrap gap-1 mb-2'>
                                    {predefinedColors.map((color) => (
                                        <div
                                            key={color}
                                            className={`w-4 h-4 rounded-full cursor-pointer border-2 ${newGroupColor === color ? 'border-white' : 'border-transparent'}`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => setNewGroupColor(color)}
                                        >
                                        </div>
                                    ))}
                                </div>
                                <div className='flex gap-1'>
                                    <button
                                        onClick={handleAddGroup}
                                        className='flex-1 px-2 py-1 text-xs bg-gradient-to-tr from-green-400 to-lime-600 text-white rounded hover:from-green-400 hover:to-lime-500 hover:scale-105 transition-all duration-300'
                                    >
                                        Add
                                    </button>
                                    <button
                                        onClick={() => setShowAddGroup(false)}
                                        className='flex-1 px-2 py-1 text-xs bg-gradient-to-tr from-red-600 to-orange-300 text-white rounded hover:from-red-600 hover:to-orange-200 hover:scale-105 transition-all duration-300'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div ref={addRef} className='add-btn flex items-center hover:cursor-pointer m-2'>
                    <div
                        className='material-symbol text-3xl text-white text-center w-full py-3 select-none z-1'
                        onClick={() => setShowAddGroup(!showAddGroup)}
                    >
                        add
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu