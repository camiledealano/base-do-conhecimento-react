import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import axios from 'axios';

export default function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleUserChange = (event) => {
        setUser(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8080/api/users', {
            username: user,
            password: password
        }).then((response) => {
            if (response.status = 200) {
                window.location.href = '/';
            }
        })
    };

    useEffect(() => {
        document.body.classList.add('background-gradient');

        return () => {
            document.body.classList.remove('background-gradient');
        };
    }, []);

    return (
        <>
            <Header />
            <main className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
                <form
                    className="form text-center justify-content-center"
                    onSubmit={handleSubmit}
                >
                    <p className="form-title">Entre na sua conta</p>
                    <div className="input-container">
                        <input
                            name="user"
                            placeholder="Digite seu e-mail"
                            type="text"
                            value={user}
                            onChange={handleUserChange}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            name="password"
                            placeholder="Digite sua senha"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button className="submit" type="submit">
                        Entrar
                    </button>
                </form>
            </main>
        </>
    );
}
