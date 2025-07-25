"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://rgpsh.iptime.org:17070/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (!response.ok) {
        alert("로그인 실패");
        return;
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      setIsLoggedIn(true);
      alert("로그인 성공!");
    } catch (err) {
      alert("로그인 중 오류 발생");
      console.error(err);
    }
  };

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return alert("로그인되어 있지 않습니다.");

    try {
      const response = await fetch("http://rgpsh.iptime.org:17070/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        alert("로그아웃 실패");
        return;
      }

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
      alert("로그아웃 완료!");
    } catch (err) {
      alert("로그아웃 중 오류 발생");
      console.error(err);
    }
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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="submit"
            style={{
              flex: 1,
              backgroundColor: "#0070f3",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "4px",
            }}
          >
            로그인
          </button>

          <button
            type="button"
            onClick={handleLogout}
            disabled={!isLoggedIn}
            style={{
              flex: 1,
              backgroundColor: "#f33",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "4px",
            }}
          >
            로그아웃
          </button>
        </div>
      </form>
    </div>
  );
}
