import { useState, useEffect , useRef } from 'react'
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy} from 'firebase/firestore'
import { auth, db } from '../firebase-config'
import '../styles.css'

export const Chat = (props) => {
  
  const {room} = props
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([])
  const messageRef = collection(db, 'messages')
  
  useEffect(() => {
    const queryMessages = query(messageRef, where('room', '==', room), orderBy('createdAt'))
    let msgs = []
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const newData = snapshot.docs.map(doc => {
       return {id: doc.id, ...doc.data()}
      });
      setMessages(newData); 
    //console.log(messages);
    })
    return () => unsubscribe()
  }, [])
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if(newMessage === '') return
    
    await addDoc(messageRef, {
      text: newMessage,
      user: auth.currentUser.displayName,
      image: auth.currentUser.photoURL,
      createdAt: serverTimestamp(),
      room
    })
    setNewMessage('')
  }
  return (
    <div className='chat-form-control' >
    {messages.map((message) => {
       return (
       <div className='chat-interface' key={message.id}>
       <img className='chat-user-icon' src={message.image} />
       <p className='chat-username'>{message.user}</p>
       <p className='chat-message'>{message.text}</p>
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