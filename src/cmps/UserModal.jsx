import { useEffect, useState, useRef } from 'react'
import { useForm } from '../hooks/useForm'
import Switch from "react-switch";

export const UserModal = (props) => {
  const [user, handleForm, setUser] = useForm(null)

  useEffect(() => {
    makeUser()
    // eslint-disable-next-line
  }, [props.user])

  const close = () => {
    props.onHandleModal(false);
  }

  const makeUser = () => {
    setUser({ ...props.user })
  }
  const toggleAdmin = () => {
    user.isAdmin = !user.isAdmin
    setUser({...user})
  }

  const saveForm = (ev) => {
    ev.preventDefault();
    close()
  };

  if (!user) return <div>Loading</div>
  return (
    <section className="user-modal">
      <div className="content">
        <div className="header">
          {user._id ? <h1>Edit User</h1> : <h1>Add User</h1>}
          <svg onClick={close} xmlns="http://www.w3.org/2000/svg" fill='#191919' height="24" width="24"><path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z" /></svg>
        </div>
        <div className="body">
          <form onSubmit={saveForm}>
            <div className="input">
              <p>Username</p>
              <input onChange={handleForm} name="username" type="text" value={user.username} />
            </div>
            <div className="input">
              <p>Full-Name</p>
              <input onChange={handleForm} name="fullname" type="text" value={user.fullname} />
            </div>
            <div className="input">
              <p>Email</p>
              <input onChange={handleForm} name="email" type="email" value={user.email} />
            </div>
            <div className="input">
              <p>Password</p>
              <input onChange={handleForm} name="password" type="password" value={user.password} />
            </div>
            <div className="input">
                <p>Toggle Admin</p>
              <label>
                <Switch onChange={toggleAdmin} checked={user.isAdmin} />
              </label>
              {/* <p>{user.isAdmin ? 'User is admin' : 'User isn`t admin'}</p> */}
            </div>
            <div className="input">
              <p>Image</p>
              <input onChange={handleForm} name="img" type="url" value={user.img} />
            </div>
            <div className="user-img">
              {user.img ? <img src={user.img} alt="avatar" /> : <p>NO IMAGE</p>}
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </section>
  )
}
