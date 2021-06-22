import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';
import React from 'react';
import { Button } from '@material-ui/core';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  handlePurchasItem: (cartItems: CartItemType[]) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, handlePurchasItem }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <div><h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      <Button
        onClick={() => (handlePurchasItem(cartItems))}
        data-cy="purchase">Purchase</Button></div>
    </Wrapper>
  );
};

export default Cart;
