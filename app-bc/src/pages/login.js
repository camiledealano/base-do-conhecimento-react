import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";

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
        console.log("Usuário:", user);
        console.log("Senha:", password);
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
                    action="/login/autenticar"
                    method="POST"
                    encType="application/x-www-form-urlencoded"
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
