import React, { useEffect, useRef, useState } from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { login, register } from '../features/authSlice'
import { MenuItem, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc'
import { app } from '../firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import OAuth from '../components/OAuth'
import { toast } from 'react-toastify'


const registerSchema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().required("Required").email("Invalid email"),
    password: yup.string().required("Required"),
    role: yup.string().required('Required'),
    gender: yup.string().required('Required'),
}) 


const inititialValueRegister = {
    name: "",
    email: "",
    password: "",
    role: "Patient",
    gender: "Male",
};


const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {message} = useSelector((state) => state.auth)

  const roles = ['Patient', 'Doctor'];
  const genders = ['Male', 'Female'];

  const imageRef = useRef(null);
  const [image, setImage] = useState('https://firebasestorage.googleapis.com/v0/b/mern-docapp.appspot.com/o/man-avatar.png?alt=media&token=f64ca0e5-b0e7-46e9-a963-27d50eebb401');
  const [fileUploadError, setFileUploadError] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [avatar, setAvatar] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // const handleFileUpload = (file) => {
  //   const storage = getStorage(app);
  //   const fileName = new Date().getTime() + file.name;
  //   const storageRef = ref(storage, fileName);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on(
  //     'state_changed',
  //     (snapshot) => {
  //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       setFilePerc(Math.round(progress));
  //     },
  //     (error) => {
  //       setFileUploadError(true);
  //       console.error(error);
  //     },
  //     () => {
  //       getDownloadURL(storageRef)
  //         .then((downloadURL) => {
  //           setAvatar(downloadURL);
  //         })
  //         .catch((error) => {
  //           setFileUploadError(true);
  //           console.error(error);
  //         });
  //     }
  //   );
  // };

  // useEffect(() => {
  //   if (imageRef.current.files.length > 0) {
  //     handleFileUpload(imageRef.current.files[0]);
  //   }
  // }, [image]);



  const registerMethod = async (values, onSubmitProps) => {
    console.log("Register")
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email.toLowerCase());
    formData.append("password", values.password);
    formData.append("gender", values.gender);
    formData.append('avatar', avatar)

    // try{
    //   await dispatch(register(formData))
    // }catch(err){
    //   console.log(err)
    // }

    await dispatch(register(formData))
    .then((res) => {
      if(res.type == "auth/register/fulfilled"){
        toast.success('Registration SuccessFully')
        navigate('/')
      }
      else{ toast.error(res.payload) }
      
    })
    .catch((err) => console.log(err))
    
  }
  

  return (
    <section>
      <div className="container">
        <div className="flex items-center flex-col">
          <h2 className="text-left text-[24px] font-[600] text-gray-600 pb-4">Create An <span className=' text-blue-600'>Account</span></h2>
          <div className="flex flex-col items-center mx-auto">
            <Formik
              onSubmit={registerMethod}
              initialValues={inititialValueRegister}
              validationSchema={registerSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
              }) => (
                <form className="flex flex-col items-center mx-auto" onSubmit={handleSubmit}>

                  
                    <div >                    
                        <div className='mb-1 flex flex-col'>
                          <label htmlFor="" className='text-left mb-2 text-[18px] font-[600]'>Name</label>
                          <TextField   className=" w-[400px]"
                            label='Name'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="name"
                            error={
                              Boolean(touched.name) && Boolean(errors.name)
                            }
                            helperText={touched.name && errors.name}
                          />
                        </div>

                        <div className='mb-1 flex flex-col'>
                          <label htmlFor="" className='text-left mb-2 text-[18px] font-[600]'>Email</label>
                          <TextField className=" w-[400px]"
                              label="Email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="email"
                              error={Boolean(touched.email) && Boolean(errors.email)}
                              helperText={touched.email && errors.email}
                              
                          />
                        </div>        
                    
                        <div className='mb-1 flex flex-col'>
                            <label htmlFor="" className='text-left mb-2 text-[18px] font-[600]'>Password</label>
                            <TextField className=" w-[400px]"
                                type='password'
                                label='Password'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="password"
                                error={Boolean(touched.password) && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                
                          />
                        </div>
                        
                        {/* <div className='mb-1 flex items-center justify-between'>
                         
                          
                          <div>
                            <label htmlFor="" className='text-left mb-2 text-[18px] font-[600]'>Gender</label>
                            <TextField 
                              className='w-[100px]'
                              variant="standard"
                              name="gender"
                              select
                              value={values.gender}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={Boolean(touched.gender) && Boolean(errors.gender)}
                              helperText={touched.gender && errors.gender}
                            >
                              {genders.map((item,index) => (
                                <MenuItem key={index} value={item}>
                                  {item}
                                </MenuItem>
                              ))}
                            </TextField>
                          </div>
                          
                        </div> */}

                        {/* <div className='mb-1 flex space-x-7'>
                          <h1 className='text-left mb-2 text-[18px] font-[600]'>Avatar</h1>
                          <input type='file' ref={imageRef} onChange={handleFileChange} hidden />
                          <img
                            onClick={() => imageRef.current.click()}
                            src={image}
                            alt='Avatar Preview'
                            className='w-[40px] h-[40px] rounded-full cursor-pointer'
                          />
                        </div> */}
                    
                  </div>

                  <div className='mt-4'>
                    <button type="submit" className="w-[400px] bg-red-500 flex items-center justify-center mx-auto text-white px-5 py-3 border rounded-md">
                      REGISTER
                    </button>
                    <div></div>
                    <h5 className='text-center text-blue-500 mt-2 hover:cursor-pointer'
                      onClick={() => {navigate('/login')}}
                    >
                        Already have an account? Login here.
                    </h5>
                    
                  </div>
                </form>
              )}
            </Formik>
            <div className='mt-2'>
              <OAuth />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
