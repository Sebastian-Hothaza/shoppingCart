import { Link } from 'react-router-dom';


function Navbar({cart}){

    function getCartTotal(){
        let num = 0;
        cart.forEach((item) => {
            num += item.qty;
        })
        return num;
    }

    return (
        <div className='navBar'>
            <Link to="/">Home</Link>
            <Link to="shop">Shop</Link>
            <Link to="cart">Cart {getCartTotal()? getCartTotal() : ''}</Link>
        </div>
    )
}

export default Navbar;