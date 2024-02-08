import { useOutletContext } from "react-router-dom";


function Shop(){
    // const [APIData, cart, setCart] = useOutletContext(); // Defined from App.jsx
    const APIData = useOutletContext().APIData;
    const [cart, setCart] = [useOutletContext().cart, useOutletContext().setCart];
 

    // NOTE: APIData may still be loading in when Shop is called

    // Returns true if item is new to the cart
    function isNewItem(item){   
        return true;
    }

    function handleAddtoCart(productID){
        // ID should correspond to the card ID
        console.log(productID);
        // Go thru cart array and create entry or update qty for existing entry
        // Assume new item
        const newItem = {id: productID, qty: 1};
        setCart([...cart, newItem])

    }

    return(
        <>
        {APIData?
            (
                <div className="storeItems">
                    {APIData.map((item)=> {
                        return (
                            <div key={item.id} id={item.id} className="card">
                                <div>{item.title}</div>
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

/* 
<div className="qtyField">
    <button>-</button>
    <input type="text"></input>
    <button>+</button>
</div>
*/