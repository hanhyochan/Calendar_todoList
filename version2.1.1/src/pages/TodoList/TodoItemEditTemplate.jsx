import React, { useRef } from 'react';
import { useView } from '../../context/viewContext';

const TodoItemEditTemplate = ({ todo, handleEditTodos}) => {
    const TodoEditInput = useRef(null)
    const { setView } = useView()
    return (
        <>
            <input type='text' defaultValue={todo.content} ref={TodoEditInput} />
            <button onClick={() => handleEditTodos(todo.id, TodoEditInput)}>저장</button>
            <button onClick={() => setView(true)}>취소</button>
        </>
    )
}

export default TodoItemEditTemplate;