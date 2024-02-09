import { useOutletContext } from "react-router-dom";
import { useState } from "react";


function Cart(){
    const [cart, setCart] = [useOutletContext().cart, useOutletContext().setCart];

    // Updates quantity(overwrites) for a productID with value 
    function updateQty(productID, value){
        if (value<0 || value>100) return; // Dont allow setting values outside limits
        let newArr = cart.map((item) => {
           return (item.id == productID)?  {id: productID, qty: parseInt(value)} :  {id: item.id, qty: item.qty} 
        }); 
        newArr = newArr.filter((item)=>item.qty>0);
        setCart(newArr)
    }

    return(
        <div className="cartContents">
            {cart.length?
                cart.map((item) => {
                    return(
                        <div key={item.id} className="cartCard">
                            <div>ID: {item.id}</div>
                            <button onClick={(e) => updateQty(item.id, item.qty-1, false)}>-</button>
                            <div>QTY:{item.qty}</div>
                            <button onClick={(e) => updateQty(item.id, item.qty+1, false)}>+</button>
                        </div>
                    )
                })
                :
                <div>Cart is empty!</div>
            }
            
        </div>
    )
}

export default Cart;