import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import {BaseUrl, baseUrl} from '../shared'
import axios from 'axios';
import SuccessMessage from '@/components/SuccessMessage';

export default function Login() {
    const [email, setUser] = useState('');
    const [pwd, setPassword] = useState('');
    const [userIncorret, setUserIncorret] = useState(false);

    const handleUserChange = (event) => {
        setUser(event.target.value);
        setUserIncorret(false);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setUserIncorret(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await axios.post(`${BaseUrl}/authenticate`, 
                JSON.stringify({email, pwd}),
                {
                    headers :{
                        'Content-Type': 'application/json',
                    }
                }

            );

            localStorage.setItem('token', response?.data.token )
            localStorage.setItem('nome', response?.data.user.author_name)         
            localStorage.setItem('level', response?.data.user.author_level)
                            
            window.location.href = '/';
        } catch(erro){
            if (erro.status = 404) {
                setUserIncorret(true);
            }
        }
};

    useEffect(() => {
        document.body.classList.add('background-gradient');
        return () => {
            document.body.classList.remove('background-gradient');
        };
    }, [userIncorret]);

    return (
        <>
            <Header />
            {
                userIncorret &&
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', marginTop: '5%' }}>
                    <SuccessMessage tipoMensagem="danger" message="Usuário ou senha incorreta!" />
                </div>
            }
            <main className="d-flex flex-column justify-content-center align-items-center min-vh-100">
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
