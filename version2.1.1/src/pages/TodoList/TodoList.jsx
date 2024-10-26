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

    const handledeleteTodos = (id) => {
        axios.delete(`http://localhost:3000/todos/${id}`)
            .then(() => {
                setTodos(todos.filter((todo) => (todo.id !== id)))
            })
    }

    const handlecheckTodo = (id) => {
        const checkedTodo = todos.find((todo) => todo.id === id)
        axios.put(`http://localhost:3000/todos/${id}`, { content: checkedTodo.content, checked: !checkedTodo.checked })
            .then(() => {
                setTodos(todos.map((todo) => (todo.id === id ? { ...todo, checked: !todo.checked } : todo)))
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

    const TodoList = () => {
        return (
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <input type='checkbox' checked={todo.checked} onChange={() => handlecheckTodo(todo.id)} />
                        {todo.content}
                        <button onClick={() => handledeleteTodos(todo.id)}>삭제</button>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div>
            <Calendar onClickDay={setDate} />
            <h1>{moment(date).format("YYYY년 MM월 DD일")}</h1>
            <TodoInput />
            <TodoList />
        </div>
    );
};

export default TodoList;