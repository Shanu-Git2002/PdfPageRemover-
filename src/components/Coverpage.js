import React from 'react'
import logo from '../assets/shanu.png'
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons";
import 'animate.css'
import TrackVisibility from 'react-on-screen';
import { useUserAuth } from "../context/UserAuthContext";
import PdfPageRemover from './PdfPageRemover';

const Coverpage = () => {
    const { logOut } = useUserAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="#">
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animate__animated animate__lightSpeedInLeft" : ""}>
                                    <img className='logo' src={logo} alt="Logo" />
                                </div>}
                        </TrackVisibility>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <FontAwesomeIcon icon={faBars} style={{ color: "#fff" }} />
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <div className="navbar-nav ms-auto">
                            <Button variant="primary" onClick={handleLogout}>
                                Log out
                            </Button>
                        </div>
                    </div>
                </div>
            </nav >
            <div>
                <PdfPageRemover />
            </div>
        </>
    )
}

export default Coverpage

