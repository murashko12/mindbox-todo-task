import React from 'react'
import { ITodo } from '../types/ITodo'
import { RiDeleteBin6Line } from 'react-icons/ri'

interface ITodoItem extends ITodo {
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
}

const TodoItem: React.FC<ITodoItem> = (props) => {
    const {id, text, completed, toggleTodo, deleteTodo} = props 
    return (
        <div className="flex items-center w-[365px] px-5 py-2 border-2 rounded-md text-gray-200 justify-between mb-5">
            <input
                type="checkbox"
                checked={completed}
                onChange={() => toggleTodo(id)}
            />
            <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
                {text}
            </span>
            <button
                className="flex items-center justify-center text-red-800 bg-slate-200 h-7 w-7 rounded-full" 
                onClick={() => deleteTodo(id)}
            >
                <RiDeleteBin6Line size={20} />
            </button>
        </div>
    )
}

export {TodoItem}
