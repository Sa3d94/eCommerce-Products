import { Product } from "../models/product.model";



export const categoryFilter = (products: Product[], category?: string ): Product[] => {
    if (!category || category == "All") { return products; }
    
        return products.filter(s => s.category == category); 
  }
  