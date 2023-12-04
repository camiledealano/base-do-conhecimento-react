import Header from "@/components/Header";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ArticleList() {
    const [articles, setArticles] = useState([]);
    const URL_API = 'http://localhost:8080/api/articles';

    useEffect(() => {
        axios.get(`${URL_API}`).then((response) => {
            setArticles(response.data);
        });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${URL_API}/${id}`)
    }

    return (
        <>
            <Header />
            <main className="mt-4">
                <div className="mb-4" style={{ marginLeft: '6%', width: '140px' }}>
                    <a href="/article_create" className="btn btn-success d-flex align-items-center">
                        <i className="material-icons mr-2">add</i>
                        Novo artigo
                    </a>
                </div>

                <div className="list-data">
                    <table className="table">
                        <thead>
                            <tr className="table-light">
                                <th scope="col">Id</th>
                                <th scope="col">Título</th>
                                <th scope="col">Corpo</th>
                                <th scope="col">Palavras-Chave</th>
                                <th scope="col">Autor</th>
                                <th scope="col" className="text-center">Data de Publicação</th>
                                <th scope="col" className="text-center">Likes</th>
                                <th scope="col" className="text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((article) => (
                                <tr key={article._id}>
                                    <td className="max-cell">{article._id}</td>
                                    <td className="max-cell">{article.title}</td>
                                    <td className="max-cell">{article.body}</td>
                                    <td className="max-cell">{article.keywords}</td>
                                    <td className="max-cell">{article.author_name}</td>
                                    <td className="text-center">{article.published_date}</td>
                                    <td className="text-center">{article.likes}</td>
                                    <td className="btn-group">
                                        <Link href={`/article_edit/[id]`} as={`/article_edit/${article._id}`}>
                                            <button className="btn btn-outline-primary btn-sm">
                                                <i className="material-icons">create</i>
                                            </button>
                                        </Link>
                                        <div style={{ margin: '3px' }}></div>
                                        <button onClick={() => handleDelete(article._id)} className="btn btn-outline-danger btn-sm">
                                            <i className="material-icons">delete</i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
}