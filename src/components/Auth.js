import { auth, provider } from '../firebase-config.js'
import { signInWithPopup } from 'firebase/auth'
import Cookies from 'universal-cookie';
import '../styles.css'

const cookies = new Cookies();

export const Auth = (props) => {
  const {setIsAuth} = props
  const loginWithGoogle = async () => {
  try {
  const result = await signInWithPopup(auth, provider)
  cookies.set('auth-token',result.user.refreshToken)
  setIsAuth(true)
  } catch (e) {
    console.log(e)
  }
  }
  return (
    <div className='chat-auth'>
    <div className='chat-auth-container'>
    <h1 className='auth-title title-font'>Welcome, let's chat</h1>
    <p className='auth-info-text'>Login with Google to continue...</p>
    <button className='auth-login-btn' onClick={loginWithGoogle}>Login</button>
    </div>
    </div>
  )
}