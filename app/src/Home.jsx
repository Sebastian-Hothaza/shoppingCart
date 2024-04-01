import { Link } from 'react-router-dom';

function Home(){
    return(
        <div className="homePage">
            <Link className="homeLink" to="shop">Shop Now</Link>
        </div>
        
    )
}

export default Home;