import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  username: string;
  email: string;
  role: "user" | "owner";
  token?: string;
}

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string,
    role?: "user" | "owner"
  ) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
    role?: "user" | "owner"
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (
  email: string,
  password: string,
  role: "user" | "owner" = "user"
) => {
  setIsLoading(true);
  setError(null);
  try {
    const loginUrl =
      role === "owner"
        ? "http://localhost:8090/api/auth/login-owner"
        : "http://localhost:8090/api/auth/login";

    const response = await fetch(loginUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }), // ✅ ONLY send email + password
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    const newUser: User = {
      id: data.id,
      username: data.username,
      email: data.email,
      role: data.role,
      token: data.token,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  } catch (err: any) {
    setError(err.message || "Failed to login");
    throw err;
  } finally {
    setIsLoading(false);
  }
};

  const register = async (
    username: string,
    email: string,
    password: string,
    role: "user" | "owner" = "user"
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const registerUrl =
        role === "owner"
          ? "http://localhost:8090/api/auth/register-owner"
          : "http://localhost:8090/api/auth/register";

      const response = await fetch(registerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      const newUser: User = {
        id: data.id,
        username: data.username,
        email: data.email,
        role: data.role,
        token: data.token,
      };

      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    } catch (err: any) {
      setError(err.message || "Failed to register");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isLoading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
