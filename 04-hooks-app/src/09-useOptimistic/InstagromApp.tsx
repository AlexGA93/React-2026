import { useOptimistic, useState } from "react";

interface Comment {
  id: number;
  text: string;
  optimistic?: boolean;
}

export const InstagromApp = () => {
  // Estado real de los comentarios. Aquí se guardan los datos que eventualmente
  // se persistirán en el backend.
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, text: "¡Gran foto!" },
    { id: 2, text: "Me encanta 🧡" },
  ]);

  // useOptimistic permite mostrar una versión provisional de la UI mientras
  // la petición al servidor sigue en proceso. El segundo argumento define cómo
  // debe verse el estado optimista cuando se añade un nuevo comentario.
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    // Estado base que se muestra cuando no hay actividad pendiente.
    comments,
    // Acción que construye el siguiente estado optimista a partir del estado
    // actual y el texto del nuevo comentario.
    (currentComments: Comment[], newCommentText: string) => {
      // Devolvemos una copia del estado con el comentario nuevo marcado como
      // provisional para que el usuario vea una respuesta inmediata.
      return [
        ...currentComments,
        {
          id: new Date().getTime(),
          text: newCommentText,
          optimistic: true,
        },
      ];
    },
  );

  const handleAddComment = async (formData: FormData) => {
    const messageTextByInput = formData.get("post-message") as string;
    console.log(messageTextByInput);

    // Añadimos el comentario de forma optimista para que la interfaz responda
    // al instante, aunque el guardado real aún no haya terminado.
    addOptimisticComment(messageTextByInput);

    // Simulamos la latencia de la comunicación con el servidor.
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("mensaje grabado");

    // Cuando termina la operación, actualizamos el estado real con el
    // comentario definitivo.
    setComments((prev) => [
      ...prev,
      {
        id: new Date().getTime(),
        text: messageTextByInput, // ! convendria validar con Zod ya que hemos tenido que machacar arriba como string, pero eso no deberiamos hacerlo
      },
    ]);
  };

  return (
    <div className="bg-slate-700 h-screen flex flex-col items-center justify-center">
      {/* Post de ejemplo */}
      <div className="flex flex-col items-center justify-center bg-gray-300 rounded-t-3xl p-4 w-[500px]">
        <img
          src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=500&fit=crop"
          alt="Instagrom"
          className="object-cover rounded-xl mb-4"
        />
        <p className="text-black font-bold mb-4">
          Mira que interesante esta funcionalidad de la API de React.
        </p>
      </div>

      {/* Comentarios */}
      <ul className="flex flex-col items-start justify-center bg-gray-300 w-[500px] p-4">
        {optimisticComments.map((comment) => (
          <li key={comment.id} className="flex items-center gap-2 mb-2">
            <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-white text-center">A</span>
            </div>
            <p className="text-black">{comment.text}</p>
            {comment.optimistic && (
              <span className="text-gray-500 text-sm">enviando... </span>
            )}
          </li>
        ))}
      </ul>

      {/* Formulario de comentarios */}
      <form
        action={(event) => handleAddComment(event)}
        className="flex flex-col items-center justify-center bg-gray-300 w-[500px] rounded-b-3xl p-4"
      >
        <input
          type="text"
          name="post-message"
          placeholder="Escribe un comentario"
          required
          className="w-full p-2 rounded-md mb-2 text-black bg-white"
        />
        <button
          type="submit"
          disabled={false}
          className="bg-blue-500 text-white p-2 rounded-md w-full"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
