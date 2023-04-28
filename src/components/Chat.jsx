import camera from '../images/camera.png'
import add from '../images/add.png'
import dots from '../images/dots.png'
import { Messages, Input } from './'

const Chat = () => {
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>Jane</span>
        <div className='chatIcons'>
          <img src={camera} alt='' />
          <img src={add} alt='' />
          <img src={dots} alt='' />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
