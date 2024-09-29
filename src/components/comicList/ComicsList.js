import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';


const ComicsList = ({getComicId}) => {
    const [comics, setComics] = useState([]);
    const [reqLoad, setReqLoad] = useState(false);
    const [offset, setOffset] = useState(50);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onCharListLoaded(offset, true);
    }, [])

    const onCharListLoaded = (offset, initial) => {
        initial ? setReqLoad(false) : setReqLoad(true);
        
        getAllComics(offset)
            .then(res => {
                setComics(prev => ([...prev, ...res]));
                setReqLoad(false);
                setOffset(prev => prev + 9)
            })
    }

    const renderCharacters = (arr) =>  {
        const items =  arr.map((item) => {
            return (
                <li className="comics__item" 
                    key={item.id} 
                    onClick={() => getComicId(item.id)}>

                    <a href="#">
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const comicCards = renderCharacters(comics);

    const errorContent = error ? <ErrorMessage/> : null;
    const loadingContent = loading && !reqLoad ? <Spinner/> : null;
    // const contentContent = !(loading || error) ? charCards : null;

    return (
        <div className="comics__list">

            {errorContent}
            {loadingContent}
            {comicCards}

            <button className="button button__main button__long"
                    onClick={() => onCharListLoaded(offset)}
                    disabled={reqLoad}
                    >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;