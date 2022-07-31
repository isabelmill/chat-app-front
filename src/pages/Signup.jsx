import { NavLink, useLocation } from "react-router-dom";

export function Signup() {
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
                <form action="">
                    <div className="input">
                        <p>Username</p>
                        <input type="text" required />
                    </div>
                    <div className="input">
                        <p>Full-name</p>
                        <input type="text" required />
                    </div>
                    <div className="input">
                        <p>Email</p>
                        <input type="email" required />
                    </div>
                    <div className="input">
                        <p>Password</p>
                        <input type="password" required />
                    </div>
                    <div className="input">
                        <p>Profile Image URL</p>
                        <input type="url" required placeholder="https://" />
                    </div>
                    <button>Signup</button>
                </form>
            </div>
            <div className="signup-img">
                <img src={require('../assets/imgs/signup.png')} alt="" />
            </div>
        </section>
    )
}
