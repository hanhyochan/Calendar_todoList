import { useState } from "react";
import Input_info from "../../Common/Input_info";
import Button from "../../Common/Button";
import { Navigate, useNavigate } from "react-router-dom";

export default function FindPw() {
  const [view, setView] = useState(true);
  const [findId, setFindId] = useState("");
  const [findName, setFindName] = useState("");
  const [findNum, setFindNum] = useState("");
  const [newPw, setnewPw] = useState("");
  const naviate = useNavigate();

  const handleFindId = (e) => {
    setFindId(e.target.value);
  };

  const handlefindName = (e) => {
    setFindName(e.target.value);
  };

  const handlefindNum = (e) => {
    setFindNum(e.target.value);
  };

  const handleBtn = (e) => {
    e.preventDefault();
    const idInfo = {
      userId: findId,
      name: findName,
      number: findNum,
    };
    console.log(idInfo);

    naviate('/')
  };

  const handleNewPw = (e) => {
    setnewPw(e.target.value);
  };

  const handleBtn2 = (e) => {
    e.preventDefault();
    const idInfo2 = {
      pw: newPw,
    };
    console.log(idInfo2);
  };

  return (
    <div className="layout">
      <h1>비밀번호 찾기</h1>
      {view ? (
        <div>
          <p className="subSentence">아이디와 개인정보를 입력해주세요</p>
          <form onSubmit={handleBtn}>
            <Input_info
              value={findId}
              type="type"
              placeholder="아이디를 입력해주세요."
              onChange={handleFindId}
            />
            <Input_info
              value={findName}
              type="type"
              placeholder="이름을 입력해주세요."
              onChange={handlefindName}
            />
            <Input_info
              value={findNum}
              type="number"
              placeholder="전화번호를 입력해주세요."
              onChange={handlefindNum}
            />
            <button>인증하기</button>
            <Button type="submit">확인</Button>
          </form>
        </div>
      ) : (
        <div className="layout">
          <p>새로운 비밀번호를 입력해주세요.</p>
          <form onSubmit={handleBtn2}>
            <Input_info
              value={newPw}
              type="password"
              placeholder="비밀번호를 입력해주세요."
              onChange={handleNewPw}
            />
            <Button type="submit">확인</Button>
          </form>
        </div>
      )}
    </div>
  );
}
