import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar'
import moment from 'moment';
import axios from 'axios';

const TodoList = () => {
    // 날짜정보
    const [date, setDate] = useState(new Date())
    const selectedDate = moment(date).format("YYYYMMDD");

    const todoInput = useRef(null)
    const [todos, setTodos] = useState([])

    const [view, setView] = useState("")
    const TodoEditInput = useRef(null)

    // 첫 렌더링 시 화면에 정보 뿌리기
    useEffect(() => {
        axios.get('http://localhost:3000/todos')
            .then((res) => (
                setTodos(res.data)
            ))
    }, [])


    const addTodos = () => {
        const todoInfo = {
            id: crypto.randomUUID(),
            content: todoInput.current.value,
            checked: false
        }
        axios.post('http://localhost:3000/todos', todoInfo)
            .then((res) => {
                setTodos([...todos, res.data])
                todoInput.current.value = ''
            })
    }

    const TodoInput = () => {
        return (
            <>
                <input type='text' ref={todoInput} />
                <button onClick={addTodos}>제출</button>
            </>
        )
    }


    const TodoItems = () => {
        return (
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {view === todo.id ? <TodoItemeditTemplate todo={todo} /> : <TodoItemViewTemplate todo={todo} />}
                    </li>
                ))}
            </ul>
        )
    }


    const TodoItemViewTemplate = ({ todo }) => {
        return (
            <>
                <input type='checkbox' checked={todo.checked} onChange={() => handleCheckTodo(todo.id)} />
                {todo.content}
                <button onClick={() => handleDeleteTodos(todo.id)}>삭제</button>
                <button onClick={() => setView(todo.id)}>수정</button>
            </>
        )
    }

    const handleCheckTodo = (id) => {
        const checkedTodo = todos.find((todo) => todo.id === id)
        axios.put(`http://localhost:3000/todos/${id}`, { content: checkedTodo.content, checked: !checkedTodo.checked })
            .then(() => {
                setTodos(todos.map((todo) => (todo.id === id ? { ...todo, checked: !todo.checked } : todo)))
            })
    }

    const handleDeleteTodos = (id) => {
        axios.delete(`http://localhost:3000/todos/${id}`)
            .then(() => {
                setTodos(todos.filter((todo) => (todo.id !== id)))
            })
    }

    const TodoItemeditTemplate = ({ todo }) => {
        return (
            <>
                <input type='text' defaultValue={todo.content} ref={TodoEditInput} />
                <button onClick={() => handleEditTodos(todo.id)}>저장</button>
                <button onClick={() => setView(true)}>취소</button>
            </>
        )
    }

    const handleEditTodos = (id) => {
        const editedTodo = todos.find((todo) => todo.id === id)
        axios.put(`http://localhost:3000/todos/${id}`, { content: TodoEditInput.current.value, checked: editedTodo.checked })
            .then(() => {
                setTodos(todos.map((todo) => (todo.id === id ? { ...todo, content: TodoEditInput.current.value } : todo)))
                setView("")
            })
    }


    return (
        <div>
            <Calendar onClickDay={setDate} />
            <h1>{moment(date).format("YYYY년 MM월 DD일")}</h1>
            <TodoInput />
            <TodoItems />
        </div>
    );
};

export default TodoList;