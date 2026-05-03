import { jwtDecode } from "jwt-decode";

export const getUserRole = () => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");

  if (!token) return null;

  const decoded: any = jwtDecode(token);

  return decoded[
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  ];
};  