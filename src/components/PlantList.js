import React, { useEffect, useState } from "react";
import PlantCard from "./PlantCard";
import Search from "./Search";

function PlantList() {

  const [plants,setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() =>{
    fetch("https://react-hooks-cc-plantshop-mhz6.onrender.com/plants")
    .then((res) => res.json())
    .then((data) => setPlants(data));
  },[]);

  const filteredPlants = plants.filter((plant) => plant.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div>
      <Search onSearch = {setSearchTerm}/>
      <ul className="cards">{/* render PlantCards components in here */}
        {
          filteredPlants &&  filteredPlants.map((plant) =>(
            <PlantCard key={plant.id} name={plant.name} image={plant.image} price={plant.price} initialStock={plant.inStock}/>
          ))
        }
      </ul>
    </div>
    
  );
}

export default PlantList;