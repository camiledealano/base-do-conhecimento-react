import Link from "next/link";

export default function ArticleCard({ article }) {
    return (
        <>
            {article &&
                <div className="col col-lg-4 mb-3">
                    <div className="card text-center h-100">
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{article.title}</h5>
                            <p className="card-text flex-grow-1">{article.body}</p>
                            <figcaption className="blockquote-footer mb-0 text-body-secondary">
                                Escrito por <cite title="Source Title">{article.author_name}</cite>
                            </figcaption>
                            <p className="card-text">
                                <small className="text-body-tertiary">Publicado em {article.published_date}</small>
                            </p>
                            <div className="text-center">
                                <button type="button" className="btn btn-danger mb-3 disabled">
                                    <div className="d-flex align-items-center">
                                        <span className="material-icons" style={{ marginRight: '7px' }}>
                                            favorite
                                        </span>
                                        <p className="mb-0">{article.likes}</p>
                                    </div>
                                </button>
                            </div>
                            <Link href={`/article_details/${article._id}`} className="link-secondary">
                                <p style={{ color: 'var(--primary)' }}>Saiba mais..</p>
                            </Link>
                        </div>
                    </div>
                </div>
            }

        </>
    );
}
