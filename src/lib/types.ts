export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;

  // tambahan lokal (bukan dari API), untuk stok
  qty?: number;
}
