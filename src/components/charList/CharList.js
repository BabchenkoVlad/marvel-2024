
import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';


const CharList = ({getCharacterId}) => {
    const [characters, setCharacters] = useState([]);
    const [reqLoad, setReqLoad] = useState(false);
    const [offset, setOffset] = useState(210);
    const [active, setActive] = useState(null);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onCharListLoaded(offset, true);
    }, [])

    const onCharListLoaded = (offset, initial) => {
        initial ? setReqLoad(false) : setReqLoad(true);
        
        getAllCharacters(offset)
            .then(res => {
                setCharacters(prev => ([...prev, ...res]));
                setReqLoad(false);
                setOffset(prev => prev + 9)
            })
    }

    const handleClick = (id) => {
        getCharacterId(id);
        setActive(id);
    }

    const renderCharacters = (arr) =>  {
        const items =  arr.map((item) => {

            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            let classNameActive = "char__item";
            if (active === item.id) {
                classNameActive = "char__item char__item_selected";
            }
            
            return (
                <li 
                    className={classNameActive}
                    key={item.id}
                    onClick={() => handleClick(item.id)}
                    >
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
    const loadingContent = loading && !reqLoad ? <Spinner/> : null;
    // const contentContent = !(loading || error) ? charCards : null;

    return (
        <div className="char__list">

            {errorContent}
            {loadingContent}
            {charCards}

            <button className="button button__main button__long"
                    onClick={onCharListLoaded}
                    disabled={reqLoad}
                    >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;