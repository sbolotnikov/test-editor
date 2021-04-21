import React from "react";
import { Redirect } from "react-router-dom";

function RedirectMain() {
// redirect to root
    return (
        <Redirect to="/" />
    );
}

export default RedirectMain;