import { useOutletContext } from "react-router-dom";
import { useState } from "react";

import './Shop.css'

function Shop(){
    const APIData = useOutletContext().APIData;
    const [cart, setCart] = [useOutletContext().cart, useOutletContext().setCart];
    const [shopItemQtys, setShopItemQtys] = useState([]); // Array of cartItems objects representing the state of input boxes for quantities

    if (APIData && !shopItemQtys.length) setShopItemQtys(APIData.map((item) => ({id: item.id, qty: 1}))); // Loads the shopItemQtys to qty 1 AFTER component mount
    
    // Checks to see if productID is existing cart item and updates quantity if so. Else, creates new cartItem entry.
    function handleAddtoCart(productID){
        if (!getQty(productID, false)) return; // Avoid adding item to cart that has 0 quantity
        (getQty(productID, true))? updateQty(productID, getQty(productID,true) + getQty(productID, false), true)
                                :setCart([...cart, {itemInfo: APIData[APIData.indexOf(APIData.find((item) => item.id == productID))], qty: getQty(productID, false)}])                                
    }

     // Returns the quantity for a productID with value for either shopItemQtys or cart. If not in array, returns 0
    function getQty(productID, isCart){
        let result = (isCart)? cart.find((item) => (item.itemInfo && item.itemInfo.id == productID))
        :shopItemQtys.find((item) => (item.id && item.id == productID))
        return (result)? result.qty : 0 //NOTE: Both cart and shopItemQtys has qty property    
    }

    // Updates quantity(overwrites) for a productID with value for either shopItemQtys or cart
    function updateQty(productID, value, isCart){
        if (value<0 || value>100) return; // Dont allow setting values outside limits
        if (!value) value = 0; // When user deletes value in the box, default to 0
        let newArr;
        if (isCart){
            newArr = cart.map((item) => {
                return (item.itemInfo.id == productID)? {itemInfo: item.itemInfo, qty: parseInt(value)}:item                                     
            }); 
        }else{
            newArr = shopItemQtys.map((item) => {
                return (item.id == productID)? {id: item.id, qty: parseInt(value)}:item                         
            }); 
        }
        isCart? setCart(newArr) : setShopItemQtys(newArr)
    }

    return(
        <>
        {(APIData && shopItemQtys)?
            (
                <div className="storeItems">
                    {APIData.map((item)=> {
                        return (
                            <div key={item.id} id={item.id} className="card">
                                <img src={item.image} alt="" />
                                <div className="title">{item.title}</div>
                                <div className="price">${item.price}</div>
                                <div className="qtyField">
                                    <button className="adjQty" onClick={(e) => updateQty(item.id, getQty(item.id, false)-1, false)}>-</button>
                                    <input type="text" value={getQty(item.id, false)} onChange={(e) => updateQty(item.id, e.target.value, false)}></input>
                                    <button className="adjQty" onClick={(e) => updateQty(item.id, getQty(item.id, false)+1, false)}>+</button>
                                </div>
                                <button className="addCart" onClick={(e) => handleAddtoCart(item.id)}>Add to Cart</button>
                            </div>
                        )
                    })}
                </div>
            ): 
            <div>Loading Store</div>
        }
        </>   
    )
}

export default Shop;