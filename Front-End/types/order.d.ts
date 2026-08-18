import { CartItem } from "./cartItems";

export interface Order {
  _id: string;
  phoneNumber: string;
  address: string;
  trackingCode: string;
  amount: number;
  userId: string;
  createdAt: string;
  situation: string;
  products: CartItem[]
}

export type OrdersType = {
  orders: Order[],
  currentPage: number,
  totalOrders: number,
  lastPage: number
}