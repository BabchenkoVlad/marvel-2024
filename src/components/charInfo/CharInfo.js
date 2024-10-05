import { useState, useEffect } from 'react';

import './charInfo.scss';

import Skeleton from '../skeleton/Skeleton'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';


const CharInfo = ({setCharacterId}) => {
    const [state, setState] = useState(null);
    
    const {loading, error, getCharacter, clearError} = useMarvelService();
    
    const onCharListLoaded = () => {

        if (!setCharacterId) {
            return;
        }

        clearError();
        getCharacter(setCharacterId)
            .then(res => {
                setState(res);
            })
    }

    useEffect(() => {
        onCharListLoaded();
    }, [setCharacterId])

    const View = () => {
        const {name, description, thumbnail, homepage, wiki, comics} = state;

    
        let imgStyle = {'objectFit' : 'cover'};
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'contain'};
        }
    
        return (
            <>
                <div className="char__basics">
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null : 'There is no comics with this character'}
                    {
                        comics.map((item, i) => {
                            // eslint-disable-next-line
                            if (i > 9) return;
                            return (
                                <li key={i} className="char__comics-item">
                                    {item.name}
                                </li>
                            )
                        })
                    }                
                </ul>
            </>
        )
    }


    const skeleton = state || loading || error ? null : <Skeleton/>;
    const errorContent = error ? <ErrorMessage/> : null;
    const loadingContent = loading ? <Spinner/> : null;
    const contentContent = !(loading || error || !state) ? <View/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorContent}
            {loadingContent}
            {contentContent}
        </div>
    )
}

export default CharInfo;