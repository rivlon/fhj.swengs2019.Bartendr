import {Location} from '../api/location';

export interface Drink {
  id?: number;
  name: string;
  category: string;
  price: number;
  age: number;
  rating?: number;
  locationID?: number;
}
