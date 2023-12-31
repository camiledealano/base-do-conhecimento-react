import React, { useEffect, useState } from 'react';

export default function SuccessMessage(props) {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    useEffect(() => {
        if(!props.message){
            setIsVisible(false)
            return;
        }

        setIsVisible(true)
        
        const time = setTimeout(() => {
            setIsVisible(false)
        }, 3000)

        return () => clearTimeout(time);
    }, [props.message])

    return (
        <>
            {isVisible && (
                <div className={`container alert alert-${props.tipoMensagem} d-flex justify-content-between align-items-center`} style={{ width: '400px' }}>
                    {props.cadastro} {props.acao} {props.message}
                    <button onClick={handleClose} className="close-button">
                        <i className="material-icons" style={{ color: 'var(--primary)', cursor: 'pointer' }}>close</i>
                    </button>
                </div>
            )}
        </>
    );
}
