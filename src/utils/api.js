const BASE_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint, options = {}) => {
  let accessToken = localStorage.getItem("accessToken");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  let response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      const refreshRes = await fetch(`${BASE_URL}/auth`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken,
        }),
      });

      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();

        const newAccessToken = refreshData.data.accessToken;

        console.log(newAccessToken);

        localStorage.setItem("accessToken", newAccessToken);

        const retryHeaders = {
          ...headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        response = await fetch(`${BASE_URL}${endpoint}`, {
          ...options,
          headers: retryHeaders,
        });
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        window.location.reload();
      }
    }
  }

  return response;
};
