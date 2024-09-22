import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const [state, setState] = useState({});

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [])

    function updateChar() {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        
        getCharacter(id)
        .then(res => {
            setState(res);
        })
    }
    
    const View = () => {
        const {name, description, thumbnail, homepage, wiki} = state;

        let imgStyle = {'objectFit' : 'cover'};
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'contain'};
        }

        return (
            <div className="randomchar__block">
                <img 
                    src={thumbnail} 
                    alt="Random character" 
                    className="randomchar__img" 
                    style={imgStyle}
                />
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {description ? description : "Описание отстутствует"}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
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