import { useState, useEffect , useRef } from 'react'
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, limit, orderBy} from 'firebase/firestore'
import { auth, db } from '../firebase-config'
import { Chat } from './Chat'
export const Rooms = (props) => {
  const { setRoom } = props
  const roomsRef = collection(db, 'messages')
  const [rooms, setRooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState(null)
  const inputRef = useRef(null)
  
    useEffect(() => {
    const queryRooms = query(roomsRef, orderBy('createdAt'))
    let msgs = []
    const unsubscribe = onSnapshot(queryRooms, (snapshot) => {
      const data = snapshot.docs.map(doc => {
       return {id: doc.id, ...doc.data()}
      });
      setRooms(data); 
    })
    
    return () => unsubscribe()
  }, [])
  
  const handlerRoom = async (value) => {
  setSelectedRoom(value)
  }
  if(selectedRoom) {
    return (<Chat room={selectedRoom}/>)
  }
  
  return (
    <div>
    Rooms List
    {rooms.map((room) => {
      return (
      <h3 onClick={() => handlerRoom(room.room)} key={room.id}>{room.room}</h3>
      )
    })}
    <label>Enter new room</label>
    <input ref={inputRef}/>
    <button onClick={() => setRoom(inputRef.current.value)}>Add room</button>
    </div>
    )
}