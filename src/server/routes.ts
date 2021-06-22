import * as express from "express";
const cheeses = require("./data/cheeses.json");

const router = express.Router();

type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

let purchaseItems: Array<CartItemType> = [];

router.get("/api/cheeses", (req, res, next) => {
  res.json(cheeses);
});

router.get("/api/purchase", (req, res, next) => {
  res.status(200).json(purchaseItems);
});

router.post("/api/purchase", (req, res, next) => {
  const { cartItems } = req.body;
  if (purchaseItems.length === 0) purchaseItems = [...cartItems];
  else {
    cartItems?.forEach((cItem: CartItemType) => {
      const index = purchaseItems.findIndex((pItem: CartItemType) => {
        return pItem.id === cItem.id;
      });
      if (index >= 0) {
        purchaseItems[index].amount =
          purchaseItems[index].amount + cItem.amount;
      } else {
        purchaseItems.push(cItem);
      }
    });
  }

  res.status(200).json({ success: true });
});

export default router;
