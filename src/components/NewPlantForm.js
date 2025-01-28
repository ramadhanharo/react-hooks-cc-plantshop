import React, { useState } from "react";

function NewPlantForm() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [inStock, setInStock] = useState(true); // Default to true (in stock)

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    // Create the plant data object
    const newPlant = {
      name: name,
      image: image,
      price: price,
      inStock: inStock,
    };

    // fetch POST request to the server
    fetch(`https://react-hooks-cc-plantshop-mhz6.onrender.com/plants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Plant added:", data); 
      })
      .catch((error) => {
        console.error("Error adding plant:", error); 
      });

    // Reset the form fields after submitting
    setName("");
    setImage("");
    setPrice(0);
    setInStock(true); 
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" placeholder="Plant name"/>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} name="image" placeholder="Image URL"/>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} name="price" step="0.01" placeholder="Price"/>
        <div>
          <label>In Stock:
          {/* Update inStock state based on checkbox  */}
            <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)}/> 
          </label>
        </div>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;