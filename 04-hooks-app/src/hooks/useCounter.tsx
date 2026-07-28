import { useState } from "react"

export const useCounter = (initialValue: number = 1) => {
    const [counter, setCounter] = useState(initialValue);

    const increment = () => {
        console.log('inc');
        
        setCounter(counter + 1)
    };

    const decrement = () => {
        if (counter <= 1) return;
        console.log('dec');
        setCounter(counter - 1)
    };

    return {
        counter,
        increment,
        decrement
    }
}
