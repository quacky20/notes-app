import React, { useState } from 'react'
import Group from './Group'
import { useNotes } from './NotesContext'

function Menu({ isMenuOpen }) {
    const { groups, activeGroupId, setActiveGroupId, addGroup } = useNotes()
    const [showAddGroup, setShowAddGroup] = useState(false)
    const [newGroupName, setNewGroupName] = useState('')
    const [newGroupColor, setNewGroupColor] = useState('#4fe2ff')

    const handleGroupClick = (groupId) => {
        setActiveGroupId(groupId)
    }

    const handleShowAllClick = () => {
        setActiveGroupId(null)
    }

    const handleAddGroup = () => {
        if (newGroupName.trim()) {
            addGroup(newGroupName.trim(), newGroupColor)
            setNewGroupName('')
            setNewGroupColor('#4fe2ff')
            setShowAddGroup(false)
        }
    }

    const predefinedColors = [
        '#4fe2ff', '#ff2727', '#27ff27', '#ffff27', 
        '#ff27ff', '#ff8c27', '#8c27ff', '#27ffff'
    ];

    return (
        <>
            <div
            className={`fixed top-20 right-0 bg-menu transition-all duration-300 h-[calc(100vh-5rem)] w-40 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'} flex flex-col justify-between z-10`}
            >
                <div className='flex flex-col overflow-y-auto'>
                    <div
                        className={`m-2 p-2 rounded cursor-pointer transition-colors ${
                            activeGroupId === null
                                ? 'bg-white/20 text-white'
                                : 'text-white/70 hover:bg-white/10' 
                        }`}
                        onClick={handleShowAllClick}
                    >
                        <div className='text-center text-sm'>All Notes</div>
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
                            />
                        </div>
                    ))}

                    {showAddGroup && (
                        <div className='m-2 p-2 bg-white/10 rounded'>
                            <input
                                type="text"
                                value={newGroupName}
                                onChange={(e) => setNewGroupName(e.target.value)}
                                placeholder='Group name'
                                className='w-full p-1 mb-2 text-xs bg-white/20 text-white placeholder-white rounded border-none outline-none'
                                onKeyPress={(e) => e.key === 'Enter' && handleAddGroup}
                            />
                            <div className='flex flex-wrap gap-1 mb-2'>
                                {predefinedColors.map((color) => (
                                    <div
                                        key={color}
                                        className={`w-4 h-4 rounded cursor-pointer border-2 ${newGroupColor === color ? 'border-white' : 'border-transparent'}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setNewGroupColor(color)}
                                    >
                                    </div>
                                ))}
                            </div>
                            <div className='flex gap-1'>
                                <button
                                    onClick={handleAddGroup}
                                    className='flex-1 px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700'
                                >
                                    Add
                                </button>
                                <button
                                    onClick={() => setShowAddGroup(false)}
                                    className='flex-1 px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700' 
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className='flex items-center w-full hover:cursor-pointer'>
                    <div
                        className='material-symbol text-3xl text-white text-center w-full py-3 select-none'
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