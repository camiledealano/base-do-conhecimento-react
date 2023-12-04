import React, { useEffect, useState } from 'react';
import ArticleCard from "@/components/ArticleCard";
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import axios from 'axios';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const URL_API = 'http://localhost:8080/api'
  const resultQuery = [];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Search Query:", searchQuery);
  };

  useEffect(() => {
    axios.get(URL_API + '/articles').then((response) => {
      setArticles(response.data);
    })
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center mt-5">
        <h2 className="welcome">Olá, nome do autor!</h2>
      </div>

      <main className="container" id="artigos">
        <div className="container">
          <div className="row justify-content-center mt-3">
            <div className="col-8">
              <form onSubmit={handleSearchSubmit}>
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control focus-purple"
                    placeholder="Busque por palavras-chaves..."
                    name="q"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button
                    className="btn btn-rounded focus-purple"
                    type="submit"
                    style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                  >
                    <i className="material-icons">search</i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {resultQuery.length > 0 &&
          <div className="card mb-5 mt-5 row">
            <h4 className="card-header text-center mb-4" style={{ fontWeight: 'bold' }}>Artigos encontrados</h4>
            <div className="row">
              {
                articles.map((article, index) => (
                  <ArticleCard key={index} article={article} />))
              }
            </div>
          </div>
        }

        <div className="card mb-5 mt-5 row">
          <h4 className="card-header text-center mb-4" style={{ fontWeight: 'bold' }}>Destaques</h4>
          <div className="row">
            {
              articles.map((article, index) => (
                <ArticleCard key={index} article={article} />))
            }
          </div>
        </div>

        <div className="card mb-4 row">
          <h4 className="card-header text-center mb-4" style={{ fontWeight: 'bold' }}>Os 10 mais curtidos</h4>
          <div className="row">
            {
              articles.map((article, index) => (
                <ArticleCard key={index} article={article} />))
            }
          </div>
        </div>

        <div className="card mb-4 row">
          <h4 className="card-header text-center mb-4" style={{ fontWeight: 'bold' }}>Todos os Artigos</h4>
          <div className="row">
            {
              articles.map((article, index) => (
                <ArticleCard key={index} article={article} />))
            }
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
