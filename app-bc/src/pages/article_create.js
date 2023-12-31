import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useState } from "react";
import axios from "axios";
import { BaseUrl } from "@/shared";

export default function ArticleCreate() {
    const [featured, setFeatured] = useState('on');
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        keywords: '',
        author_name: '',
        published_date: '',
    });

    const handleFeaturedChange = (e) => {
        setFeatured(e.target.value);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        let usuarioAdmin = localStorage.getItem('level') === 'administrador';
        let usuarioLogado = localStorage.getItem('token') !== null

        if(!usuarioAdmin || !usuarioLogado){
            window.location.href = '/';
        }
        
        e.preventDefault();

        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        axios.post(`${BaseUrl}/articles`, {
            ...formData,
            featured,
        }, {headers}).then((response) => {
            if (response.status === 201) {
                location.href = '/article_list?success=true';
            }
        })  
    };

    return (
        <>
            <Header />
            <main className="container container-form mt-5 mb-5">
                <h2 className="text-center mb-2">Cadastro de Artigo</h2>
                <form className="row g-3" onSubmit={handleSubmit} encType="application/x-www-form-urlencoded">
                    <div className="col-md-12">
                        <label htmlFor="title" className="form-label">Título</label>
                        <input onChange={handleInputChange} type="text" className="form-control focus-purple" name="title"></input>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="body" className="form-label">Corpo do texto</label>
                        <textarea onChange={handleInputChange} className="form-control focus-purple" name="body" style={{ height: '200px' }}></textarea>
                    </div>
                    <div className="col-12">
                        <label htmlFor="keywords" className="form-label">Palavras-chave</label>
                        <input onChange={handleInputChange} type="text" className="form-control focus-purple" name="keywords"></input>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="author_name" className="form-label">Nome do autor</label>
                                <input onChange={handleInputChange} type="text" className="form-control focus-purple" name="author_name"></input>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="published_date" className="form-label">Data de publicação</label>
                                <input onChange={handleInputChange} type="text" className="form-control focus-purple" name="published_date"></input>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3" style={{ marginTop: '28px' }}>
                        <span className="col-sm-3" style={{ marginRight: '12px' }}>Artigo destaque?</span>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input focus-purple"
                                type="radio"
                                name="featured"
                                id="gridRadios1"
                                value="on"
                                checked={featured === 'on'}
                                onChange={handleFeaturedChange}
                            />
                            <label className="form-check-label focus-purple" htmlFor="gridRadios1">
                                Sim
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input focus-purple"
                                type="radio"
                                name="featured"
                                id="gridRadios2"
                                value="off"
                                checked={featured === 'off'}
                                onChange={handleFeaturedChange}
                            />
                            <label className="form-check-label" htmlFor="gridRadios2">
                                Não
                            </label>
                        </div>
                    </div>  
                    <div className="text-center btn-cadastrar-artigo">
                        <button type="submit" className="btn btn-success" style={{ width: '150px' }}>Cadastrar</button>
                    </div>
                </form>
            </main>
            <Footer />
        </>
    )
}