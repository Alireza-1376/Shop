import { ProductType } from "./product"

export type CartItem = {
    product: ProductType,
    variant:string ,
    quantity: number,
}

export type CartItemsType = {
    cart: CartItem[]
}