import Header from "@/components/Header";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BaseUrl } from "@/shared";
import SuccessMessage from "@/components/SuccessMessage";
import { useRouter } from "next/router";

export default function ArticleList() {
    const [articles, setArticles] = useState([]);
    const router = useRouter();
    const { success, edit } = router.query;
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    

    useEffect(() => {
        let usuarioAdmin = localStorage.getItem('level') === 'administrador';
        let usuarioLogado = localStorage.getItem('token') !== null


        if(!usuarioAdmin || !usuarioLogado){
            window.location.href = '/';
        }

        axios.get(`${BaseUrl}/articles`).then((response) => {
            setArticles(response.data);
        });

        if (success || edit) {
            setShowSuccessMessage(true);
        };
        
    }, [success, edit]);


    const handleDelete = (id) => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        axios.delete(`${BaseUrl}/articles/${id}`, { headers })
            .then(() => {
                setArticles(prevArticles => prevArticles.filter(article => article._id !== id));
            });

        setShowSuccessMessage(true);
    };

    const verifyAction = () => {
        if (success) {
            return 'criado';
        } else if (edit) {
            return 'editado';
        }
    }

    return (
        <>
            <Header />
            {
                showSuccessMessage &&
                <SuccessMessage
                    tipoMensagem={'success'}
                    cadastro={'Artigo'}
                    acao={verifyAction()}
                    message={'com sucesso!'}
                />
            }
            <main className="mt-4">
                <div className="mb-4" style={{ marginLeft: '6%', width: '140px' }}>
                    <a href="/article_create" className="btn btn-success d-flex align-items-center">
                        <i className="material-icons mr-2">add</i>
                        Novo artigo
                    </a>
                </div>

                <div style={{padding: '25px'}}>
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
                                    <td className="max-cell text-center">{article.published_date}</td>
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
