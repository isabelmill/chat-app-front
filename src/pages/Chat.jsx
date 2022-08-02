import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { LiveChat } from '../cmps/LiveChat'

export function Chat() {
    const [currUser, setCurrUser] = useState(null)
    const { users, loggedInUser } = useSelector(state => state.userModule)

    if (!loggedInUser || !users) return <div>Loading...</div>
    return (
        <section className='chat'>
            <div className="users-list">
                {loggedInUser.friendList.map((user) =>
                    <div onClick={() => setCurrUser(user)} className="user" style={{
                        backgroundColor: currUser?._id === user._id ? '#d3d6da' : '#F5F9FE'
                    }} key={user._id}>
                        <div className="user-img">
                            <img src={user.img} alt="" />
                        </div>
                        <div className="name">
                            <h1>{user.fullname}</h1>
                            <h2>@{user.username}</h2>
                        </div>
                    </div>
                )}
            </div>
            <div className="user-chat">
                <div className="user-chat-header">
                    <h1>Live Chat</h1>
                    {currUser ? <p>Chat with {currUser.fullname}</p> : <p>Plese Select User To Start Chat</p>}
                </div>
                < LiveChat user={currUser} loggedInUser={loggedInUser} users={users} />
            </div>
        </section>
    )
}
