import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'

export function AppHeader() {
    const { loggedInUser } = useSelector(state => state.userModule)

    if (!loggedInUser) return <div>Loading...</div>
    return (
        <section className="app-header">
            <div className="logo">
                <img src={require('../assets/imgs/logo.png')} alt="logo" />
                <h1>ChatApp</h1>
            </div>
            <div className="nav-bar">
                <NavLink className="link" to='/'>
                    <p>Home</p>
                </NavLink>
                <NavLink className="link" to='/chat'>
                    <p>Chat</p>
                </NavLink>
                <NavLink className="link" to='/users'>
                    <p>Users</p>
                </NavLink>
            </div>
            <div className="user-notification">
                <div className="notification">
                    <img src={require('../assets/imgs/notification.png')} alt="" />
                </div>
                <div className="user">
                    <img src={loggedInUser.img} alt="" />
                </div>
            </div>
        </section>
    )
}
