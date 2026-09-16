import { useState, useEffect, } from "react";
import '../styles/store.css'
import Card from "./Card";
//Store Page Component
function Store() {
    const [data,setData] = useState({});
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(true)

    //function to receie

    //useEffect to fetch products from api
    useEffect( () => {
       fetch("https://fakestoreapi.com/products")
         .then((response) =>{
            if(response.status > 400) throw new Error('Server Error')
            return response.json()
         })
         .then((data) => setData(data))
         .catch((error) => setError(error))
         .finally(() => setLoading(false))
    }, [])
    
  // checks if their were any errors in getting the products and if it's still loading  
  if(loading) return <h2>loading....</h2>  
  if(error) return <h2>A network error has occured</h2>

  
  //returns jsx of the store and its products
  return (
    <main id="main-content" className="store-container">
      <div className="store-items-container">
     {data.map((item) => (
        <Card key={item.id} item={item}/>
     ))}
      </div>
    </main>
  );
}

export default Store;
