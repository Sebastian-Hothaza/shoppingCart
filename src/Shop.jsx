import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

function Shop(){
    const APIData = useOutletContext().APIData;
    const [cart, setCart] = [useOutletContext().cart, useOutletContext().setCart];
    const [itemQtys, setItemQtys] = useState([]); // Array of cartItems objects representing the state of input boxes for quantities
    

    function handleAddtoCart(productID){
        const newItem = {id: productID, qty: 1};
        setCart([...cart, newItem])
    }

    // Loads the itemQtys AFTER component mount
    function loadItemQtys(){
        let newArr = APIData.map((item) => {
            return {id: item.id, qty: 1};
        }) 
        setItemQtys(newArr);
    }


    function getQty(productID){
        for (let i=0; i<itemQtys.length; i++){
            if (itemQtys[i].id == productID) return itemQtys[i].qty;
        }       
    }

    function updateQty(productID, value){
        const newArr = itemQtys.map((item) => {
            if (item.id == productID) {        
                return {id: productID, qty: parseInt(value)}
            }else{
                return {id: item.id, qty: item.qty}
            }
        }); 
        setItemQtys(newArr);
    }


    // Executed after the component mount
    useEffect(() => {
        if (APIData) loadItemQtys();
    }, [APIData])


    return(
        <>
        {(APIData && itemQtys.length)?
            (
                <div className="storeItems">
                    {APIData.map((item)=> {
                        return (
                            <div key={item.id} id={item.id} className="card">
                                <div>Item ID: {item.id}</div>
                                <div className="qtyField">
                                    <button onClick={(e) => updateQty(item.id, getQty(item.id)-1)}>-</button>
                                    <input type="text" value={getQty(item.id)} onChange={(e) => updateQty(item.id, e.target.value)}></input>
                                    <button onClick={(e) => updateQty(item.id, getQty(item.id)+1)}>+</button>
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