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
    })

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

    return (
        <div>
            <Calendar onClickDay={setDate} />
            <h1>{moment(date).format("YYYY년 MM월 DD일")}</h1>
            <input type='text' ref={todoInput} />
            <button onClick={addTodos}>제출</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.content}
                        {/* <button onClick={() => deleteTodos(todo.id)}>삭제</button> */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;