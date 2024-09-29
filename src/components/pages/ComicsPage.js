import { useState } from "react";

import ComicsList from "../comicList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";


const ComicsPage = () => {
    const [comicId, setComicId] = useState(null);

    const getComicId = (id) => {
        setComicId(id)
    }
    
    return (
        <>
            <ErrorBoundary>
                <AppBanner/>
                <ComicsList getComicId={getComicId} />
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;