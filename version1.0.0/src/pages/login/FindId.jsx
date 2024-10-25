import { useState } from "react";
import Input_info from "../../Common/Input_info";
import Button from "../../Common/Button";
import { useNavigate } from "react-router-dom";


export default function FindId() {

  const [view, setView] = useState(true);
  const [findId, setFindId] = useState("");
  const [findName, setFindName] = useState("");
  const [findNum, setFindNum] = useState("");
  const [newId, setnewId] = useState("");
  const navigate = useNavigate();

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

    navigate('/');
  };

  const handleNewPw = (e) => {
    setnewId(e.target.value);
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
      <h1>아이디 찾기</h1>
      {view ? (
        <div>
          <p className="subSentence">비밀번호와 개인정보를 입력해주세요</p>
          <form onSubmit={handleBtn}>
            <Input_info
              value={findId}
              type="password"
              placeholder="비밀번호를 입력해주세요."
              onChange={handleFindId}
            />
            <Input_info
              value={findName}
              type="type"
              placeholder="이름을 입력해주세요."
              onChange={handlefindName}
            />
            <Input_info
              id="number"
              value={findNum}
              type="number"
              placeholder="전화번호를 입력해주세요. '-' 생략"
              onChange={handlefindNum}
            />
            <Button type="submit">확인</Button>
          </form>
          </div>
      ) : (
        <div className="layout">
          <p>새로운 아이디를 입력해주세요.</p>
          <form onSubmit={handleBtn2}>
            <Input_info
              value={newId}
              type="type"
              placeholder="아이디를 입력해주세요."
              onChange={handleNewPw}
            />
            <Button type="submit">확인</Button>
          </form>
          </div>
      )}
      </div>
  );
}
