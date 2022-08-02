import { socketService } from '../services/socket.service'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../services/userService'
import { updateUser } from '../store/actions/userActions'
import { useDispatch } from 'react-redux'
import moment from 'moment';

export const LiveChat = ({ user, loggedInUser, users }) => {
    const [msg, setMsg] = useState('')
    const [msgs, setMsgs] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
            socketService.emit('chat room', user.room)
            setUserMsgs()
        }
        return () => {
            if (user) {
                setMsgs([])
            }
        }
    }, [user])

    useEffect(() => {
        if (msgs.length > 0) {
            saveUser()
        }
    }, [msgs])



    useEffect(() => {
        socketService.on('receive message', setList)
    }, [socketService])

    const setList = async (data) => {
        const idx = msgs.findIndex((msg) => msg.id === data.id)
        if (idx === -1) {
            setMsgs((list) => [...list, data])
        }
    }

    const setUserMsgs = () => {
        const friendUser = JSON.parse(JSON.stringify(user))
        setMsgs([...friendUser.msgs])
    }

    const sendMsg = async () => {
        const friendUser = JSON.parse(JSON.stringify(user))
        const logged = JSON.parse(JSON.stringify(loggedInUser))
        if (!msg) return
        const msgData = {
            id: userService.makeId(),
            text: msg,
            room: friendUser.room,
            author: '@' + logged.username,
            time: Date.now()
        }
        await socketService.emit('send message', msgData, friendUser.room)
        setMsgs((list) => [...list, msgData])
        setMsg('')
    }

    const saveUser = () => {
        const friendUser = JSON.parse(JSON.stringify(user))
        const logged = JSON.parse(JSON.stringify(loggedInUser))
        friendUser.msgs = [...msgs]
        const idx = logged.friendList.findIndex((friend) => friend._id === friendUser._id)
        logged.friendList.splice(idx, 1, friendUser)
        dispatch(updateUser(logged))
    }


    if (!msgs || !user) return <div className='no-user'>
        <div className="img">
            <img src="https://res.cloudinary.com/dw85wdwsw/image/upload/v1659435900/Portfolio/k2dqiko6c0zwktvigukr.png" alt="" />
        </div>
    </div>
    return (
        <section className='live-chat'>
            <div className="user-chat">
                <div className="chat-msgs">
                    <div className="msgs">
                        {msgs.map((msg) =>
                            <div key={msg.id} className="msg" id={msg.author === '@' + loggedInUser.username ? "you" : "other"}>
                                <h2>{msg.text}</h2>
                                <p>{moment(msg.time).format('LT')}</p>
                            </div>)}
                    </div>
                </div>
                <form onSubmit={sendMsg}>
                    <input onChange={(event) => { setMsg(event.target.value) }} type="text" placeholder="Type your message..." value={msg} />
                    <button>Send</button>
                </form>
            </div>
        </section>
    )
}
