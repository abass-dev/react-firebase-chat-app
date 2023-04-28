import attachfile from '../images/attachfile.png'
import attachimg from '../images/attachimg.png'
const Input = () => {
  return (
    <div className='input'>
      <input type='text' placeholder='Write something...' />
      <div className='send'>
        <img src={attachfile} alt='' />
        <label htmlFor='img'>
          <img src={attachimg} alt='' />
        </label>
        <input type='file' id='img' style={{ display: 'none' }} />
        <button>Send</button>
      </div>
    </div>
  )
}
export default Input
