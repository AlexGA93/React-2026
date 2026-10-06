// Import all product images
import blackBackpack from "@/assets/product-black-backpack.jpg";
import blackJacket from "@/assets/product-black-jacket.jpg";
import blackTshirt from "@/assets/product-black-tshirt.jpg";
import greySweatshirt from "@/assets/product-grey-sweatshirt.jpg";
import whiteCap from "@/assets/product-white-cap.jpg";
import whiteHoodie from "@/assets/product-white-hoodie.jpg";

export interface Product {
  id: string;
  to: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
}

export const products: Product[] = [
  {
    id: "1",
    to: "1-camiseta-tesla-negro",
    name: "Camiseta Tesla Negro",
    price: 35,
    image: blackTshirt,
    category: "Camisetas",
    description:
      "Camiseta de algodón premium con diseño minimalista inspirado en Tesla.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Negro", "Blanco", "Gris"],
  },
  {
    id: "2",
    to: "2-sudadera-tesla-blanca",
    name: "Sudadera Tesla Blanca",
    price: 85,
    image: whiteHoodie,
    category: "Sudaderas",
    description: "Sudadera con capucha de alta calidad con logo Tesla bordado.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blanco", "Negro", "Gris"],
  },
  {
    id: "3",
    to: "3-sudadera-tesla-gris",
    name: "Sudadera Tesla Gris",
    price: 75,
    image: greySweatshirt,
    category: "Sudaderas",
    description: "Sudadera clásica sin capucha con corte moderno y cómodo.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gris", "Negro", "Azul Marino"],
  },
  {
    id: "4",
    to: "4-chaqueta-tesla-negro",
    name: "Chaqueta Tesla Negro",
    price: 150,
    image: blackJacket,
    category: "Chaquetas",
    description: "Chaqueta técnica resistente al agua con diseño elegante.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Negro", "Gris Oscuro"],
  },
  {
    id: "5",
    to: "5-gorra-tesla-blanca",
    name: "Gorra Tesla Blanca",
    price: 25,
    image: whiteCap,
    category: "Accesorios",
    description: "Gorra ajustable con logo Tesla bordado en alta calidad.",
    sizes: ["Único"],
    colors: ["Blanco", "Negro", "Gris"],
  },
  {
    id: "6",
    to: "6-mochila-tesla-negro",
    name: "Mochila Tesla Negro",
    price: 120,
    image: blackBackpack,
    category: "Accesorios",
    description:
      "Mochila minimalista con compartimentos organizados y diseño ergonómico.",
    sizes: ["Único"],
    colors: ["Negro", "Gris"],
  },
  {
    id: "7",
    to: "7-camiseta-tesla-blanca",
    name: "Camiseta Tesla Blanca",
    price: 35,
    image: blackTshirt, // Reutilizamos la imagen por simplicidad
    category: "Camisetas",
    description: "Camiseta blanca de algodón orgánico con logo Tesla discreto.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blanco", "Negro", "Gris"],
  },
  {
    id: "8",
    to: "8-sudadera-tesla-negro",
    name: "Sudadera Tesla Negro",
    price: 85,
    image: whiteHoodie,
    category: "Sudaderas",
    description: "Sudadera negra con capucha y bolsillo frontal tipo canguro.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Negro", "Gris", "Azul Marino"],
  },
];
