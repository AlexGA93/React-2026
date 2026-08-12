// importamos la libreria de axios
import axios from "axios";

// importamos la base url de las variables de entorno
const BASE_URL = import.meta.env.VITE_API_URL;

// creamos nueva instancia de axios con la variable de entorno importada
export const heroApi = axios.create({
  baseURL: `${BASE_URL}/api/heroes`,
});
