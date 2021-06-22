import React, { useState } from "react";
import { useQuery } from "react-query";
// Components
import Item from "./Cart/Item/Item";
import Cart from "./Cart/Cart";
import ItemDialog from "./ItemDialog/ItemDialog";

import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RestoreIcon from "@material-ui/icons/Restore";
import Badge from "@material-ui/core/Badge";
// Styles
import {
  Wrapper,
  StyledButton,
  StyledAppBar,
  HeaderTypography,
} from "./App.styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { purchaseItem, recentPurchase } from "./api/cartApi";
import { useEffect } from "react";
import PurchaseDrawer from "./purchaseItem/PurchaseDrawer";
// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getCheeses = async (): Promise<CartItemType[]> =>
  await (await fetch(`api/cheeses`)).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [purchaseItems, setPurchaseItems] = useState([] as CartItemType[]);
  const [cartDialogItem, setDialog] = useState<Partial<CartItemType>>({});
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "cheeses",
    getCheeses
  );

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleClickCheeseCard = (item: CartItemType) => {
    setItemDialogOpen(true);
    setDialog(item);
  };

  const handleCheeseDialogClose = () => {
    setItemDialogOpen(false);
    setDialog({});
  };

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  const handlePurchasItem = async (cartItems: CartItemType[]) => {
    if (cartItems.length === 0) return;
    const response = await purchaseItem(cartItems);
    if (response.status === 200) {
      setCartItems([]);
      updateRecentPurchase()
    }
  };

  const updateRecentPurchase = async () => {
    const response = await recentPurchase();
    if (response.status === 200) setPurchaseItems(response.data);
  }

  const handleRecentPurchase = async () => {
    await updateRecentPurchase();
      setPurchaseOpen(true);
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (
    <Wrapper>
      <StyledAppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <StyledButton onClick={handleRecentPurchase} data-cy="recentPurchase">
              <Badge
                badgeContent={getTotalItems(purchaseItems)}
                color="error"
                data-cy="badge-count"
              >
                <RestoreIcon />
              </Badge>
              <Typography variant="subtitle2">Recent Purchases</Typography>
            </StyledButton>

            <HeaderTypography variant="h3" noWrap>
              Welcome to Patient Zero's Cheeseria
            </HeaderTypography>

            <StyledButton data-cy="cardbutton" onClick={() => setCartOpen(true)}>
              <Badge
                badgeContent={getTotalItems(cartItems)}
                color="error"
                data-cy="badge-count"
              >
                <AddShoppingCartIcon />
              </Badge>

              <Typography variant="subtitle2">Cart</Typography>
            </StyledButton>
          </Grid>
        </Toolbar>
      </StyledAppBar>

      <Drawer
        anchor="right"
        open={purchaseOpen}
        onClose={() => setPurchaseOpen(false)}
      >
        <PurchaseDrawer purchaseItems={purchaseItems}></PurchaseDrawer>
      </Drawer>

      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          handlePurchasItem={handlePurchasItem}
        />
      </Drawer>

      <ItemDialog
        item={cartDialogItem}
        onClose={handleCheeseDialogClose}
        open={itemDialogOpen}
      ></ItemDialog>

      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item
              item={item}
              handleAddToCart={handleAddToCart}
              handleClickCheeseCard={handleClickCheeseCard}
            />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
