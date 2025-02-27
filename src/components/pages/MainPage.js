import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';


const MainPage = () => {
    const [charId, setCharId] = useState(null);

    const getCharacterId = (id) => {
        setCharId(id)
    }
    
    return (
        <>
            <ErrorBoundary>
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
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>

    )
}

export default MainPage;