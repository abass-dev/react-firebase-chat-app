import add from '../images/add.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <p className='logo'>Dev Chat</p>
      <div className='user'>
        <img src='https://cdn.pixabay.com/photo/2015/07/14/18/14/school-845196_640.png' />
        <p>Jane</p>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
