import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import axios from "axios";

export default function ArticleDetail() {
    const URL_API = 'http://localhost:8080/api/articles';
    const [article, setArticle] = useState({});
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        let usuarioAdmin = localStorage.getItem('level') === 'administrador';
        let usuarioLogado = localStorage.getItem('token') !== null

        if(!usuarioAdmin || !usuarioLogado){
            window.location.href = '/';
        }
        
        if (id) {
            axios.get(`${URL_API}/${id}`).then((response) => {
                setArticle(response.data);
            })
        }
    });

    const handleLike = () => {
        axios.put(`${URL_API}/like/${id}`);
    }

    return (
        <>
            <Header />
            <main className="container mb-5">
                <div className="card mt-5">
                    <div className="text-center">
                        <div className="card-header">Artigo</div>
                        <div className="card-body">
                            <h5 className="card-title">{article.title}</h5>
                            <p className="card-text">{article.body}</p>
                            <div className="d-flex justify-content-center mb-3">
                                <button onClick={handleLike} type="button" className="btn btn-danger" style={{ marginRight: '5px' }}>
                                    <div className="d-flex align-items-center">
                                        <span className="material-icons" style={{ marginRight: '7px' }}>favorite</span>
                                        <p className="mb-0">{article.likes}</p>
                                    </div>
                                </button>

                                {article.featured === 'on' &&
                                    <a className="btn btn-warning" style={{cursor: 'default', pointerEvents: 'none'}}>
                                        <div className="d-flex align-items-center">
                                            <span className="material-icons" style={{ color: 'white' }}>grade</span>
                                        </div>
                                    </a>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="text-left" style={{ marginLeft: '13px' }}>
                        <span className="text-body-secondary">Palavras-chave: {article.keywords} </span>
                    </div>
                    <div className="card-footer text-body-secondary text-center">
                        Autor(a): {article.author_name}
                        <br></br>
                        Publicado em: {article.published_date}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}