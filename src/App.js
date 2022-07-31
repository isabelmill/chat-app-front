import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader.jsx';
import { Home } from './pages/Home.jsx';
import { Chat } from './pages/Chat.jsx';
import { Users } from './pages/Users.jsx';
import { Login } from './pages/Login.jsx';
import { Signup } from './pages/Signup.jsx';
import './scss/styles.scss'
import { loadUsers , loadLoggedInUser } from './store/actions/userActions'
import { useDispatch } from 'react-redux'
import { useEffect} from 'react'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUsers())
    dispatch(loadLoggedInUser())
    // eslint-disable-next-line
}, [])

  return (
    <Router>
      <div className="App">
        <AppHeader />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/users' element={<Users />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
