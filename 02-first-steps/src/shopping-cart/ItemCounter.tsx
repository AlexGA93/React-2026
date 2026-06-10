// importaciones de react
import React, { useState } from 'react';
// importaciones de terceros
// importaciones customizadas mias
// importaciones de estilos
import styles from './ItemCounter.module.css';

interface Props {
    name: string;
    // valor opcional
    quantity?: number;
    testIdPrefix?: string;
}

type Operation = 'inc' | 'dec';

const MIN_QUANTITY = 3;

const ItemCounter: React.FC<Props> = ({ name, quantity, testIdPrefix = 'item-counter' }: Props) => {

    /**
     * llamamos a hook de estado local que almacena como valor inicial la cantidad del producto, o 0 si no se proporciona. 
     * 
     * useState devuelve un array con dos elementos: el valor actual del estado (count) y una función para actualizarlo (setCount).
     */
    const [count, setCount] = useState<number>(quantity || 0);

    /**
     * 
     * @param operation 
     * @description La función handleClick se encarga de actualizar el estado del contador en función de la operación que se le indique. Si la operación es 'inc', incrementa el contador en 1, y si es 'dec', lo decrementa en 1.
     */
    const handleClick = (operation: Operation) => {
        console.log("boton pulsado");
        if (operation === 'inc') {
            setCount(count + 1); // Incrementa el contador en 1
        } else {
            if (count > 0) {
                setCount(count - 1); // Decrementa el contador en 1
            }
            
        }
    };

  return (
      <section className={ styles.item } data-testid={`${testIdPrefix}-section`}>
        <span className={ styles.itemSpan } data-testid={`${testIdPrefix}-name`}>{ name }</span>
        <button onClick={() => handleClick('inc')} data-testid={`${testIdPrefix}-increment`}>+1</button>
          <span className={styles.itemSpan} data-testid={`${testIdPrefix}-value-wrapper`}>
              <div data-testid={`${testIdPrefix}-value`}>
                  <p className={count >= MIN_QUANTITY ? styles.overMin : styles.underMin}>{ count }</p>
              </div>
          </span>
        <button onClick={() => handleClick('dec')} data-testid={`${testIdPrefix}-decrement`}>-1</button>  
    </section>
  )
}
export default ItemCounter