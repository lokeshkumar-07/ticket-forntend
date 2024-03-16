import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import {FcGoogle} from 'react-icons/fc'
import { useDispatch } from 'react-redux';
import { googleSignIN } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const OAuth = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoogleClick = async() => {
    
    try{
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);

        const result = await signInWithPopup(auth, provider);
        console.log(result.user)
        
        dispatch(googleSignIN(result))
        .then((res) => {
          console.log(res)
          navigate('/')
          toast.success("SignIn Successfully")
        })
        
        
        
        

    }catch (error) {
        console.log('could not sign in with google', error);
    }
  }

  return (
    <button onClick={() => handleGoogleClick()} className='mx-auto flex items-center gap-2 py-2 px-5 bg-blue-400 rounded-full hover:bg-orange-700 text-white'>
        <span className='text-[20px]'><FcGoogle /></span> <h1>Sign In with Google </h1>
    </button>
)
}

export default OAuth
