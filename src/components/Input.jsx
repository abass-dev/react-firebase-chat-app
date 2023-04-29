import attachfile from '../images/attachfile.png'
import attachimg from '../images/attachimg.png'
import { useState, useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'
import { doc, onSnapshot, serverTimestamp, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { v4 as uuid } from 'uuid'
import { BiImageAdd } from 'react-icons/bi'
import { ImAttachment } from 'react-icons/im'
import { BsSend } from 'react-icons/bs'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const Input = () => {
  const [text, setText] = useState('')
  const [img, setImg] = useState(null)

  const { data } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext)

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid())

      const uploadTask = uploadBytesResumable(storageRef, img)

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(downloadURL)
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            })
          })
        },
      )
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      })
    }

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    })

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    })

    setText('')
    setImg(null)
  }
  return (
    <div className='input'>
      <input value={text} onChange={(e) => setText(e.target.value)} type='text' placeholder='Write something...' />
      <div className='send'>
        <i>
          <ImAttachment size={24} color='#00000090' />
        </i>

        <label htmlFor='img'>
          <i>
            <BiImageAdd size={24} color='#00000090' />
          </i>
        </label>
        <input onChange={(e) => setImg(e.target.files[0])} type='file' id='img' style={{ display: 'none' }} />
        <button onClick={handleSend}>
          <i>
            <BsSend size={24} color='#00000090' />
          </i>
        </button>
      </div>
    </div>
  )
}
export default Input
