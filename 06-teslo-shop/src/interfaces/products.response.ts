import type { Product } from "./product.response";

export interface ProductResponse {
  count: number;
  pages: number;
  products: Product[];
}
