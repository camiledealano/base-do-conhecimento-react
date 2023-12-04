import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import {baseUrl} from '../shared'
import axios from 'axios';
import Home from '../pages/index'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [email, setUser] = useState('');
    const [pwd, setPassword] = useState('');

    const handleUserChange = (event) => {
        setUser(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = 'http://localhost:8080/api/authenticate';

        try{
            const response = await axios.post(url, 
                JSON.stringify({email, pwd}),
                {
                    headers :{
                        'Content-Type': 'application/json',
                    }
                }

            );
            
            console.log(response?.data.user.author_name + " logado com sucesso!")

            localStorage.setItem('token', response?.data.token )
            localStorage.setItem('nome', response?.data.user.author_name)
            localStorage.setItem('token', response?.data.user.author_user)
            
   

        } catch(erro){
          console.log(erro.response?.data)
        }
};

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
                            name="author_email"
                            placeholder="Digite seu e-mail"
                            type="text"
                            value={email}
                            onChange={handleUserChange}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            name="author_pwd"
                            placeholder="Digite sua senha"
                            type="password"
                            value={pwd}
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
