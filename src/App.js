import { useState, useRef } from 'react'
import { Auth } from './components/Auth'
import Cookies from 'universal-cookie';
import { signOut } from 'firebase/auth'
import { Chat } from './components/Chat'
import { Rooms } from './components/Rooms'
import { auth } from './firebase-config'
import './App.css';

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'))
  const [room, setRoom] = useState(null)
  
  const signOutUser = async () => {
    await signOut(auth)
    cookies.remove('auth-token')
    setRoom(null)
    setIsAuth(false)
  }
  
  if (!isAuth) {
  return <Auth setIsAuth={setIsAuth} />
  }
  
  return (
    <div>
    {room ? <Chat room={room}/>:
    (
    <div>
    <Rooms setRoom={setRoom}/>
    </div>
    )
    }
    </div>
    )
}

export default App;
