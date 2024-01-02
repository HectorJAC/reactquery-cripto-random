import { useEffect, useState, useReducer } from "react";

const getRamdomNumberFromApi = async ():Promise<number> => {
    const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new');
    const numberString = await res.text();
    return Number(numberString);
}

export const App = () => {
    
    const [number, setNumber] = useState<number>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();
    const [key, forceRefetch] = useReducer(((x) => x + 1), 0)

    useEffect(() => {
        setIsLoading(true);
        getRamdomNumberFromApi()
            .then(num => setNumber(num))
            .catch(error => setError(error.message));
    }, [key]);

    useEffect(() => {
        if (number) setIsLoading(false);
    }, [number]);

    useEffect(() => {
        if (error) setIsLoading(false);
    }, [error]);
    
    return (
        <div className="App App-header">
            {
                isLoading 
                ? <h2>Cargando...</h2> 
                : <h2>Numero Aleatorio: {number}</h2>
            }
            
            <button 
                onClick={forceRefetch}
                disabled={isLoading}
            >
                {
                    isLoading ? '...' : 'Refrescar'
                }
            </button>

        </div>
    );
};
