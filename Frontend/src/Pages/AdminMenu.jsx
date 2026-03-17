import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMenu, deletePizza } from "../Services/MenuService";

import AdminNavbar from "../Components/AdminNavbar";
import "../styles/adminmenu.css";

function AdminMenu(){

  const [menu,setMenu] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    loadMenu();
  },[]);

  async function loadMenu(){
    try{
      const data = await getMenu();
      setMenu(data);
    }catch(err){
      console.log(err);
    }
  }

  async function handleDelete(id){

    if(!window.confirm("Delete this item?")) return;

    try{
      await deletePizza(id);
      loadMenu();
    }catch(err){
      alert(err.message);
    }

  }

  function getCategoryClass(category){

    if(category === "Veg") return "tag-veg";
    if(category === "Non-Veg") return "tag-nonveg";

    return "";

  }

  /* ----------- GROUP ITEMS BY CATEGORY ----------- */

  const groupedItems = {};

  menu.forEach(item => {

    if(!groupedItems[item.category]){
      groupedItems[item.category] = [];
    }

    groupedItems[item.category].push(item);

  });

  return(

    <div className="admin-menu">

      <AdminNavbar/>

      <div className="menu-container">

        <h2 className="menu-title">
          Manage Menu
        </h2>


        {/* ----------- DISPLAY ALL CATEGORIES ----------- */}

        {Object.keys(groupedItems).map(category => (

          <div key={category}>

            <h3 className="category-title">
              {category}
            </h3>

            <div className="menu-grid">

              {groupedItems[category].map(item => (

                <div
                  key={item.id}
                  className={`menu-card ${item.stock === 0 ? "out-stock-card" : ""}`}
                >

                  {/* CATEGORY TAG */}

                  <span className={`menu-tag ${getCategoryClass(item.category)}`}>
                    {item.category}
                  </span>

                  {/* OUT OF STOCK BADGE */}

                  {item.stock === 0 && (
                    <span className="stock-badge">
                      Out of Stock
                    </span>
                  )}

                  <img
                    src={`${item.imageUrl}`}
                    alt={item.name}
                    className="menu-image"
                  />

                  <h3 className="menu-name">
                    {item.name}
                  </h3>

                  <p className="menu-desc">
                    {item.description}
                  </p>

                  <div className="menu-price">
                    ₹{item.price}
                  </div>

                  <div className="menu-stock">
                    Stock: {item.stock}
                  </div>

                  <div className="menu-actions">

                    <button
                      className="btn-edit"
                      onClick={()=>navigate(`/admin/edit/${item.id}`)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn-delete"
                      onClick={()=>handleDelete(item.id)}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}

export default AdminMenu;