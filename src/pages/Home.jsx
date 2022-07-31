import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'

export function Home() {

    const { loggedInUser } = useSelector(state => state.userModule)


    if (!loggedInUser) return <div>Loading...</div>
    return (
        <section className="home">
            <div className="user-info">
                <div className="user-header">
                    <div className="avatar">
                        <img src={loggedInUser.img} alt="" />
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
                        <p>0</p>
                    </div>
                    <NavLink className="link" to='/chat'>
                        <p>Go To Chat</p>
                    </NavLink>
                </div>
            </div>
        </section>
    )
}
