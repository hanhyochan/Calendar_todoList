const TodoItemViewTemplate = ({ todo, handleCheckTodo, handleDeleteTodos, setView }) => {
    return (
        <>
            <input type='checkbox' checked={todo.checked} onChange={() => handleCheckTodo(todo.id)} />
            {todo.content}
            <button onClick={() => handleDeleteTodos(todo.id)}>삭제</button>
            <button onClick={() => setView(todo.id)}>수정</button>
        </>
    )
}

export default TodoItemViewTemplate;