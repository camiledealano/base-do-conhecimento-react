import React, { useState } from 'react';
import Header from "@/components/Header";
import axios from "axios";
import { BaseUrl } from '@/shared';

export default function UserCreate() {
    const [userData, setUserData] = useState({
        author_name: '',
        author_email: '',
        author_pwd: '',
        author_level: 'normal',
        author_status: 'Ativo',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleStatusChange = (e) => {
        const { value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            author_status: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        
        axios.post(`${BaseUrl}/users`,
            { ...userData },
            { headers }).then((response) => {
                if (response.status === 201) {
                    location.href = '/user_list';
                }
            })
    };

    return (
        <>
            <Header />
            <main className="container container-form mt-5 mb-5">
                <h2 className="text-center mb-3">Cadastro de Usuário</h2>
                <form onSubmit={handleSubmit} encType="application/x-www-form-urlencoded">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="name">Nome</label>
                        <input type="text" className="form-control focus-purple" id="name" name="author_name" onChange={handleInputChange} value={userData.author_name}></input>
                    </div>
                    <div className="col-md-12 row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" className="form-control focus-purple" id="email" name="author_email" onChange={handleInputChange} value={userData.author_email}></input>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="senha">Senha</label>
                            <input type="password" className="form-control focus-purple" id="senha" name="author_pwd" onChange={handleInputChange} value={userData.author_pwd} style={{ width: '105%' }}></input>
                        </div>
                    </div>
                    <div className="col-md-12 mb-3 row">
                        <div className="col-md-6">
                            <label htmlFor="nivel-acesso">Nível de Acesso</label>
                            <select
                                id="nivel-acesso"
                                className="form-control focus-purple"
                                name="author_level"
                                value={userData.author_level}
                                onChange={handleInputChange}
                            >
                                <option value="administrador">Administrador</option>
                                <option value="normal">Usuário comum</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3" style={{ marginTop: '28px' }}>
                            <span className="col-sm-3" style={{ marginRight: '12px' }}>Status:</span>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input focus-purple"
                                    type="radio"
                                    name="author_status"
                                    id="gridRadios1"
                                    value="Ativo"
                                    checked={userData.author_status === 'Ativo'}
                                    onChange={handleStatusChange}
                                />
                                <label className="form-check-label focus-purple" htmlFor="gridRadios1">
                                    Ativo
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input focus-purple"
                                    type="radio"
                                    name="author_status"
                                    id="gridRadios2"
                                    value="Desativo"
                                    checked={userData.author_status === 'Desativo'}
                                    onChange={handleStatusChange}
                                />
                                <label className="form-check-label" htmlFor="gridRadios2">
                                    Desativo
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="text-center btn-cadastrar-artigo">
                        <button type="submit" className="btn btn-success mt-2" style={{ width: '150px' }}>Salvar</button>
                    </div>
                </form>
            </main>
        </>
    );
}
