import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader.jsx';
import { Home } from './pages/Home.jsx';
import { Chat } from './pages/Chat.jsx';
import { Users } from './pages/Users.jsx';
import { Login } from './pages/Login.jsx';
import { Signup } from './pages/Signup.jsx';
import './scss/styles.scss'
import { loadUsers, loadLoggedInUser } from './store/actions/userActions'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { createContext } from 'react';

export const ThemeContext = createContext(null)

function App() {
  const dispatch = useDispatch()
  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"))
  }

  useEffect(() => {
    dispatch(loadUsers())
    dispatch(loadLoggedInUser())
    // eslint-disable-next-line
  }, [])

  return (
    // <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <div className="App" id={theme}>
          <AppHeader theme={theme} toggleTheme={toggleTheme} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/users' element={<Users />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </div>
      </Router>
    // </ThemeContext.Provider>
  );
}

export default App;
