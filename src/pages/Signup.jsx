import { NavLink } from "react-router-dom";
import { useEffect } from 'react'
import { useForm } from '../hooks/useForm'
import { userService } from "../services/userService";
import { useDispatch } from 'react-redux'
import { signup } from '../store/actions/userActions'
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

export function Signup() {
    const [user, handleForm, setUser] = useForm(null)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        makeUser()
        // eslint-disable-next-line
    }, [])

    const makeUser = () => {
        const newUser = userService.getEmptyUser()
        setUser({ ...newUser })
    }

    const saveForm = async (ev) => {
        ev.preventDefault();
        try {
            await dispatch(signup(user))
            navigate("/");
            makeUser()
        } catch (error) {
            console.log(error);
        }
    };

    if (!user) return <div>Loading</div>
    return (
        <section className="signup">
            <div className="signup-form">
                <h1>Signup</h1>
                <div className="to-login">
                    <p>Already have an account?</p>
                    <NavLink className="link" to='/login'>
                        Login here
                    </NavLink>
                </div>
                <form onSubmit={saveForm}>
                    <div className="input">
                        <p>Username</p>
                        <input onChange={handleForm} name="username" value={user.username} type="text" required />
                    </div>
                    <div className="input">
                        <p>Full-name</p>
                        <input onChange={handleForm} name="fullname" value={user.fullname} type="text" required />
                    </div>
                    <div className="input">
                        <p>Email</p>
                        <input onChange={handleForm} name="email" value={user.email} type="email" required />
                    </div>
                    <div className="input">
                        <p>Password</p>
                        <input onChange={handleForm} name="password" value={user.password} type="password" required />
                    </div>
                    <div className="input">
                        <p>Profile Image URL</p>
                        <input onChange={handleForm} name="img" value={user.img} type="url" required placeholder="https://" />
                    </div>
                    <button>Signup</button>
                </form>
            </div>
            <div className="signup-img">
                <img src={require('../assets/imgs/signup.png')} alt="" />
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </section>
    )
}
