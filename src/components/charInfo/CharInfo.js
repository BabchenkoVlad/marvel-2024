import { useState, useEffect } from 'react';

import './charInfo.scss';

// import Skeleton from '../skeleton/Skeleton'
// import Spinner from '../spinner/Spinner';
// import ErrorMessage from '../errorMessage/ErrorMessage';
import { getCharacter } from '../../services/MarvelService';


const CharInfo = ({setCharacterId}) => {
    const [state, setState] = useState();
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);
    
    const onCharListLoaded = () => {

        // if (!setCharacterId) {
        //     return;
        // }

        // setLoading(true);

        getCharacter(setCharacterId)
            .then(res => {
                setState(res);
                // setLoading(false);
            })
            // .catch(onError);
    }

    useEffect(() => {
        onCharListLoaded();
    }, [setCharacterId])

    // const onError = () => {
    //     setLoading(false);
    //     setError(true);
    // }

    const View = () => {
        // const {name, description, thumbnail, homepage, wiki, comics} = state;
    
        let imgStyle = {'objectFit' : 'cover'};
        if (state.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'contain'};
        }
    
        return (
            <>
                <div className="char__basics">
                    <img src={state.thumbnail} alt={state.name} style={imgStyle}/>
                    <div>
                        <div className="char__info-name">{state.name}</div>
                        <div className="char__btns">
                            <a href={state.homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={state.wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {state.description}
                </div>
                <div className="char__comics">Comics:</div>
                {/* <ul className="char__comics-list">
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
                </ul> */}
            </>
        )
    }


    // const skeleton = state || loading || error ? null : <Skeleton/>;
    // const errorContent = error ? <ErrorMessage/> : null;
    // const loadingContent = loading ? <Spinner/> : null;
    // const contentContent = !(loading || error || !state) ? <View char={state}/> : null;

    return (
        <div className="char__info">
            <View />
            {/* {skeleton}
            {errorContent}
            {loadingContent}
            {contentContent} */}
        </div>
    )
}

export default CharInfo;