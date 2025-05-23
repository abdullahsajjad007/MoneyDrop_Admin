import { userProps } from "../interface";

export function getStoredUser() {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
}

export function setStoredUser(user: userProps) {
  localStorage.setItem("user", JSON.stringify(user));
}

// STUB: save login token to local storage
export function setLoginToken(token: string) {
  localStorage.setItem("token", JSON.stringify(token));
}

// STUB: get login token from local storage
export function getLoginToken() {
  const storedToken = localStorage.getItem("token");
  return storedToken ? JSON.parse(storedToken) : null;
}

// In your local storage utilities file
export function setUserLocation(location: { lat: number; long: number }) {
  localStorage.setItem("location", JSON.stringify(location));
}

export function getUserLocation() {
  const storedLocation = localStorage.getItem("location");
  return storedLocation ? JSON.parse(storedLocation) : null;
}
