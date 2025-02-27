import { useState, useCallback } from "react";

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback( async(
                                        url, 
                                        boolOne = true, 
                                        boolTwo = false, 
                                        method = 'GET', 
                                        body = null, 
                                        headers = {'Content-type': 'application/json'}) => {
        setLoading(boolOne);

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            setLoading(boolTwo);
            return data;

        } catch(e) {

            setLoading(boolTwo);
            setError(e.message);
            throw e;

        }

    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError};
}

export default useHttp;