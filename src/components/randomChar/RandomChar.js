import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { getCharacter } from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        updateChar();
    }, [])

    function updateChar() {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        setLoading(true);
        
        getCharacter(id)
        .then(res => {
            setState(res);
            setLoading(false)
        })
        .catch(onError);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }
    
    const View = () => {
        return (
            <div className="randomchar__block">
                <img src={state.thumbnail} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{state.name}</p>
                    <p className="randomchar__descr">
                        {state.description ? state.description : "Описание отстутствует"}
                    </p>
                    <div className="randomchar__btns">
                        <a href={state.homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={state.wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
    
    const errorContent = error ? <ErrorMessage/> : null;
    const loadingContent = loading ? <Spinner/> : null;
    const contentContent = !(loading || error) ? <View/> : null;

    return (   
        <div className="randomchar">
            {errorContent}
            {loadingContent}
            {contentContent}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main"
                        onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

export default RandomChar;