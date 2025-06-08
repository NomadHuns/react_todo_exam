import React, {useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../../commons/Constants";
import {useNavigate} from "react-router-dom";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            setError("아이디와 비밀번호를 입력하세요.");
            return;
        }

        try {
            const response = await axios.post(BASE_URL + '/api/v1/auth/login', {
                username,
                password
            });

            if (response.data.success) {
                const { accessToken, refreshToken } = response.data.response.token;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                setError("");
                navigate("/");
            } else {
                setError(response.data.error.message || "로그인 실패");
            }

        } catch (err: any) {
            const message = err.response?.data?.error?.message
                || err.response?.data?.message
                || "로그인 중 오류가 발생했습니다.";
            setError(message);
            console.error("로그인 실패:", err.response);
        }
    };

    return (
        <div style={styles.container}>
            <h2>로그인</h2>
            <input
                type="text"
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
            />
            {error && <div style={styles.error}>{error}</div>}
            <button onClick={handleLogin} style={styles.button}>
                로그인
            </button>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    container: {
        width: "300px",
        margin: "100px auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        fontFamily: "sans-serif",
    },
    input: {
        padding: "10px",
        fontSize: "14px",
        border: "1px solid #ccc",
        borderRadius: "4px",
    },
    button: {
        padding: "10px",
        backgroundColor: "#316dae",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    error: {
        color: "red",
        fontSize: "12px",
    },
};

export default LoginPage;
