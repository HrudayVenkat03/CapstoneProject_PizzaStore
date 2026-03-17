import { useState, useEffect } from "react";
import AdminNavbar from "../Components/AdminNavbar";
import "../styles/additem.css";
import { getMenu } from "../Services/MenuService";

function AddItem(){

  const [menu,setMenu] = useState([]);

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [category,setCategory] = useState("");
  const [customCategory,setCustomCategory] = useState("");
  const [imageUrl,setImageUrl] = useState("");
  const [price,setPrice] = useState("");
  const [stock,setStock] = useState("");

  /* LOAD MENU */

  useEffect(()=>{
    loadMenu();
  },[]);

  async function loadMenu(){

    try{

      const data = await getMenu();
      setMenu(data);

      if(data.length > 0){
        setCategory(data[0].category);
      }

    }catch(err){
      console.log(err);
    }

  }

  /* GET UNIQUE CATEGORIES */

  const categories = [...new Set(menu.map(item => item.category))];

  async function handleAddItem(e){

    e.preventDefault();

    if(!name || !description || !imageUrl || !price || !stock){
      alert("Please fill all fields");
      return;
    }

    let finalCategory = category;

    if(category === "Other"){

      if(!customCategory.trim()){
        alert("Please enter a category name");
        return;
      }

      finalCategory = customCategory.trim();

    }

    const item = {
      name: name.trim(),
      description: description.trim(),
      category: finalCategory,
      imageUrl: imageUrl.trim(),
      price: Number(price),
      stock: Number(stock)
    };

    try{

      const response = await fetch(
        "http://localhost:8082/menu",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify(item)
        }
      );

      if(!response.ok){
        throw new Error("Failed to add item");
      }

      alert("Item Added Successfully");

      /* RESET FORM */

      setName("");
      setDescription("");
      setCustomCategory("");
      setImageUrl("");
      setPrice("");
      setStock("");

      /* RELOAD MENU TO UPDATE CATEGORIES */

      await loadMenu();

    }catch(err){

      alert(err.message);

    }

  }

  /* IMAGE PREVIEW */

  const imageSrc =
    imageUrl && imageUrl.trim() !== ""
      ? imageUrl
      : "pizza-placeholder.png";

  const previewCategory =
    category === "Other" ? customCategory : category;

  return(

    <div>

      <AdminNavbar/>

      <div className="add-container">

        <h1>Add Item</h1>

        <div className="add-layout">

          {/* FORM */}

          <div className="add-card">

            <form onSubmit={handleAddItem}>

              <label>Item Name</label>

              <input
                type="text"
                placeholder="Item Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />

              <label>Description</label>

       <textarea
                placeholder="Description"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
          />

              <label>Category</label>

        <select
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
              >

                {categories.map(cat => (

                  <option key={cat} value={cat}>
                    {cat}
                  </option>

                ))}

                <option value="Other">
                  Add New Category
                </option>

              </select>

              {category === "Other" && (

                <>
                  <label>New Category</label>

                  <input
                    type="text"
                    placeholder="Enter new category (ex: Fries)"
                    value={customCategory}
                    onChange={(e)=>setCustomCategory(e.target.value)}
                  />
                </>

              )}

              <label>Image URL</label>

              <input
                type="text"
                placeholder="Paste image URL"
                value={imageUrl}
                onChange={(e)=>setImageUrl(e.target.value)}
              />

              <label>Price</label>

              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
              />

              <label>Stock</label>

              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e)=>setStock(e.target.value)}
              />

              <button type="submit">
                Add Item
              </button>

            </form>

          </div>


          {/* LIVE PREVIEW */}

          <div className="preview-card">

            <h3>Live Preview</h3>

            <div className="preview-content">

              <div className="preview-image-wrapper">

                <span
                  className={`badge ${
                    previewCategory === "Veg"
                      ? "veg"
                      : previewCategory === "Non-Veg"
                      ? "nonveg"
                      : "other"
                  }`}
                >
                  {previewCategory || "Category"}
                </span>

                <img
                  src={imageSrc}
                  alt="preview"
                  className="preview-image"
                  onError={(e)=>{
                    e.target.src="pizza-placeholder.png";
                  }}
                />

              </div>

              <h2>{name || "Item Name"}</h2>

              <p>
                {description || "Item description will appear here"}
              </p>

              <div className="preview-price">
                ₹{price || "0"}
              </div>

              <div className="preview-stock">
                Stock: {stock || "0"}
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}

export default AddItem;