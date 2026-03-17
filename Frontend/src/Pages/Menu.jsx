import { useEffect, useState } from "react";
import "../styles/menu.css";
import { getMenu } from "../Services/MenuService";
import PizzaCard from "../Components/PizzaCard";

function Menu(){

  const [menu,setMenu] = useState([]);
  const [search,setSearch] = useState("");
  const [category,setCategory] = useState("ALL");
  const [sort,setSort] = useState("");

  useEffect(()=>{

    async function fetchMenu(){

      const data = await getMenu();
      setMenu(data);

    }

    fetchMenu();

  },[]);


  //SEARCH FILTER 

  let filteredMenu = menu.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

if(category !== "ALL"){            //  CATEGORY FILTER
    filteredMenu = filteredMenu.filter(       //creates an array named filterdmenu based on user search
      item => item.category === category
    );
  }


 if(sort === "LOW"){           //price sort
    filteredMenu = [...filteredMenu].sort((a,b)=>a.price-b.price);    //low to high
  }

  if(sort === "HIGH"){
    filteredMenu = [...filteredMenu].sort((a,b)=>b.price-a.price);      //high to low. [...filteredMenu] is a copy of all elements of an array 
  }

const categories = ["ALL", ...new Set(menu.map(item => item.category))];  //dynamic categeory generator


  const groupedItems = {};          //GROUP ITEMS BY CATEGORY
  filteredMenu.forEach(item => {

    if(!groupedItems[item.category]){
      groupedItems[item.category] = [];
    }

    groupedItems[item.category].push(item);

  });


  return(

    <div className="menu-container">

      <h1>Menu</h1>


      {/* SEARCH + FILTER BAR */}

      <div className="menu-controls">

        <input
          type="text"
          placeholder="Search pizza, bread, drinks..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

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

        <select
          value={sort}
          onChange={(e)=>setSort(e.target.value)}
        >

          <option value="">Sort Price</option>
          <option value="LOW">Low → High</option>
          <option value="HIGH">High → Low</option>

        </select>

      </div>


      {/* ----------- DISPLAY MENU BY CATEGORY ----------- */}

      {Object.keys(groupedItems).map(cat => (

        <div key={cat}>

          <h2 className="category-title">{cat}</h2>

          <div className="pizza-grid">

            {groupedItems[cat].map(item => (

              <PizzaCard
                key={item.id}
                pizza={item}
                showBadge={cat === "Veg" || cat === "Non-Veg"}
              />

            ))}

          </div>

        </div>

      ))}

    </div>

  )

}

export default Menu;