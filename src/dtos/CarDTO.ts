export interface PhotoProps {
  id: string;
  photo: string;
}

export interface AccssoriesProps {
  id: string;
  car_id: string;
  name: string;
  type: string;
}
export interface CarDTO {
  id: string;
  name: string;
  brand: string;
  about: string;
  period: string;
  price: number;
  fuel_type: string;
  thumbnail: string;
  created_at: number;
  updated_at: number;
  photos: PhotoProps[];
  accessories: AccssoriesProps[];
}
