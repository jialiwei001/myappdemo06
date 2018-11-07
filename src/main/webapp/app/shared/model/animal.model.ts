export interface IAnimal {
  id?: number;
  name?: string;
  variety?: string;
  price?: number;
  age?: number;
}

export const defaultValue: Readonly<IAnimal> = {};
