import { useOutletContext } from "react-router-dom";

import './Cart.css'


function Cart(){
    const [cart, setCart] = [useOutletContext().cart, useOutletContext().setCart];
    const APIData = useOutletContext().APIData; 


    // Updates quantity(overwrites) for a productID with value 
    function updateQty(productID, value){
        if (value<0 || value>100) return; // Dont allow setting values outside limits
        let newArr = cart.map((item) => {
           return (item.itemInfo.id == productID)?  {itemInfo: APIData[APIData.indexOf(APIData.find((item) => item.id == productID))], qty: parseInt(value)} 
                                                   :{itemInfo: item.itemInfo, qty: item.qty} 
        }).filter((item)=>item.qty>0);
        setCart(newArr)
    }

    function getCartTotal(){
        let total=0;
        cart.forEach((item) => total += (item.qty * item.itemInfo.price))
        return total;
    }

    return(
        <div className="cartContents">
            {cart.length?
                cart.map((item) => {
                    return(
                        <div key={item.itemInfo.id} className="cartCard">
                            <div className="title">{item.itemInfo.title}</div>
                            <div className="qtyField">
                                <button className="adjQty" onClick={(e) => updateQty(item.itemInfo.id, item.qty-1)}>-</button>
                                <div>{item.qty}</div>
                                <button className="adjQty" onClick={(e) => updateQty(item.itemInfo.id, item.qty+1)}>+</button>
                            </div>
                            <div className="price">${item.itemInfo.price * item.qty}</div>
                        </div>
                    )
                })
                :
                <div>Cart is empty!</div>
            }
            {cart.length>0 &&
                <div className="cartCard total">
                    <div>TOTAL</div>
                    <div>${getCartTotal()}</div>
                </div>
            }
            
        </div>
    )
}

export default Cart;