import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

function Logout() {

    const { logout } = useAuth();
    async function logoutHandle() {
        try {
            await logout();
        } catch {
            console.log("Failed to log out");
        }
    }

    useEffect(() => {
       
        logoutHandle();

    }, []);
    return (
        <Redirect to="/login" />
    );
}

export default Logout;