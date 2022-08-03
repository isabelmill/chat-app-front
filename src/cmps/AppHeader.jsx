import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'
import Hamburger from 'hamburger-react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../store/actions/userActions'
import { useDispatch } from 'react-redux'
import Switch from "react-switch";

export function AppHeader({ theme, toggleTheme }) {
    const { loggedInUser } = useSelector(state => state.userModule)
    const [isOpen, setOpen] = useState(false)
    const [isUserOpen, setUserOpen] = useState(false)
    const location = useLocation();
    const [pathName, setPathname] = useState(location.pathname)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    console.log(theme);

    if (pathName !== location.pathname) {
        setOpen(false)
        setUserOpen(false)
        setPathname(location.pathname)
    }


    const logout = () => {
        const gUser = {
            email: "guest@gmail.com",
            password: "guest123"
        }
        setUserOpen(false)
        dispatch(login(gUser))
        navigate("/");

    }
    const close = () => {
        setUserOpen(false)
    }



    if (!loggedInUser) return <div>Loading...</div>
    return (
        <section className="app-header">
            {isOpen && <div className="modal" >
                <div className="content" >
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
            </div>}


            {isUserOpen && <div className="user-info-modal">
                <div className="header">
                    <div className="empty-div"></div>
                    <p>Account</p>
                    <svg onClick={close} xmlns="http://www.w3.org/2000/svg" fill='#191919' height="24" width="24"><path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z" /></svg>
                </div>

                <div className="user-info">
                    <p>{loggedInUser.fullname}</p>
                </div>
                <div className="log">
                    <div className="login-signup">
                        <NavLink className="link" to='/login'>
                            <p>Login</p>
                        </NavLink>
                        <p>|</p>
                        <NavLink className="link" to='/signup'>
                            <p>Signup</p>
                        </NavLink>
                    </div>
                    {loggedInUser.email === 'guest@gmail.com' ? null : <div className="logout">
                        <p>|</p>
                        <p onClick={logout}>Logout</p>
                    </div>}
                </div>
            </div>}


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
                {/* <div className="notification">
                    <img src={require('../assets/imgs/notification.png')} alt="" />
                </div> */}
                <Switch
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onChange={toggleTheme}
                    checked={theme === "dark"}
                    onColor={'#010409'}
                />
                <div className="user" onClick={() => setUserOpen(current => !current)}>
                    <img src={loggedInUser.img} alt="" />
                </div>
                <div className="hamburger">
                    <Hamburger color={theme === "dark" ? "#F0F6FC" : "#191919"} size={25} toggled={isOpen} toggle={setOpen} />
                </div>
            </div>
        </section>
    )
}
