export function decodeJwt(token) {
  try {
    if (!token) {
      console.error("Token is undefined or null.");
      return null;
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
      console.error("Invalid JWT format.");
      return null;
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}

export function checkJwtExpiration(token) {
  if (!token) {
    console.log("JWT not found.");
    return false;
  }

  const decodedToken = decodeJwt(token);
  if (!decodedToken || !decodedToken.exp) {
    console.error("Invalid JWT or no expiration time found.");
    return false;
  }

  const currentTime = Date.now() / 1000;
  return currentTime < decodedToken.exp;
}
