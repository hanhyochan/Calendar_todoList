import TodoItemViewTemplate from './TodoItemViewTemplate';
import TodoItemEditTemplate from './TodoItemeditTemplate';
import { useView } from '../../context/viewContext';

const TodoItems = ({ todos, selectedDate, handleEditTodos, handleCheckTodo, handleDeleteTodos }) => {
    const filteredTodos = todos.filter((todo) => todo.date === selectedDate)
    const { view } = useView()

    return (
        <ul>
            {filteredTodos.length > 0 ? (filteredTodos.map((todo) => (
                <li key={todo.id}>
                    {view === todo.id ? <TodoItemEditTemplate
                        todo={todo}
                        handleEditTodos={handleEditTodos}
                    /> :
                        <TodoItemViewTemplate
                            todo={todo}
                            handleCheckTodo={handleCheckTodo}
                            handleDeleteTodos={handleDeleteTodos}
                        />}
                </li>
            ))) : (
                <p>할일이 없습니다.</p>
            )}
        </ul>
    )
}

export default TodoItems