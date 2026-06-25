"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchCurrentUser(jwt: string) {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/me",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      setUser(data);
      setToken(jwt);
    } catch {
      logout();
    }
  }

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      fetchCurrentUser(savedToken);
    }

    setLoading(false);
  }, []);

  async function login(jwt: string) {
    localStorage.setItem("token", jwt);

    await fetchCurrentUser(jwt);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);