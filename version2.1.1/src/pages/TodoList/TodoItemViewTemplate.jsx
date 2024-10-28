import { useView } from "../../context/viewContext";

const TodoItemViewTemplate = ({ todo, handleCheckTodo, handleDeleteTodos}) => {
    const { setView } = useView()
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