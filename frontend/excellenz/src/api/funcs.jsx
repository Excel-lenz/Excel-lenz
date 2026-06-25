import {API_BASE_URL, CAPITAL, CHANGE_PASSWORD, SETTINGS} from "./auth.jsx";

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

  const res = await fetch(`${API_BASE_URL}/api/auth/refresh/`, {
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
  const refresh = localStorage.getItem("refresh");

  if (!token && refresh) {
    try {
      token = await refreshAccessToken();
    } catch {
      token = null;
    }
  }

  let res = await fetch(url, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (res.status === 401 && refresh) {
    try {
      token = await refreshAccessToken();
    } catch {
      return res;
    }

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
  const refresh = localStorage.getItem("refresh");

  if (!token && refresh) {
    try {
      token = await refreshAccessToken();
    } catch {
      token = null;
    }
  }

  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  if (res.status === 401 && refresh) {
    try {
      token = await refreshAccessToken();
    } catch {
      return res;
    }

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

export async function authDelete(url) {
  let token = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");

  if (!token && refresh) {
    try {
      token = await refreshAccessToken();
    } catch {
      token = null;
    }
  }

  let res = await fetch(url, {
    method: "DELETE",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (res.status === 401 && refresh) {
    try {
      token = await refreshAccessToken();
    } catch {
      return res;
    }

    res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return res;
}

export async function authPatch(url, data) {
  let token = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");

  if (!token && refresh) {
    try {
      token = await refreshAccessToken();
    } catch {
      token = null;
    }
  }

  let res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  if (res.status === 401 && refresh) {
    try {
      token = await refreshAccessToken();
    } catch {
      return res;
    }

    res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  return res;
}

// Settings API Functions
export async function getSettings() {
  const res = await authFetch(SETTINGS);

  if (!res.ok) {
    throw new Error("Failed to fetch settings");
  }

  return await res.json();
}

export async function updateSettings(settingsData) {
  const res = await authPatch(SETTINGS, settingsData);

  if (!res.ok) {
    throw new Error("Failed to update settings");
  }

  return await res.json();
}

export async function changePassword(passwordData) {
  const res = await authPost(CHANGE_PASSWORD, passwordData);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const firstMessage =
      data?.detail ||
      data?.current_password?.[0] ||
      data?.new_password?.[0] ||
      data?.confirm_password?.[0] ||
      "Passwort konnte nicht aktualisiert werden.";

    throw new Error(firstMessage);
  }

  return data;
}