
import SingleComic from "../singleComic/SingleComic";
import AppBanner from "../appBanner/AppBanner";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";


const SingleComicPage = () => {
    
    return (
        <>
            <ErrorBoundary>
                <AppBanner/>
                <SingleComic/>
            </ErrorBoundary>
        </>
    )
}

export default SingleComicPage;