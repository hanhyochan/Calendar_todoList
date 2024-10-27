import TodoItemViewTemplate from './TodoItemViewTemplate';
import TodoItemEditTemplate from './TodoItemeditTemplate';

const TodoItems = ({ todos, selectedDate, view, setView, handleEditTodos, handleCheckTodo, handleDeleteTodos}) => {
    const filteredTodos = todos.filter((todo) => todo.date === selectedDate)
    return (
        <ul>
            {filteredTodos.length > 0 ? (filteredTodos.map((todo) => (
                <li key={todo.id}>
                    {view === todo.id ? <TodoItemEditTemplate 
                    todo={todo} 
                    handleEditTodos={handleEditTodos}
                    view={view}
                    setView={setView}
                    /> :
                    <TodoItemViewTemplate
                    todo={todo}
                    handleCheckTodo={handleCheckTodo}
                    handleDeleteTodos={handleDeleteTodos}
                    view={view}
                    setView={setView}
                    />}
                </li>
            ))) : (
                <p>할일이 없습니다.</p>
            )}
        </ul>
    )
}

export default TodoItems