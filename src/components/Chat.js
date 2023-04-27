import {
  useState,
  useEffect,
  useRef
} from 'react'
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy
} from 'firebase/firestore'
import {
  auth,
  db
} from '../firebase-config'
import '../styles.css'

export const Chat = (props) => {

  const {
    room
  } = props
  const [newMessage,
    setNewMessage] = useState('')
  const [messages,
    setMessages] = useState([])
  const messageRef = collection(db, 'messages')

  useEffect(() => {
    const queryMessages = query(messageRef, where('room', '==', room), orderBy('createdAt'))
    let msgs = []
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const newData = snapshot.docs.map(doc => {
        return {
          id: doc.id, ...doc.data()}
      });
      setMessages(newData);
      //console.log(messages);
    })
    return () => unsubscribe()
  }, [])
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (newMessage === '') return

    await addDoc(messageRef, {
      text: newMessage,
      user: auth.currentUser.displayName,
      image: auth.currentUser.photoURL,
      createdAt: serverTimestamp(),
      time: new Date().toString(),
      room
    })
    setNewMessage('')
  }
  
  const handleTime = (time) => {
    // Create a new Date object
    const now = new Date(time);

    // Get the current hour and minutes
    const hour = now.getHours();
    const minutes = now.getMinutes();
    // Determine whether it's AM or PM
    const amOrPm = hour >= 12 ? 'PM': 'AM';

    // Convert the hour to 12-hour format
    const hour12 = hour % 12 || 12;

    // Output the current time in "hh:mm AM/PM" format
    return `${hour12}:${minutes <= 9 ? '0' : ''}${minutes} ${amOrPm}`;

  }
  return (
    <div className='chat-form-control'>
    {messages.map((message) => {
      return (
        <div className='chat-interface' key={message.id}>
       <img className='chat-user-icon' src={message.image} />
       <p className='chat-username'>
          {message.user}
        </p>
       <p className='chat-message'>
          {message.text}
        </p>
       <p className='chat-time'>
          {handleTime(message.time)}
        </p>
        </div>
      )
    })}
    <form className='chat-form' onSubmit={onSubmitHandler}>
    <div className='chat-control'>
    <input placeholder='Write your message...' className='chat-message-input' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
    <button className='chat-send-button' type='submit'>🚀</button>
    </div>
    </form>
    </div>
  )
}