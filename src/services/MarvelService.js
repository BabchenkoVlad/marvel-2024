const _apiBase = 'https://gateway.marvel.com:443/v1/public/characters';
const _apiKey = 'apikey=df8b198f5818646e19e0ef00d3d3f1b3';

const offset = 210;

const getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}

const getAllCharacters = async () => {
    const res = await getResource(`${_apiBase}?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
}

const getCharacter = async (id) => {
    const res = await getResource(`${_apiBase}/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
}

const _transformCharacter = (char) => {
    return {
        id: char.id,
        name: char.name,
        description: char.description,
        thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
        homepage: char.urls[0].url,
        wiki: char.urls[1].url,
        comics: char.comics.items
    }
}


export {getAllCharacters};
export {getCharacter};