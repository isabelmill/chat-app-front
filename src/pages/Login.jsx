import { NavLink, useLocation } from "react-router-dom";

export function Login() {
  return (
    <section className="login">
      <div className="login-form">
        <h1>Login</h1>
        <div className="to-signup">
          <p>Don't have an account?</p>
          <NavLink className="link" to='/signup'>
            Signup here
          </NavLink>
        </div>
        <form action="">
          <div className="input">
            <p>Email</p>
            <input type="email" />
          </div>
          <div className="input">
            <p>Password</p>
            <input type="password" />
          </div>
          <button>Login</button>
        </form>
      </div>
      <div className="login-img">
        <img src={require('../assets/imgs/login.png')} alt="" />
      </div>
    </section>
  )
}
