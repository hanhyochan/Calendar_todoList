import React, { useRef } from 'react';
import axios from 'axios';
import { useView } from '../../context/viewContext';
import { useTodos } from '../../context/todoContext';

const TodoItemEditTemplate = ({ todo }) => {
    const TodoEditInput = useRef(null)
    const { setView } = useView()
    const { todos, setTodos } = useTodos()

    const handleEditTodos = (id, TodoEditInput) => {
        const editedTodo = todos.find((todo) => todo.id === id)
        axios.put(`http://localhost:3000/todos/${id}`, { date: editedTodo.date, content: TodoEditInput.current.value, checked: editedTodo.checked })
            .then(() => {
                setTodos(todos.map((todo) => (todo.id === id ? { ...todo, content: TodoEditInput.current.value } : todo)))
                setView(false)
            }).catch((error) => console.error(`할일을 수정하는데 문제가 생겼습니다. 확인 후 다시 시도하십시오.`, error))
    }

    return (
        <div className='flex items-center justify-between'>
            <input type='text' defaultValue={todo.content} ref={TodoEditInput} className='w-[330px] p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-[15px]' />
            <div className='mt-[13px]'>
                <button onClick={() => handleEditTodos(todo.id, TodoEditInput)} className='px-2 py-2 font-semibold text-white bg-orange-400 rounded-md shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-opacity-50'>저장</button>
                <button onClick={() => setView(true)} className='px-2 py-2 font-semibold text-white bg-gray-400 rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-opacity-50 ml-[10px]'>취소</button>
            </div>
        </div>
    )
}

export default TodoItemEditTemplate;