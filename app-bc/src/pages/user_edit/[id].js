import Header from "@/components/Header";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BaseUrl } from "@/shared";

export default function UserEdit() {
    const URL_API = 'http://localhost:8080/api/users';
    const [user, setUser] = useState({});
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            axios.get(`${URL_API}/${id}`).then((response) => {
                setUser(response.data);
            });
        }
    }, [id]);

    const handleStatusChange = (e) => {
        const { value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            author_status: value,
        }));
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleEditSubmit = (event) => {
        event.preventDefault();
    
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    
        axios.put(`${BaseUrl}/users/${user._id}`, user, { headers })
            .then((response) => {
                if (response.status === 201) {
                    location.href = '/user_list?edit=true';
                }
            });
    };

    return (
        <>
            <Header />
            <main className="container container-form mt-5 mb-5">
                <h2 className="text-center mb-1">Editar Usuário</h2>
                <form onSubmit={handleEditSubmit} encType="application/x-www-form-urlencoded">
                    <div className="col-md-12 mb-3">
                        <input onChange={handleInputChange} type="hidden" name="author_id" value={user.author_id} />
                        <label htmlFor="inputnome4">Nome</label>
                        <input onChange={handleInputChange} type="text" className="form-control focus-purple" id="inputnome4" name="author_name" value={user.author_name} />
                    </div>
                    <div className="col-md-12 row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="inputEmail4">E-mail</label>
                            <input onChange={handleInputChange} type="email" className="form-control focus-purple" id="inputEmail4" name="author_email" value={user.author_email} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword4">Senha</label>
                            <input onChange={handleInputChange} type="password" className="form-control focus-purple" id="inputPassword4" name="author_pwd" value={user.author_pwd} style={{ width: '105%' }} />
                        </div>
                    </div>
                    <div className="col-md-12 mb-3 row">
                        <div className="col-md-6">
                            <label htmlFor="inputEstado">Nível de Acesso</label>
                            <select id="inputEstado" className="form-control focus-purple" name="author_level" value={user.author_level} onChange={handleSelectChange}>
                                <option value="" disabled>Escolher...</option>
                                <option value="administrador">Administrador</option>
                                <option value="normal">Usuário Comum</option>
                            </select>
                        </div>
                        <div className="col-md-6" style={{ marginTop: '28px' }}>
                            <span className="col-sm-3" style={{ marginRight: '10px' }}>Status:</span>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input focus-purple"
                                    type="radio"
                                    name="author_status"
                                    id="gridRadios1"
                                    value="Ativo"
                                    checked={user.author_status === 'Ativo'}
                                    onChange={handleStatusChange}
                                />
                                <label className="form-check-label" htmlFor="gridRadios1">
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
                                    checked={user.author_status === 'Desativo'}
                                    onChange={handleStatusChange}
                                />
                                <label className="form-check-label" htmlFor="gridRadios2">
                                    Desativo
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="text-center btn-cadastrar-artigo">
                        <button type="submit" className="btn btn-success mt-2" style={{ width: '150px' }}>
                            Editar
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}
