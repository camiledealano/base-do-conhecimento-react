import Header from "@/components/Header"
import axios from "axios";
import Link from "next/link"
import { useEffect, useState } from "react"
import { BaseUrl } from "@/shared";
import { useRouter } from "next/router";
import SuccessMessage from "@/components/SuccessMessage";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const router = useRouter();
    const { success, edit } = router.query;
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        let usuarioAdmin = localStorage.getItem('level') === 'administrador';
        let usuarioLogado = localStorage.getItem('token') !== null

        if(!usuarioAdmin || !usuarioLogado){
            window.location.href = '/';
        }

        axios.get(`${BaseUrl}/users`).then((response) => {
            setUsers(response.data);
        });

        if (success || edit) {
            setShowSuccessMessage(true);
        };
    }, [success, edit]);

    const verifyAction = () => {
        if (success) {
            return 'criado';
        } else if (edit) {
            return 'editado';
        }
    }

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        axios.delete(`${BaseUrl}/users/${id}`, { headers })
            .then(() => {
                setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
            })
    }

    return (
        <>
            <Header />
            {
                showSuccessMessage &&
                <SuccessMessage
                    tipoMensagem={'success'}
                    cadastro={'Usuário'}
                    acao={verifyAction()}
                    message={'com sucesso!'}
                />
            }
            <main className="mt-4">

                <div className="mb-4" style={{ marginLeft: '6%', width: '150px' }}>
                    <a href="/user_create" className="btn btn-success d-flex align-items-center">
                        <i className="material-icons mr-2">add</i>
                        Novo usuário
                    </a>
                </div>

                <div className="list-data ">
                    <table className="table">
                        <thead>
                            <tr className="table-light">
                                <th scope="col">Id</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Usuário</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Nível</th>
                                <th scope="col">Status</th>
                                <th scope="col">Ações</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.author_name}</td>
                                        <td>{user.author_user}</td>
                                        <td>{user.author_email}</td>
                                        <td>{user.author_level}</td>
                                        <td>{user.author_status}</td>
                                        <td className="btn-group">
                                            <Link href="/user_edit/[id]" as={`/user_edit/${user._id}`}>
                                                <button className="btn btn-outline-primary btn-sm">
                                                    <i className="material-icons">create</i>
                                                </button>
                                            </Link>
                                            <div style={{ margin: '3px' }}></div>
                                            <button onClick={() => handleDelete(user._id)} className="btn btn-outline-danger btn-sm">
                                                <i className="material-icons">delete</i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}