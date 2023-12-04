import Header from "@/components/Header";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from "axios";
import { BaseUrl } from "@/shared";

export default function ArticleEdit() {
    const URL_API = 'http://localhost:8080/api/articles';
    const [article, setArticle] = useState({});
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            axios.get(`${URL_API}/${id}`).then((response) => {
                setArticle(response.data);
            })
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArticle((prevArticle) => ({
            ...prevArticle,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        axios.put(`${BaseUrl}/articles/${article._id}`, article, { headers })
            .then((response) => {
                if (response.status === 201) {
                    location.href = '/article_list';
                }
            });
    }

    return (
        <>
            <Header />
            <main className="container container-form mt-4 mb-5">
                <h2 className="text-center mb-1">Editar Artigo</h2>
                <form className="row g-3" onSubmit={handleSubmit} encType="application/x-www-form-urlencoded">
                    <div className="col-md-12">
                        <input type="hidden" name="id" value={article._id} />
                        <label htmlFor="title" className="form-label">Título</label>
                        <input type="text" className="form-control focus-purple" name="title" value={article.title} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="body" className="form-label">Corpo do texto</label>
                        <textarea className="form-control focus-purple" style={{ height: '200px' }} name="body" value={article.body} onChange={handleInputChange}></textarea>
                    </div>
                    <div className="col-12">
                        <label htmlFor="keywords" className="form-label">Palavras-chave</label>
                        <input type="text" className="form-control focus-purple" name="keywords" value={article.keywords} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="author_name" className="form-label">Nome do autor</label>
                                <input type="text" className="form-control focus-purple" name="author_name" value={article.author_name} onChange={handleInputChange} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="published_date" className="form-label">Data de publicação</label>
                                <input type="text" className="form-control focus-purple" name="published_date" value={article.published_date} onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3" style={{ marginTop: '28px' }}>
                        <span className="col-sm-3" style={{ marginRight: '12px' }}>Artigo destaque?</span>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input focus-purple" type="radio" name="featured" id="gridRadios1" value="on" checked={article.featured === 'on'} onChange={handleInputChange} />
                            <label className="form-check-label focus-purple" htmlFor="gridRadios1">
                                Sim
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input focus-purple" type="radio" name="featured" id="gridRadios2" value="off" checked={article.featured === 'off'} onChange={handleInputChange} />
                            <label className="form-check-label" htmlFor="gridRadios2">
                                Não
                            </label>
                        </div>
                    </div>
                    <div className="text-center btn-cadastrar-artigo">
                        <button type="submit" className="btn btn-success" style={{ width: '150px' }}>Editar</button>
                    </div>
                </form>
            </main>
        </>
    );
}
