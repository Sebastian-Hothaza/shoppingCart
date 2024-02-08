import { Outlet } from 'react-router-dom';
import { useEffect, useState } from "react";
import Navbar from './Navbar';
import ErrorPage from './ErrorPage';
import './App.css'

// TODO: Testing

function App(){

    const [error, setError] = useState(null);
    const [APIData, setAPIData] = useState('');

    async function fetchAPIData(){
        try{
            const response = await fetch('https://fakestoreapi.com/products/category/electronics');
            if (!response.ok) throw new Error("Failed to get API Data")
            const data = await response.json();
            setAPIData(data);
        }catch(err){
            setError(err.message)
        }
    }

    useEffect(() => {
        fetchAPIData();
    }, [])

    return (
        <>
            <Navbar />
            {error? (
                <div style={{fontSize: "40px"}}>Error: Could not load data from API! 🥹</div>
                ) : <Outlet context={APIData}/>}
        </>
    )
}

export default App;