import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

// TODO: Fix issue where modifying cart quantity immediately on load results in qty being replaced by 1

function Shop(){
    const APIData = useOutletContext().APIData;
    const [cart, setCart] = [useOutletContext().cart, useOutletContext().setCart];
    const [shopItemQtys, setShopItemQtys] = useState([]); // Array of cartItems objects representing the state of input boxes for quantities
    const [MIN_QTY, MAX_QTY] = [0, 100];
    
    // Checks to see if productID is existing cart item and updates quantity if so. Else, creates new cartItem entry.
    function handleAddtoCart(productID){
        if (!getQty(productID, false)) return; // Avoid adding item to cart that has 0 quantity
        getQty(productID, true)? updateQty(productID, getQty(productID,true) + getQty(productID, false),true)
                                :setCart([...cart, {id: productID, qty: getQty(productID, false)}])
    }

    // Loads the shopItemQtys to qty 1 AFTER component mount
    function loadItemQtys(){
        let newArr = APIData.map((item) => {
            return {id: item.id, qty: 1};
        }) 
        setShopItemQtys(newArr);
    }

     // Returns the quantity for a productID with value for either shopItemQtys or cart. If not in array, returns 0
    function getQty(productID, isCart){
        let workingArray;
        isCart? workingArray = cart : workingArray = shopItemQtys
        for (let i=0; i<workingArray.length; i++){
            if (workingArray[i].id == productID) return workingArray[i].qty;
        }
        return 0;       
    }

    // Updates quantity(overwrites) for a productID with value for either shopItemQtys or cart
    function updateQty(productID, value, isCart){
        if (value<MIN_QTY || value>MAX_QTY) return; // Dont allow setting values outside limits
        if (!value) value = 0; // When user deletes value in the box, default to 0
        let workingArray;
        isCart? workingArray=cart : workingArray=shopItemQtys
        const newArr = workingArray.map((item) => {
            if (item.id == productID) {        
                return {id: productID, qty: parseInt(value)}
            }else{
                return {id: item.id, qty: item.qty}
            }
        }); 
        isCart? setCart(newArr) : setShopItemQtys(newArr)
    }

    // Executed after the component mount
    useEffect(() => {
        if (APIData) loadItemQtys();
    }, [APIData])


    return(
        <>
        {(APIData && shopItemQtys)?
            (
                <div className="storeItems">
                    {APIData.map((item)=> {
                        return (
                            <div key={item.id} id={item.id} className="card">
                                <div>Item ID: {item.id}</div>
                                <div className="qtyField">
                                    <button onClick={(e) => updateQty(item.id, getQty(item.id, false)-1, false)}>-</button>
                                    <input type="text" value={getQty(item.id, false)} onChange={(e) => updateQty(item.id, e.target.value, false)}></input>
                                    <button onClick={(e) => updateQty(item.id, getQty(item.id, false)+1, false)}>+</button>
                                </div>
                                <button onClick={(e) => handleAddtoCart(item.id)}>Add to Cart</button>
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