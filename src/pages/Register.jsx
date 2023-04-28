import addprofile from '../images/addprofile.png'

const Register = () => {
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <p className='logo'>Dev Chat</p>
        <p className='title'>Register</p>
        <form>
          <input type='text' placeholder='Your name' />
          <input type='email' placeholder='Your email' />
          <input type='password' placeholder='Your password' />
          <input style={{ display: 'none' }} type='file' placeholder='Your profile image' id='file' />
          <label htmlFor='file'>
            <img src={addprofile} /> <span>Add image</span>
          </label>
          <button>Sign up</button>
          <p className='condition'>Already have an account? Login</p>
        </form>
      </div>
    </div>
  )
}

export default Register
