import { useState } from "react";
/**
 * Custom Hook
 * En este caso buscamos lidiar con toda la logica que tiene el componente counter
 */


export const useCounter = (initialValue: number = 5) => {
    
  const [counter, setCounter] = useState<number>(initialValue);

    // funciones
    const handleAdd = () => {
        setCounter(counter + 1);
    };

    const handleSubstract = () => { 
        setCounter(previousState => previousState - 1);
    };

    const handleReset = () => { 
        setCounter(initialValue);
    };


    return {
        // props or values
        counter,
        // methods or actions
        handleAdd,
        handleSubstract,
        handleReset
    }
}
