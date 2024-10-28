import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import Todos from "./Todos";
// import { DeleteTodo } from "./utils/DeleteTodo";

export default function Main() {
  // todosByDate라는 이름으로 로컬스토리지에 저장된 문자열을 객체로 바꿔서 가져온다.
  const savedTodoList = JSON.parse(localStorage.getItem("todosByDate")) || {};

  // 누른 날짜값 저장, 투두input에 입력한 투두, 로컬스토리지에서 불러온 투두리스트 저장
  const [value, setValue] = useState(new Date());
  const [content, setContent] = useState("");
  const [todosByDate, setTodosByDate] = useState(savedTodoList);

  // todoInfo 객체의 키에 사용 될 내가 현재 누른 날짜값
  const selectedDate = moment(value).format("YYYYMMDD");

  // 현재 선택한 selectedDate를 키값으로 가진 로컬스토리지에서 불러온 투두들 || selectedDate 키 값이 없을 경우는 빈 배열
  // [
  //  { id: '1', content: 'Todo 1', checked: false },
  //  { id: '2', content: 'Todo 2', checked: true },
  // ],
  const todoList = todosByDate[selectedDate] || [];

  // todosByDate가 바뀔 때마다 todosByDate를 todosByDate라는 이름으로 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem("todosByDate", JSON.stringify(todosByDate));
  }, [todosByDate]);

  // todosByDate 객체의 키를 문자열 배열로 만든다.
  const datekeys = Object.keys(todosByDate);

  // 1. calendar의 모드가 month일 때 로직이 시행되게 한다.
  // 2. calendar의 날짜들을 datekeys와 비교할 수 있도록 객체 배열로 만든다.
  // 3. include함수로 datekeys가 formattedDate 포함되어있을 경우 스타일을 적용한다.
  const dateColor = ({ date, view }) => {
    if (view === "month") {
      const calendarDate = moment(date).format("YYYYMMDD");
      console.log(date)
      const comparison = datekeys.filter((x) => x.includes(calendarDate));
      if (comparison.length > 0) {
        return "dateColor";
      }
    }
    return null;
  };

  // 투두input에서 투두가 제출 되었을 때
  function handleSubmit(e) {
    e.preventDefault();
    // content가 빈 문자열일 경우에는 함수 정지. early if문이라고 함.
    if (content.trim() === "") return;

    // 투두input에서 입력한 값에 id, content, checked 항목으로 나누어 저장한다.
    const todoInfo = {
      id: crypto.randomUUID(),
      content: content,
      checked: false,
    };

    // 기존 todosByDate를 복사해 펼쳐놓고 그 안에 선택한 selectedDate 안에 기존에 있던 투두 내용들과(스프레드 연산자) 새로 추가된 todoInfo를 덮어씌워 저장한다.
    // 전체 기존 복사+펼쳐놓음 > 선택한 날짜 기존 할일 복사+펼쳐놓은 후 새로운 todoInfo저장함 > 전체 기존 복사+펼쳐놓은거에 덮어씌워 저장
    const updatedTodosByDate = {
      ...todosByDate,
      [selectedDate]: [...(todosByDate[selectedDate] || []), todoInfo],
    };

    // 복사되어 새로 업데이트된 updatedTodosByDate를 TodosByDate에 저장한다.
    setTodosByDate(updatedTodosByDate);
    setContent("");
  }

  // todoInfo에서 id를 받는다.
  const deleteBtn = (id) => {
    // todoList의 갯수만큼 todo라는 매개변수(임시) 이름으로 todoList 객체들의 id와 내가 클릭한 엘리먼트의 id를 비교하여 id가 같지 않은 것들만 updatedTodoList에 저장한다.
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);

    // 기존의 todosByDate를 복사해 펼쳐놓고(스프레드 연산자) 선택된 selectedDate에 새로 업데이트 된 updatedTodoList를 할당한 후 todosByDate에 덮어씌워 저장한다.
    const updatedTodosByDate = {
      ...todosByDate,
      [selectedDate]: updatedTodoList,
    };
    // updatedTodoList가 없으면(삭제했을 때 투두가 더이상 없으면) updatedTodosByDate를 구조분해할당해서 선택된 selectedDate의 데이터 값은 '_'으로 삭제 처리하고 그 rest연산자로(...)그 나머지는 newUpdated라는 이름으로 TodosByDate에 저장한다.
    // updatedTodosByDate가 0이 아닌 경우 그냥 TodosByDate에 저장한다.
    if (updatedTodoList.length === 0) {
      const { [selectedDate]: _, ...newUpdated } = updatedTodosByDate;
      setTodosByDate(newUpdated);
    } else {
      setTodosByDate(updatedTodosByDate);
    }
  };

  // todoInfo에서 id를 받는다.
  const handleCheckbox = (id) => {
    // todoList의 배열 수 만큼 todo라는 이름의 매개변수로 전체 todo의 id랑 선택한 객체 id랑 비교해서 id가 같을 경우 todo를 복사하여 checked라는 키 값을 !todo.checked를 통해 반전시킨 후 todo에 저장한다. id가 다를 경우엔 그냥 todo를 반환한다.
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    );

    // todosByDate를 스프레드 연산자로 복사해 펼쳐놓고 선택된 selectedDate 날짜에 updatedTodoList를 할당한 후 todosByDate에 덮어씌워 저장해서 updatedTodosByDate 변수에 저장한다.
    const updatedTodosByDate = {
      ...todosByDate,
      [selectedDate]: updatedTodoList,
    };
    setTodosByDate(updatedTodosByDate);
  };

  function editContent(id, newContent) {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, content: newContent } : todo
    );

    const updatedTodosByDate = {
      ...todosByDate,
      [selectedDate]: updatedTodoList,
    };
    setTodosByDate(updatedTodosByDate);
  }

  const renderedTodoList = todoList.map((x) => (
    <Todos
      key={x.id}
      id={x.id}
      checked={x.checked}
      content={x.content}
      deleteBtn={deleteBtn}
      handleCheckbox={handleCheckbox}
      editContent={editContent}
    />
  ));

  return (
    <div id="todo_layout_1">
      <div id="todo_layout_2">
        <Calendar onClickDay={setValue} tileClassName={dateColor} />
        <div id="todoList">
          <h3>{moment(value).format("YYYY년 MM월 DD일")}</h3>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="할일을 입력해주세요.."
              />
              <button>입력</button>
            </form>
          </div>
          <ul>{renderedTodoList}</ul>
        </div>
      </div>
    </div>
  );
}