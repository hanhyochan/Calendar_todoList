import React, { useRef } from 'react';

const TodoItemEditTemplate = ({ todo, handleEditTodos, setView }) => {
    const TodoEditInput = useRef(null)
    return (
        <>
            <input type='text' defaultValue={todo.content} ref={TodoEditInput} />
            <button onClick={() => handleEditTodos(todo.id, TodoEditInput)}>저장</button>
            <button onClick={() => setView(true)}>취소</button>
        </>
    )
}

export default TodoItemEditTemplate;