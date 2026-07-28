import { useRef } from "react"

export const FocusScreen = () => {

    // useRef crea una referencia que permite acceder al elemento del DOM
    // sin necesidad de usar estado ni provocar un nuevo render.
    const inputRef = useRef<HTMLInputElement>(null);

    // Cuando se presiona el botón, se accede al input por su referencia
    // y se selecciona su contenido para mostrar el uso práctico de useRef.
    const handleCLick = () => {
        console.log(inputRef.current?.value);

        inputRef.current?.select();
    }

  return (
      <div className="bg-gradient flex flex-col gap-4">
          <h1 className="text-2xl font-thin text-white">Focus Screen</h1>
          <input type="text"
              ref={inputRef}
              className="bg-white text-black px-4 rounded-md"
              autoFocus
          />
          <button
          onClick={handleCLick}
              className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">Set Focus</button>
    </div>
  )
}
