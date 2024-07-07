import { useEffect, useState } from "react"
import { ITodo } from "./types/ITodo"
import { RiDeleteBin6Line } from "react-icons/ri";

function App() {

  const [todos, setTodos] = useState<ITodo[]>([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

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
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col w-full min-h-[100vh] bg-slate-600">
        <div className="flex gap-3 mb-5">
          <input 
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
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
        <div className="flex flex-col gap-5">
          <ul>
            {todos.filter(todo => !todo.completed).map((todo) => (
              <li 
                key={todo.id}
                className="flex items-center w-[365px] px-5 py-2 border-2 rounded-md text-gray-200 justify-between mb-5"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.text}
                </span>
                <button
                  className="flex items-center justify-center text-red-800 bg-slate-200 h-7 w-7 rounded-full" 
                  onClick={() => deleteTodo(todo.id)}><RiDeleteBin6Line size={20} />
                </button>
              </li>
            ))}
          </ul>
          <ul>
            {todos.filter(todo => todo.completed).map((todo) => (
              <li 
                key={todo.id}
                className="flex items-center w-[365px] px-5 border-2 rounded-md text-gray-200 justify-between mb-5"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.text}
                </span>
                <button
                  className="flex items-center justify-center text-red-800 bg-slate-200 h-9 w-9 rounded-full" 
                  onClick={() => deleteTodo(todo.id)}>
                    <RiDeleteBin6Line size={25} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
