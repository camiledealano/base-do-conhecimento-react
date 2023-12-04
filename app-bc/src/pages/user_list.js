import Header from "@/components/Header"
import axios from "axios";
import Link from "next/link"
import { useEffect, useState } from "react"

export default function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/users').then((response) => {
            setUsers(response.data);
        })
    }, [])

    return (
        <>
            <Header />
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
                                    <tr>
                                        <td>{user._id}</td>
                                        <td>{user.author_name}</td>
                                        <td>{user.author_user}</td>
                                        <td>{user.author_email}</td>
                                        <td>{user.author_level}</td>
                                        <td>{user.author_status}</td>
                                        <td className="btn-group">
                                            <Link href="/users/edit/iddoautor">
                                                <button className="btn btn-outline-primary btn-sm">
                                                    <i className="material-icons">create</i>
                                                </button>
                                            </Link>
                                            <div style={{ margin: '3px' }}></div>
                                            <Link href="/users/delete/iddoautor">
                                                <button className="btn btn-outline-danger btn-sm">
                                                    <i className="material-icons">delete</i>
                                                </button>
                                            </Link>
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