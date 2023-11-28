import Header from "@/components/Header"
import SuccessMessage from "@/components/SuccessMessage"
import Link from "next/link"

export default function ArticleList() {
    return (
        <>
        <Header />
            <main className="mt-4">
                {/* <SuccessMessage /> */}

                <div className="mb-4" style={{ marginLeft: '6%', width: '140px' }}>
                    <a href="/articles/new" className="btn btn-success d-flex align-items-center">
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
                            <tr>
                                <td className="max-cell">id</td>
                                <td className="max-cell">title</td>
                                <td className="max-cell">body</td>
                                <td className="max-cell">palavras-chave</td>
                                <td className="max-cell">nome do autor</td>
                                <td className="text-center">data de publicação</td>
                                <td className="text-center">likes</td>
                                <td className="btn-group">
                                    <Link href="/article_edit/iddoartigo">
                                        <button className="btn btn-outline-primary btn-sm">
                                            <i className="material-icons">create</i>
                                        </button>
                                    </Link>
                                    <div style={{ margin: '3px' }}></div>
                                    {/* esse aqui faz requisição de delete passando o id do artigo como parametro */}
                                    <Link href="/articles/delete/iddoartigo"> 
                                        <button className="btn btn-outline-danger btn-sm">
                                            <i className="material-icons">delete</i>
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}