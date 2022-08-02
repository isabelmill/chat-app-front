import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify';

export function Home() {

    const { loggedInUser } = useSelector(state => state.userModule)


    const checkMsgsCount = () => {
        const sumWithInitial = loggedInUser.friendList.reduce(
            (acc, friend) => acc + friend.msgs.length,
            0
        );
        return sumWithInitial
    }

    if (!loggedInUser) return <div>Loading...</div>
    return (
        <section className="home">
            <div className="user-info">
                <div className="user-header">
                    <div className="avatar">
                        <img src={loggedInUser.img} alt="avatar" />
                    </div>
                    <div className="description">
                        <h1>{loggedInUser.fullname}</h1>
                        <h2>@{loggedInUser.username}</h2>
                    </div>
                </div>
                <div className="user-stats">
                    <div className="stat">
                        <h3>Friends</h3>
                        <p>{loggedInUser.friendList.length}</p>
                    </div>
                    <div className="stat">
                        <h3>Messages</h3>
                        <p>{checkMsgsCount()}</p>
                    </div>
                    <NavLink className="link" to='/chat'>
                        <p>Go To Chat</p>
                    </NavLink>
                </div>
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
