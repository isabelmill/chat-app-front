import { ReactComponent as SearchSvg } from '../assets/imgs/search.svg';
import { ReactComponent as TrashSvg } from '../assets/imgs/trash.svg';
import { ReactComponent as EditSvg } from '../assets/imgs/edit.svg';
import { UserModal } from '../cmps/UserModal.jsx'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../services/userService';

export function Users() {
  const [isOpen, setModal] = useState(false)
  const [currUser, setCurrUser] = useState(null)

  const { users, loggedInUser } = useSelector(state => state.userModule)

  const handleModal = (value, user = userService.getEmptyUser) => {
    setModal(value);
    setCurrUser(user);
  }


  if (!users || !loggedInUser) return <div>Loading...</div>
  return (
    <section className="users">
      <div className="users-info">
        <div className="header">
          <h1>Users</h1>
          <div className="search-add">
            <div className="search">
              <input type="text" placeholder='Search By Name' />
              <SearchSvg />
            </div>
            <button onClick={() => handleModal(true)}>Add User</button>
          </div>
        </div>
        <div className="all-users">
          {users.filter((user) => user._id !== loggedInUser._id).map((user) =>
            <div className="user" key={user._id}>
              <div className="info">
                <div className="avatar">
                  <img src={user.img} alt="avatar" />
                </div>
                <div className="user-name">
                  <h1>{user.fullname}</h1>
                  <p>@{user.username}</p>
                </div>
              </div>
              {!loggedInUser.isAdmin && < div className="btns">
                <div onClick={() => handleModal(true, user)} className="edit">
                  < EditSvg />
                </div>
                <div className="remove">
                  < TrashSvg />
                </div>
              </div>}
            </div>
          )}
        </div>
      </div>
      {isOpen && < UserModal user={currUser} onHandleModal={handleModal} />}
    </section >
  )
}
