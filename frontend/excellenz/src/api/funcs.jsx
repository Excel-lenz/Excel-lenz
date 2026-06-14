import {CAPITAL} from "./auth.jsx";

export const getCapital = async () => {
  const res = await authFetch(CAPITAL);

  if (!res.ok) {
    throw new Error("Failed to fetch capital");
  }

  return await res.json();
};





// for token refresh and data pickups

export async function refreshAccessToken() {
  const refresh = localStorage.getItem("refresh");

  const res = await fetch("http://localhost:8000/api/auth/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: refresh,
    }),
  });

  if (!res.ok) {
    throw new Error("Refresh failed");
  }

  const data = await res.json();

  localStorage.setItem("access", data.access);

  return data.access;
}



export async function authFetch(url) {
  let token = localStorage.getItem("access");

  let res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    token = await refreshAccessToken();

    res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return res;
}

export async function authPost(url, data)
{
  let token = localStorage.getItem("access");

  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (res.status === 401) {
    token = await refreshAccessToken();

    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  return res;
}