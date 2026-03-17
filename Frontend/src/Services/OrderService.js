const BASE_URL = "http://localhost:8083/orders";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
}

/* PLACE ORDER */

export async function placeOrder(orderData) {

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(orderData)
  });

  if (!response.ok) {
    const text = await response.text();
    console.error(text);
    throw new Error("Failed to place order");
  }

  return response.json();
}

/* GET ALL ORDERS (Admin) */

export async function getOrders() {

  const response = await fetch(BASE_URL, {
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
}

/* GET ORDER BY ID */

export async function getOrderById(id) {

  const response = await fetch(`${BASE_URL}/${id}`, {
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error("Failed to fetch order");
  }

  return response.json();
}

/* APPROVE ORDER */

export async function approveOrder(id) {

  const response = await fetch(`${BASE_URL}/${id}/approve`, {
    method: "PUT",
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error("Failed to approve order");
  }

  return response.json();
}

/* CANCEL ORDER */

export async function cancelOrder(id) {

  const response = await fetch(`${BASE_URL}/${id}/cancel`, {
    method: "PUT",
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error("Failed to cancel order");
  }

  return response.json();
}