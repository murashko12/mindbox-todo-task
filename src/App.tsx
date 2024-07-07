import React, { useState, useRef, useEffect } from "react"
import { ITodo } from "./types/ITodo"
import { TodoList } from "./components/TodoList";

function App() {

  const [todos, setTodos] = useState<ITodo[]>([])
  const [newTodo, setNewTodo] = useState('')

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleKeydown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter'){
      addTodo()
    }
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewTodo(e.target.value)
  }

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem: ITodo = {
        id: Date.now().toString(),
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem])
      setNewTodo('')
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, []);

  const toggleTodo = (id: string): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: string): void => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col w-full min-h-[100vh] bg-slate-600">
        <div className="flex gap-3 mb-5">
          <input 
            type="text"
            value={newTodo}
            onChange={handleChange}
            onKeyDown={handleKeydown}
            ref={inputRef}
            placeholder="Enter todo" 
            className="h-8 w-64 bg-transparent py-2 border-b-2 text-gray-200" 
          />
          <button 
            onClick={addTodo}
            className="w-24 h-8 text-xs border-2 rounded-md text-gray-200 font-black hover:text-slate-600 hover:bg-gray-200"
          >
            ADD
          </button>
        </div>
        <TodoList items={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
      </div>
    </>
  )
}

export default App