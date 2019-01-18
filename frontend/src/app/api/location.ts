export interface Location {
  id?: number;
  name: string;
  plusCode: string;
  drinks?: Array<number>;
  rating?: number;
  address?: string;
  lat?: number;
  lng?: number;
}
