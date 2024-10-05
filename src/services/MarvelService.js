import useHttp from '../hooks/http.hook';

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=df8b198f5818646e19e0ef00d3d3f1b3';

    const _offsetChar = 210;


    const getAllCharacters = async (offset = _offsetChar) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        console.log(res);
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    };

    const getAllComics = async (offset) => {
		const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`, true, false);
        console.log(res);
		return res.data.results.map(_transformComic);
	};

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);

        return _transformComic(res.data.results[0]);
    };

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description
				? `${char.description.slice(0, 210)}...`
				: "There is no description for this character",
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    };

    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            description: comic.description || "There is no description",
            price: comic.prices[0].price
				? `${comic.prices[0].price}$`
				: "not available",
            pageCount: comic.pageCount
				? `${comic.pageCount} p.`
				: "No information about the number of pages",
            language: comic.textObjects[0]?.language || "en-us",
        }
    };

    return {loading, 
            error, 
            clearError, 
            getAllCharacters, 
            getCharacter, 
            getAllComics, 
            getComic};
}

export default useMarvelService;