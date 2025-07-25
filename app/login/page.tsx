"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleSendCode = async () => {
    if (!phone) return alert("휴대폰 번호를 입력해주세요.");

    // TODO: 여기에 SMS 발송 API 연동
    console.log("인증번호 발송 →", phone);
    setCodeSent(true);
  };

  const handleVerifyCode = async () => {
    if (!authCode) return alert("인증번호를 입력해주세요.");

    // TODO: 인증번호 확인 API 연동
    console.log("입력한 인증번호 →", authCode);
    setVerified(true); // 실제는 API 응답 결과에 따라 처리
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verified) return alert("휴대폰 인증을 완료해주세요.");

    // TODO: 로그인 API 연동
    console.log("로그인 시도:", { email, password, phone });
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "100px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>로그인</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "1rem" }}>
          <label>이메일</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>비밀번호</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>휴대폰 번호</label>
          <br />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <button
            type="button"
            onClick={handleSendCode}
            style={{ flex: 1, marginRight: "8px" }}
          >
            인증번호 요청
          </button>
          {codeSent && (
            <>
              <input
                type="text"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                placeholder="인증번호"
                style={{
                  flex: 1,
                  marginRight: "8px",
                  padding: "8px",
                }}
              />
              <button type="button" onClick={handleVerifyCode}>
                확인
              </button>
            </>
          )}
        </div>

        <button
          type="submit"
          disabled={!verified}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          로그인
        </button>
      </form>
    </div>
  );
}
