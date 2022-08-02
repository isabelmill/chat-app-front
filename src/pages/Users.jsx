import { ReactComponent as SearchSvg } from '../assets/imgs/search.svg';
import { ReactComponent as TrashSvg } from '../assets/imgs/trash.svg';
import { ReactComponent as EditSvg } from '../assets/imgs/edit.svg';
import { ReactComponent as PlusSvg } from '../assets/imgs/person-plus.svg';
import { ReactComponent as DashSvg } from '../assets/imgs/person-dash.svg';
import { UserModal } from '../cmps/UserModal.jsx'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../services/userService';
import { removeUser, updateUser } from '../store/actions/userActions'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

export function Users() {
  const [isOpen, setModal] = useState(false)
  const [currUser, setCurrUser] = useState(null)
  const dispatch = useDispatch()

  const { users, loggedInUser } = useSelector(state => state.userModule)

  const handleModal = (value, user = userService.getEmptyUser) => {
    setModal(value);
    setCurrUser(user);
  }
  const remove = (user) => {
    dispatch(removeUser(user._id))
  }
  const addToList = (user) => {
    const userFriend = JSON.parse(JSON.stringify(user))
    userFriend.room = userService.makeId()
    userFriend.msgs = []
    const newLoggedInUser = JSON.parse(JSON.stringify(loggedInUser))
    newLoggedInUser.friendList.push(userFriend)
    dispatch(updateUser(newLoggedInUser))

    addToFriendsList(newLoggedInUser, userFriend)
  }

  const addToFriendsList = (newLoggedInUser, userFriend) => {
    const loggedInUserToSave = JSON.parse(JSON.stringify(newLoggedInUser))
    
    const idx = userFriend.friendList.findIndex((u) => u._id === loggedInUserToSave._id)
    if (idx === -1) {
      loggedInUserToSave.room = userFriend.room
      loggedInUserToSave.msgs = []
      delete userFriend.room
      delete userFriend.msgs
      userFriend.friendList.push(loggedInUserToSave)
      dispatch(updateUser(userFriend))
    }
    notifyAdd(userFriend.fullname)
  }

  const notifyAdd = (name) => toast.success(`${name} was added to your friend-list`, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const notify = () => toast.info('Unfortunately this feature does not work yet 😭', {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });



  const removeFromList = (user) => {
    const newLoggedInUser = { ...loggedInUser }
    const idx = newLoggedInUser.friendList.findIndex((u) => u._id === user._id)
    newLoggedInUser.friendList.splice(idx, 1)
    dispatch(updateUser(newLoggedInUser))
    removeFromFriendList(newLoggedInUser, user)
  }

  const removeFromFriendList = (newLoggedInUser, user) => {
    const loggedInUserToSave = JSON.parse(JSON.stringify(newLoggedInUser))
    const friendUser = JSON.parse(JSON.stringify(user))
    const idx = friendUser.friendList.findIndex((u) => u._id === loggedInUserToSave._id)
    friendUser.friendList.splice(idx, 1)
    dispatch(updateUser(friendUser))
    notifyRemove(friendUser.fullname)
  }

  const notifyRemove = (name) => toast.success(`${name} was removed from your friend-list`, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const checkUserInList = (user) => {
    const friend = loggedInUser.friendList.find((u) => u._id === user._id)
    if (friend) return true
    else return false
  }

  if (!users || !loggedInUser) return <div>Loading...</div>
  return (
    <section className="users">
      <div className="users-info">
        <div className="header">
          <h1>Users</h1>
          <div className="search-add">
            <div className="search" onClick={notify}>
              <input type="text" placeholder='Search By Name' />
              <SearchSvg />
            </div>
            {loggedInUser.isAdmin && <button onClick={() => handleModal(true)}>Add User</button>}
          </div>
        </div>
        <div className="all-users">
          <div className="first-user">
            <div className="info">
              <div className="avatar">
                <img src={loggedInUser.img} alt="avatar" />
              </div>
              <div className="user-name">
                <h1>{loggedInUser.fullname}</h1>
                <p>@{loggedInUser.username}</p>
              </div>
            </div>
            < div className="btns">
              {/* <div onClick={() => handleModal(true, loggedInUser)} className="edit">
                < EditSvg />
              </div> */}
            </div>
          </div>
          <div className="block"></div>
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
              < div className="btns">
                {!checkUserInList(user) ? <div onClick={() => addToList(user)} className="add-btn">
                  <PlusSvg />
                </div> :
                  <div onClick={() => removeFromList(user)} className="remove-btn">
                    <DashSvg />
                  </div>}
                {loggedInUser.isAdmin && <div className="edit-btns">
                  <div onClick={() => handleModal(true, user)} className="edit">
                    < EditSvg />
                  </div>
                  <div onClick={() => remove(user)} className="remove">
                    < TrashSvg />
                  </div>
                </div>}
              </div>
            </div>
          )}
        </div>
      </div>
      {isOpen && < UserModal user={currUser} onHandleModal={handleModal} />}
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
    </section >
  )
}
