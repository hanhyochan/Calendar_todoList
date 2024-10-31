import { useView } from "../../context/viewContext";

const TodoItemViewTemplate = ({ todo, handleCheckTodo, handleDeleteTodos }) => {
    const { setView } = useView()
    return (
        <>
            <div className="flex justify-between mt-[20px]">
                <div>
                    <input type='checkbox' checked={todo.checked} onChange={() => handleCheckTodo(todo.id)} />
                    {todo.content}
                </div>
                <div>
                    <button onClick={() => handleDeleteTodos(todo.id)} className='px-2 py-2 font-semibold text-white bg-gray-400 rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-opacity-50'>삭제</button>
                    <button onClick={() => setView(todo.id)} className='px-2 py-2 font-semibold text-white bg-purple-400 rounded-md shadow hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-opacity-50 ml-[10px]'>수정</button>
                </div>
            </div>
        </>
    )
}

export default TodoItemViewTemplate;