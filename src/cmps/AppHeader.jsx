import { NavLink, useLocation } from "react-router-dom";

export function AppHeader() {
    return (
        <section className="app-header">
            <div className="logo">
                <h1>ChatApp</h1>
            </div>
            <div className="nav-bar">
                <NavLink className="link" to='/'>
                    <p>Home</p>
                </NavLink>
                <NavLink className="link" to='/chat'>
                    <p>Chat</p>
                </NavLink>
                <NavLink className="link" to='/admin'>
                    <p>Admin</p>
                </NavLink>
            </div>
            <div className="user"></div>
        </section>
    )
}
