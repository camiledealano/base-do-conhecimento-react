import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
    const [usuarioAdmin, setUsuarioAdmin] = useState(false);
    const [usuarioLogado, setUsuarioLogado] = useState(false);

    useEffect(() => {
        setUsuarioAdmin(localStorage.getItem('level') === 'administrador');
        setUsuarioLogado(localStorage.getItem('token') !== null);
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <Link className="navbar-brand font-croissant" href="/" style={{ marginLeft: '5%' }}>
                    <Image src="/icon.png" className='d-inline-block align-top mr-2' width={30} height={30} priority />
                    <span>BC - Base do Conhecimento</span>
                </Link>
                <div className="collapse navbar-collapse justify-content-end" style={{ marginRight: '3%' }}>
                    <ul className="navbar-nav ml-auto font-nunito-bold">
                        <li className={'nav-item'}>
                            <Link href="/" className="nav-link font-nunito-bold">Home</Link>
                        </li>
                        <li className="nav-item">
                            {usuarioAdmin && <Link href="/article_list" className="nav-link font-nunito-bold">Artigos</Link>}
                        </li>
                        <li className={'nav-item'}>
                            {usuarioAdmin && <Link href="/user_list" className="nav-link font-nunito-bold">Usuários</Link>}
                        </li>
                        <li className={'nav-item'}>
                            {!usuarioLogado && <Link href="/login" className="nav-link font-nunito-bold">Login</Link>}
                        </li>
                        <li className="nav-item">
                            {usuarioLogado && (
                                <a
                                    href="#"
                                    className="nav-link font-nunito-bold"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        location.href = '/';
                                        localStorage.clear();
                                        // Você pode adicionar mais lógica aqui, se necessário
                                        setUsuarioLogado(false);
                                    }}
                                >
                                    Sair
                                </a>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
