import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Common/Input";
import Button from "../../Common/Button";
import Input_info from "../../Common/Input_info";

export default function SignUpForm() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [num, setNum] = useState("");
  const navigate = useNavigate();

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePw = (e) => {
    setPw(e.target.value);
  };

  const handlePw2 = (e) => {
    setPw2(e.target.value);
  };

  const handleNum = (e) => {
    setNum(e.target.value);
  };

  function handleBtn(e) {
    e.preventDefault();
    let userInfo = JSON.parse(localStorage.getItem("userInfos"));

    if (userInfo == null) {
      userInfo = [];
    }

    const infoForm = {
      key: crypto.randomUUID(),
      id: id,
      pw: pw,
    };

    localStorage.setItem("userInfos", JSON.stringify([...userInfo, infoForm]));

    navigate('/');
  }

  return (
    <div className="layout">
      <h1>Sign in</h1>
      <form onSubmit={handleBtn}>
        <Input_info
          value={id}
          onChange={handleId}
          placeholder="아이디를 입력해주세요"
        />
        <Input_info
          value={pw}
          onChange={handlePw}
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <Input_info
          value={pw2}
          onChange={handlePw2}
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
        />
        <Input_info
          value={num}
          onChange={handleNum}
          type="number"
          placeholder="전화번호를 입력해주세요"
        />

        <Button>확인</Button>
      </form>
    </div>
  );
}
