import axios from 'axios';
import { useView } from "../../context/viewContext";
import { useTodos } from '../../context/todoContext';

const TodoItemViewTemplate = ({ todo }) => {
    const { setView } = useView()
    const { todos, setTodos } = useTodos()

    const handleCheckTodo = (id) => {
        const checkedTodo = todos.find((todo) => todo.id === id)
        axios.put(`http://localhost:3000/todos/${id}`, { date: checkedTodo.date, content: checkedTodo.content, checked: !checkedTodo.checked })
            .then(() => {
                setTodos(todos.map((todo) => (todo.id === id ? { ...todo, checked: !todo.checked } : todo)))
            })
    }

    const handleDeleteTodos = (id) => {
        axios.delete(`http://localhost:3000/todos/${id}`)
            .then(() => {
                setTodos(todos.filter((todo) => (todo.id !== id)))
            }).catch((error) => console.error(`할일을 삭제하는데 문제가 생겼습니다. 확인 후 다시 시도하십시오.`, error))
    }

    return (
        <>
            <div className="flex justify-between mt-[20px]">
                <div>
                    <input type='checkbox' checked={todo.checked} onChange={() => handleCheckTodo(todo.id)} className="mr-[15px]" />
                    {todo.content}
                </div>
                <div>
                    <button onClick={() => handleDeleteTodos(todo.id)} className='px-2 py-2 font-semibold text-white bg-gray-400 rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-opacity-50'>삭제</button>
                    <button onClick={() => setView(todo.id)} className='px-2 py-2 font-semibold text-white bg-orange-400 rounded-md shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-opacity-50 ml-[10px]'>수정</button>
                </div>
            </div>
        </>
    )
}

export default TodoItemViewTemplate;