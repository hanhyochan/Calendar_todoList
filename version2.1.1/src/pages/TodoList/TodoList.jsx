import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'
import moment from 'moment';
import axios from 'axios';
import Clock from '../../module/Clock';
import TodoInput from './TodoInput';
import TodoItems from './TodoItems';
import { useTodos } from '../../context/todoContext';

const TodoList = () => {
    const [date, setDate] = useState(new Date())
    const { todos, setTodos } = useTodos()

    useEffect(() => {
        axios.get('http://localhost:3000/todos')
            .then((res) => (
                setTodos(res.data)
            )).catch((error) => console.error(`할일을 불러오는데 문제가 생겼습니다. 확인 후 다시 시도하십시오.`, error))
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
            }).catch((error) => console.error(`할일을 추가하는데 문제가 생겼습니다. 확인 후 다시 시도하십시오.`, error))
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
                        selectedDate={selectedDate}
                    />
                </div>
            </div>
        </div>
    );
};

export default TodoList;