import React from "react";
import { useUserAuth } from "../context/UserAuthContext";
import Layout from "./Layout";

const Home = () => {
    const { user } = useUserAuth();
    return (
        <>
            <div className="p-4 box mt-3 text-center" id="home">
                Hello Welcome <br />
                {user && user.email}
            </div >
            <Layout />
        </>
    );
};

export default Home;