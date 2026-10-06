export interface Property {
  id: string;
  reference?: string;
  title: string;
  description?: string;
  contract: 'Vendita' | 'Affitto';
  type: string;
  price: string | number;
  location: string;
  address?: string;
  images: string[];
  mainImage: string;
  sqm?: number;
  rooms?: number;
  bathrooms?: number;
  energyClass?: string;
  features?: string[];
}