import Button from '@material-ui/core/Button';
// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './PurchaseItem.styles';

type Props = {
  item: CartItemType;
 };

const CartItem: React.FC<Props> = ({ item }) => (
  <Wrapper>
    <div>
      <h3>{item.title}</h3>
      <div className='information'>
        <p>Price: ${item.price}</p>
        <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
      </div>
      <div className='buttons'>
        <p>{item.amount}</p>
      </div>
    </div>
    <img src={item.image} alt={item.title} />
  </Wrapper>
);

export default CartItem;
