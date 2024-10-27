import React, { useRef } from 'react';

const TodoInput = ({ addTodos }) => {
    const todoInput = useRef(null)
    return (
        <>
            <input type='text' ref={todoInput} />
            <button onClick={() => addTodos(todoInput)}>제출</button>
        </>
    )
}

export default TodoInput;