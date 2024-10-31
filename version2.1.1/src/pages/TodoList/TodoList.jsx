import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'
import moment from 'moment';
import axios from 'axios';
import Clock from '../../module/Clock';
import TodoInput from './TodoInput';
import TodoItems from './TodoItems';
import { useView } from '../../context/viewContext';
// import 'react-calendar/dist/Calendar.css';


const TodoList = () => {
    const [date, setDate] = useState(new Date())
    const [todos, setTodos] = useState([])
    const { setView } = useView()
console.log(todos)
    useEffect(() => {
        axios.get('http://localhost:3000/todos')
            .then((res) => (
                setTodos(res.data)
            ))
    }, [])


    const selectedDate = moment(date).format("YYYYMMDD");

    const addTodos = (todoInput) => {
        if (todoInput.current.value.trim() === "") return alert(`할일을 입력하세요.`);

        const todoInfo = {
            date: selectedDate,
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
            })
    }

    const handleEditTodos = (id, TodoEditInput) => {
        const editedTodo = todos.find((todo) => todo.id === id)
        axios.put(`http://localhost:3000/todos/${id}`, { date: editedTodo.date, content: TodoEditInput.current.value, checked: editedTodo.checked })
            .then(() => {
                setTodos(todos.map((todo) => (todo.id === id ? { ...todo, content: TodoEditInput.current.value } : todo)))
                setView(false)
            })
    }

    const wholeTodosdate = todos.map((todo) => todo.date)

    const dateColor = ({ date, view }) => {
        if (view === "month") {
            const calendarDate = moment(date).format("YYYYMMDD");
            const comparison = wholeTodosdate.filter((date) => date.includes(calendarDate));
            if (comparison.length > 0) {
                return "daysWithTodos";
            }
        }
        return null;
    };

    return (
        <div style={{ backgroundColor: 'rgb(231, 231, 231)' }} className="flex items-center justify-center h-screen bg-neutral-300">
            <Clock />
            <div className='flex bg-white w-[1000px] h-[500px] rounded-2xl p-[30px] gap-[30px]'>
                <Calendar onClickDay={setDate} tileClassName={dateColor} />
                <div className='w-[470px]'>
                    <h1>{moment(date).format("YYYY년 MM월 DD일")}</h1>
                    <TodoInput addTodos={addTodos} />
                    <TodoItems
                        todos={todos} selectedDate={selectedDate} handleEditTodos={handleEditTodos} handleCheckTodo={handleCheckTodo} handleDeleteTodos={handleDeleteTodos}
                    />
                </div>
            </div>
        </div>
    );
};

export default TodoList;