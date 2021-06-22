import axios from 'axios';
import { CartItemType } from '../App';

// axios.defaults.baseURL = 'http://localhost:3000';

export const purchaseItem = (cartItems: CartItemType[]) => {
  return axios({
    url: `/api/purchase`,
    method: 'post',
    data: {cartItems}
  });
};

export const recentPurchase = () => {
    return axios({
      url: `/api/purchase`,
      method: 'get'
    });
  };