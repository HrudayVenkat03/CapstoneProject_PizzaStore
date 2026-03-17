import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMenu, updatePizza } from "../Services/MenuService";
import AdminNavbar from "../Components/AdminNavbar";
import "../styles/edititem.css";

function EditItem(){

  const { id } = useParams();
  const navigate = useNavigate();

  const [menu,setMenu] = useState([]);
  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");
  const [stock,setStock] = useState("");
  const [imageName,setImageName] = useState("");
  const [category,setCategory] = useState("");

  useEffect(()=>{

    async function loadItem(){

      const data = await getMenu();
      setMenu(data);

      const item = data.find(p => p.id == id);

      if(item){
        setName(item.name);
        setDescription(item.description);
        setPrice(item.price);
        setStock(item.stock);
        setImageName(item.imageUrl);
        setCategory(item.category);
      }

    }

    loadItem();

  },[id]);


  /* ----------- DYNAMIC CATEGORY LIST ----------- */

  const categories = [...new Set(menu.map(item => item.category))];


  async function handleUpdate(){

    const item = {
      name,
      description,
      category,
      price,
      stock,
      imageUrl:imageName
    };

    await updatePizza(id,item);

    navigate("/admin/menu");

  }

  return(

    <div>

      <AdminNavbar/>

      <div className="edit-container">

        <h1>Edit Item</h1>

        <div className="edit-layout">

          {/* LEFT SIDE FORM */}

          <div className="edit-form-card">

            <label>Item Name</label>
            <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />

            <label>Description</label>
            <textarea
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />

            {/* CATEGORY FIELD */}

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

            </select>

            <label>Price</label>
            <input
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
            />

            <label>Stock</label>
            <input
              value={stock}
              onChange={(e)=>setStock(e.target.value)}
            />

            <label>Image URL</label>
            <input
              value={imageName}
              onChange={(e)=>setImageName(e.target.value)}
            />

            <button onClick={handleUpdate}>
              Update Item
            </button>

          </div>


          {/* RIGHT SIDE PREVIEW */}

          <div className="preview-card">

            <h3>Live Preview</h3>

            <div className="preview-pizza">

              <img
                src={`${imageName}`}
                alt={name}
                className="preview-image"
              />

              {category && (
                <span className="preview-category">
                  {category}
                </span>
              )}

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

export default EditItem;