import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

interface UseAuthStore {
  isLoggedIn: boolean;
}

const PUBLIC_ROUTES = ["/login", "/sign-up"];

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isLoggedIn = useAuthStore((state) => state as UseAuthStore).isLoggedIn;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    const isPublic = PUBLIC_ROUTES.some(
      (route) =>
        location.pathname === route || location.pathname.startsWith(route)
    );

    if ((!isLoggedIn || !accessToken) && !isPublic) {
      navigate("/login");
    }

    if (
      isLoggedIn &&
      accessToken &&
      ["/login", "/sign-up"].includes(location.pathname)
    ) {
      navigate("/");
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return <>{children}</>;
};

export default AuthProvider;
