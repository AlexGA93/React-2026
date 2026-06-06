import ItemCounter from "./shopping-cart/ItemCounter";

interface ItemCart {
    name: string;
    quantity: number;
}

const shoppingCart: ItemCart[] = [
    {
        name: "Game Boy Color",
        quantity: 10
    },
    {
        name: "Game Boy Advance",
        quantity: 5
    },
    {
        name: "Game Boy Advance SP",
        quantity: 3
    }
];

export default function App() {

  return (
    <main data-testid="app-root">
      <h1 data-testid="app-title">Carrito de Compras</h1>
      <section data-testid="app-items">
        { shoppingCart.map((item, index) => (
          <ItemCounter
            key={item.name}
            name={item.name}
            quantity={item.quantity}
            testIdPrefix={`item-counter-${index}`}
          />
        )) }
      </section>
    </main>
  )
}

// export default App
/**
 * En el caso de poner export default App, al importar el componente no se pueden usar las llaves, es decir, se importaria asi: import App from './App.tsx'. Esto ocurre porque export default exporta un valor por defecto, mientras que export exporta un valor nombrado. Al usar export default, el componente se puede importar sin necesidad de usar llaves, ya que se asume que es el valor por defecto del módulo. En cambio, al usar export sin default, el componente debe ser importado usando llaves para indicar que se está importando un valor nombrado específico del módulo.
 */