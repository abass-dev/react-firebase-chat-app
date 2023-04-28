const Login = () => {
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <p className='logo'>Dev Chat</p>
        <p className='title'>Login</p>
        <form>
          <input type='email' placeholder='Your email' />
          <input type='password' placeholder='Your password' />
          <button>Sign in</button>
          <p className='condition'>Don't have an account? Register</p>
        </form>
      </div>
    </div>
  )
}

export default Login
