export interface CartItems {
  id: string;
  name: string;
  price: string;
}

export interface Product extends CartItems {
    description: string;
    thumbnail: FileList | string;
    updated_at: string;
}
