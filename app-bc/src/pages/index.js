import React, { useEffect, useState } from 'react';
import ArticleCard from "@/components/ArticleCard";
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import axios from 'axios';
import { BaseUrl } from '@/shared';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [userInSession, setUserInSession] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const filtered = articles.filter((article) =>
      article.keywords.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredArticles(filtered);
  };

  useEffect(() => {
    axios.get(`${BaseUrl}/articles`).then((response) => {
      setArticles(response.data);
      console.log(articles)
    });

    if (localStorage.getItem('token') !== null) {
      setUserInSession(true);
    }
  }, []);

  return (
    <>
      <Header />
      {
        userInSession &&
        <div className="d-flex justify-content-center align-items-center mt-5">
          <h2 className="welcome">Olá, {localStorage.getItem('nome')}!</h2>
        </div>
      }

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

        {searchQuery && filteredArticles.length > 0 &&
          <div className="card mb-5 mt-5 row">
            <h4 className="card-header text-center mb-4" style={{ fontWeight: 'bold' }}>Artigos encontrados</h4>
            <div className="row">
              {filteredArticles.map((article, index) => (
                <ArticleCard key={index} article={article} />
              ))}
            </div>
          </div>
        }

        <div className="card mb-5 mt-5 row">
          <h4 className="card-header text-center mb-4" style={{ fontWeight: 'bold' }}>Destaques</h4>
          <div className="row">
            {articles
              .filter((article) => article.featured === 'on')
              .map((featuredArticle, index) => (
                <ArticleCard key={index} article={featuredArticle} />
              ))}
          </div>
        </div>

        <div className="card mb-4 row">
          <h4 className="card-header text-center mb-4" style={{ fontWeight: 'bold' }}>Os 10 mais curtidos</h4>
          <div className="row">
            {articles
              .sort((a, b) => b.likes - a.likes)
              .slice(0, 10)
              .map((article, index) => (
                <ArticleCard key={index} article={article} />
              ))}
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