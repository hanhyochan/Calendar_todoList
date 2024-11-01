import React, { useRef } from 'react';

const TodoInput = ({ addTodos }) => {
    const todoInput = useRef(null)
    return (
        <>
            <input type='text' ref={todoInput} className='w-[380px] p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-[15px]' />
            <button onClick={() => addTodos(todoInput)} className='px-2 py-2 font-semibold text-white bg-red-700 rounded-md shadow hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-opacity-50 ml-[20px]'>제출</button>
        </>
    )
}

export default TodoInput;