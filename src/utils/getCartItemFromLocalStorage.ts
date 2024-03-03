import { IPizzaItem } from '../redux/slices/pizzaSlice'



export const getCartItemFromLocalStorage = () => {
  const data = localStorage.getItem('cart')

 return data? JSON.parse(data) : []
}

 

export const getPrice = () => {
  const data = localStorage.getItem('cart')

  const items:IPizzaItem[] = data? JSON.parse(data) : []

  return items.reduce(
    (acc, item) => item.price * item.count + acc,
    0
  );
}