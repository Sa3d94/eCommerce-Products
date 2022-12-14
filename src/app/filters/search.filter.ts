import { Product } from "../models/product.model";

export const searchFilter = (products: Product[], text?: string): Product[] => {
    if (!text || text == "") { return products; }
    // minimize all text for better search results
    text = text.toLowerCase().trim();
    // Search by All the Below Fields
    return products.filter(
        s => s.title.toLowerCase().includes(text) 
        || s.brand.toLowerCase().includes(text)
        || s.description.toLowerCase().includes(text)
        || s.price.toString().includes(text)
        || s.discountPercentage.toString().includes(text) 
        );
  }
  