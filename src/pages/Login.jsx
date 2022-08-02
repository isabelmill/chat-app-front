import { NavLink } from "react-router-dom";
import { useForm } from '../hooks/useForm'
import { login } from '../store/actions/userActions'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

export function Login() {
  const [user, handleForm, setUser] = useForm({ email: '', password: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const saveForm = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(login(user))
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setUser({ email: '', password: '' })
  };


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
        <form onSubmit={saveForm}>
          <div className="input">
            <p>Email</p>
            <input onChange={handleForm} name="email" value={user.email} type="email" required />
          </div>
          <div className="input">
            <p>Password</p>
            <input onChange={handleForm} name="password" value={user.password} type="password" required />
          </div>
          <button>Login</button>
        </form>
      </div>
      <div className="login-img">
        <img src={require('../assets/imgs/login.png')} alt="" />
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
