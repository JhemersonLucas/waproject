export interface IOrder {
  id?: number;
  description: string;
  price?: number;
  amount: number;
  createdDate?: Date;
  updatedDate?: Date;
}
