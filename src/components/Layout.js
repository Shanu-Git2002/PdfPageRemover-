import React from 'react'
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap";


const Layout = () => {
    return (
        <div className="main pt-4">
            <div className="layout">
                <div className="sidebar">
                    <div className="jogo">
                        <h6 className="text-dark"> To Our Note Sharing Application</h6>
                        <hr />
                    </div>
                    <div className="menu">
                        <div className={`menu-item `}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <Link to="/coverpage">
                                <div className="d-grid gap-2 mt-3">
                                    <Button variant="success" type="Submit">
                                        Please visit it once
                                    </Button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout
