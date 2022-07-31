import { NavLink, useLocation } from "react-router-dom";

export function Home() {
    return (
        <section className="home">
            <div className="user-info">
                <div className="user-header">
                    <div className="avatar">
                        <img src={require('../assets/imgs/avatar.png')} alt="" />
                    </div>
                    <div className="description">
                        <h1>Full Name</h1>
                        <h2>@username</h2>
                        <h3>profession</h3>
                    </div>
                </div>
                <div className="user-stats">
                    <div className="stat">
                        <h3>Friends</h3>
                        <p>number</p>
                    </div>
                    <div className="stat">
                        <h3>Messages</h3>
                        <p>number</p>
                    </div>
                    <NavLink className="link" to='/chat'>
                        <p>Go To Chat</p>
                    </NavLink>
                </div>
            </div>
        </section>
    )
}
