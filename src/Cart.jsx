import { useOutletContext } from "react-router-dom";


function Cart(){
    const cart = useOutletContext().cart;

    return(
        <>
            {
                cart.map((item) => {
                    return(
                        <div key={item.id}> {item.id},{item.qty} </div>
                    )
                })
            }
            
        </>
    )
}

export default Cart;