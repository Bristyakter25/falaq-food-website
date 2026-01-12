const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID;

export const placeOrder = async (orderData) => {
  const response = await fetch(`${BASE_URL}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "store-id": STORE_ID,
    },
    body: JSON.stringify(orderData),
  });
  return response.json();
};

export const fetchUserOrders = async (token) => {
  const response = await fetch(`${BASE_URL}/dashboard/user/order`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token, 
    },
  });
  return response.json();
};