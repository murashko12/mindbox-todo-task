import React from 'react'

import { ITodo } from '../types/ITodo'
import { TodoItem } from './TodoItem'

interface ITodoListProps {
    items: ITodo[];
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
}

const TodoList: React.FC<ITodoListProps> = (props) => {
    const {items, toggleTodo, deleteTodo} = props
    return (
        <div className="flex flex-col gap-5">
            <ul>
                {
                    items.filter(todo => !todo.completed).map(
                        (todo) => (
                            <TodoItem 
                                key={todo.id} 
                                toggleTodo={toggleTodo} 
                                deleteTodo={deleteTodo} 
                                {...todo}
                            />
                        )
                    )
                }
            </ul>
            <ul>
                {
                    items.filter(todo => todo.completed).map(
                        (todo) => (
                            <TodoItem 
                                key={todo.id} 
                                toggleTodo={toggleTodo} 
                                deleteTodo={deleteTodo} 
                                {...todo}
                            />
                        )
                    )
                }
            </ul>
        </div>
    )
}

export {TodoList}
