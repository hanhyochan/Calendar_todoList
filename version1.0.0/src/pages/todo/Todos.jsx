import React from "react";
import { useState } from "react";

export default function Todos({
  id,
  checked,
  content,
  deleteBtn,
  handleCheckbox,
  editContent,
}) {
  const [view, setView] = useState(true);
  const [newContent, setNewContent] = useState(content);

  function handleSubmit(e) {
    e.preventDefault();
    editContent(id, newContent);
    setView(true)
  }

  const viewTemplate = (
    <>
      <div>
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => handleCheckbox(id)}
          />
          <span>{content}</span>
          <button onClick={() => deleteBtn(id)}>삭제</button>
          <button onClick={() => setView(false)}>수정</button>
        </label>
      </div>
    </>
  );

  const editTemplate = (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <button onClick={() => setView(true)}>취소</button>
        <button>저장</button>
      </form>
    </>
  );

  return <li>{view ? viewTemplate : editTemplate}</li>;
}
