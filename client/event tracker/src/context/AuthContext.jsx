import { useEffect, useState } from "react";
import * as authService from "../services/authService";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadUser = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {

                const profile = await authService.getCurrentUser();

                setUser(profile);

            } catch {

                localStorage.removeItem("token");

            } finally {

                setLoading(false);

            }

        };

        loadUser();

    }, []);

    const login = async (credentials) => {

        const data = await authService.login(credentials);

        localStorage.setItem("token", data.token);

        setUser(data.user);
    };

    const logout = () => {

        localStorage.removeItem("token");

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>

    );

}
