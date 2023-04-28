const Message = ({owner}) => {
  return (
    <div className={`message ${owner && 'owner'}`}>
      <div className='messageInfo'>
        <img src='https://cdn.pixabay.com/photo/2015/07/14/18/14/school-845196_640.png' />
        <p>3:46 MP</p>
      </div>
      <div className='messageContent'>
        <img src='https://cdn.pixabay.com/photo/2015/07/14/18/14/school-845196_640.png' />
        <p>Hellobbbbbbb bbbhh hhhjjjjjjv bbhhh</p>
      </div>
    </div>
  )
}
export default Message
