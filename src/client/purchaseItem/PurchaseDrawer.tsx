import PurchaseItem from "./PurchaseItem/PurchaseItem";
import { Wrapper } from "./Purchase.styles";
import { CartItemType } from "../App";
import React from "react";

type Props = {
  purchaseItems: CartItemType[];
};

const PurchaseDrawer: React.FC<Props> = ({ purchaseItems }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Your Recent Purchase</h2>
      {purchaseItems.length === 0 ? <p>No items in purchased yet.</p> : null}
      {purchaseItems.map((item) => (
        <PurchaseItem key={item.id} item={item} />
      ))}
      <div>
        <h2>Total: ${calculateTotal(purchaseItems).toFixed(2)}</h2>
      </div>
    </Wrapper>
  );
};

export default PurchaseDrawer;
