import useMarvelService from "../../services/MarvelService";
import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicList/ComicsList";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';




const App = () => {
    const [charId, setCharId] = useState(null);
    const [comicId, setComicId] = useState(null);

    
    const getCharacterId = (id) => {
        setCharId(id)
    }

    const getComicId = (id) => {
        setComicId(id)
    }
    

    return (
        <div className="app">
            <ErrorBoundary>
                <AppHeader/>
            </ErrorBoundary>
            
            <main>
                {/* <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList getCharacterId={getCharacterId}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo setCharacterId={charId}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/> */}
                <ErrorBoundary>
                    <ComicsList getComicId={getComicId}/>
                </ErrorBoundary>
            </main>
        </div>
    )
}

export default App;