import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './singleComic.scss';


const SingleComic = () => {
    const [comic, setComic] = useState(null);
    const {comicId} = useParams();

    const {loading, error, getComic, clearError} = useMarvelService();
    
    useEffect(() => {
        onComicLoaded();
    }, [comicId])

    const onComicLoaded = () => {
        clearError();
        getComic(comicId)
            .then(res => {
                console.log(res);
                         
                setComic(res);
            })
    }

    const View = ({comic}) => {
        const {title, description, thumbnail, price, pageCount, language} = comic;

    
        return (
            <>
                <div className="single-comic">
                    <img src={thumbnail} alt={title} className="single-comic__img"/>
                    <div className="single-comic__info">
                        <h2 className="single-comic__name">{title}</h2>
                        <p className="single-comic__descr">{description}</p>
                        <p className="single-comic__descr">{language}</p>
                        <p className="single-comic__descr">{pageCount}</p>
                        <div className="single-comic__price">{price}</div>
                    </div>
                    <Link to="/comics" className="single-comic__back">Back to all</Link>
                </div>
            </>
        )
    }


    const errorContent = error ? <ErrorMessage/> : null;
    const loadingContent = loading ? <Spinner/> : null;
    const contentContent = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <div className="char__info">
            {errorContent}
            {loadingContent}
            {contentContent}
        </div>
    )
}

export default SingleComic;