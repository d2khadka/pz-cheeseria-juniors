import { DialogContent } from "@material-ui/core";
import { Dialog, DialogTitle } from "@material-ui/core"
import React from "react"

// Types
import { CartItemType } from '../App';
import { Wrapper } from './Item.styles';

type Props = {
    open: boolean,
    onClose:()=>void,
    item: Partial<CartItemType>;
  };
  

const ItemDialog: React.FC<Props>= ({ onClose, open , item}) =>{
    
    return(
    <Wrapper>
        <Dialog id = "itemDialog" onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">{item.title}</DialogTitle>
        <DialogContent>    
        <img id="diaglogImg" style={{height:'350px'}} src={item.image} alt={item.title} />
            <div >
                <p>{item.description}</p>
                <h3>Price: ${item.price}</h3>
                <h3>Category: {item.category}</h3>
            </div>
        </DialogContent>
        </Dialog>
    </Wrapper>
    )
}

export default ItemDialog