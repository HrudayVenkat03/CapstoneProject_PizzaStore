const BASE_URL = "http://localhost:8082/menu";

/* Helper function to get headers with JWT */

function getAuthHeaders(){

  const token = localStorage.getItem("token");

  return {
    "Content-Type":"application/json",
    Authorization:`Bearer ${token}`
  };

}


// GET MENU 

export async function getMenu(){

  const response = await fetch(BASE_URL,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  });

  if(!response.ok){
    throw new Error("Failed to fetch menu");
  }

  return response.json();
}

//ADD PIZZA 

export async function addPizza(pizza){

  const response = await fetch(BASE_URL,{
    method:"POST",
    headers:getAuthHeaders(),
    body:JSON.stringify(pizza)
  });

  if(!response.ok){
    throw new Error("Failed to add pizza");
  }

  return response.json();
}


/* UPDATE PIZZA */

export async function updatePizza(id,pizza){

  const response = await fetch(`${BASE_URL}/${id}`,{
    method:"PUT",
    headers:getAuthHeaders(),
    body:JSON.stringify(pizza)
  });

  if(!response.ok){
    throw new Error("Failed to update pizza");
  }

  return response.json();
}


/* DELETE PIZZA */

export async function deletePizza(id){

  const response = await fetch(`${BASE_URL}/${id}`,{
    method:"DELETE",
    headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  });

  if(!response.ok){
    throw new Error("Failed to delete pizza");
  }

}