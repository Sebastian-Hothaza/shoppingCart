import { useOutletContext } from "react-router-dom";


function Shop(){
    const APIData = useOutletContext(); // Defined from App.jsx
    
    return(
        <div>SHOP</div>
    )
}

export default Shop;