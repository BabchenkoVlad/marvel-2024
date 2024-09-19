
import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { getAllCharacters } from '../../services/MarvelService';

import './charList.scss';


const CharList = ({getCharacterId}) => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        onCharListLoaded();
    }, [])

    const onCharListLoaded = () => {
        getAllCharacters()
            .then(res => {
                setCharacters(res);
                setLoading(false);
            })
            .catch(onError);
    }

    const onLoadMoreChar = () => {
        getAllCharacters()
            .then(res => {
                setCharacters(...characters, res);
            })
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const renderCharacters = (arr) =>  {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};

            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => getCharacterId(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const charCards = renderCharacters(characters);

    const errorContent = error ? <ErrorMessage/> : null;
    const loadingContent = loading ? <Spinner/> : null;
    const contentContent = !(loading || error) ? charCards : null;

    return (
        <div className="char__list">

            {errorContent}
            {loadingContent}
            {contentContent}

            <button className="button button__main button__long"
                    onClick={onLoadMoreChar}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;