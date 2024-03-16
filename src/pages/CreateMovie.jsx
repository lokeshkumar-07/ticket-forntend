import { PermMedia } from '@mui/icons-material'
import { Button, MenuItem, TextField, TextareaAutosize } from '@mui/material'
import { Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import * as yup from 'yup'
import { app } from '../firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { createmovie } from '../features/movieSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'


const CreateMovie = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const genres = ['Horror','Sci-Fy','Comedy','Thriller','Romantic', 'Fantasy', 'Musical' , 'Animation', 'Drama', 'Family', 'Action']

    const languages = [ 'Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Japnese', 'Kannada', 'Malayalam', 'Spanish']

    const [selectedLanguages, setSelectedLanguages] = useState(['Hindi'])
    const [selectedGenre, setSelectedGenre] = useState(['Action'])

    console.log(selectedGenre)

    const category = ["U", "U/A", "A"]

    const schema = yup.object().shape({
        title: yup.string().required('Required'),
        genre: yup.string().required('Required'),
        description: yup.string().required('Required'),
        language: yup.string().required('Required'),
        category: yup.string().required('Required'),
        release_year: yup.string().required('Required')
    })
    
    const initialValues= {
        title: "",
        genre: "Horror",
        description: "",
        release_year: 2024,
        language: "Hindi",
        category: "U/A"
    }
    
    const handleSubmitForm = async (values, onSubmitProps) => {
        setLoading(true)
        const formData = new FormData();
        formData.append('title', values.title);
        // Append each genre individually
        selectedGenre.forEach(genre => {
            formData.append('genre[]', genre);
        });
        selectedLanguages.forEach(lang => {
            formData.append('language[]', lang);
        });
        formData.append('description', values.description);
        formData.append('release_year', values.release_year);
        formData.append('category', values.category);
        formData.append('image', picture);
        console.log(selectedGenre);
        console.log(formData);
        await dispatch(createmovie(formData));
        setLoading(false)
        navigate('/')
    } 

    const imageRef = useRef(null);
    const [image, setImage] = useState(null);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [filePerc, setFilePerc] = useState(0);
    const [picture, setPicture] = useState(null);
    
    
    const handleFileChange = (e) => {
        console.log("changing")
        if (e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };
    
    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFilePerc(Math.round(progress));
            },
            (error) => {
            setFileUploadError(true);
            console.error(error);
            },
            () => {
            getDownloadURL(storageRef)
                .then((downloadURL) => {
                setPicture(downloadURL);
                })
                .catch((error) => {
                setFileUploadError(true);
                console.error(error);
                });
            }
        );
    };

    const setLanguageFilter = (value) => {
        if(selectedLanguages.includes(value)){
            if (selectedLanguages.length > 1) {
                setSelectedLanguages(selectedLanguages.filter((lang) => lang !== value));
            }
        }else{
            setSelectedLanguages([...selectedLanguages, value])
        }
    }
    
    const setGenreFilter = (value) => {
        if(selectedGenre.includes(value)){
            if(selectedGenre.length > 1){
                setSelectedGenre(selectedGenre.filter((item) => item !== value))
            }
        }else{
            setSelectedGenre([...selectedGenre, value])
        }
    }

    useEffect(() => {
        if (imageRef.current.files.length > 0) {
            handleFileUpload(imageRef.current.files[0]);
        }
    }, [image]);

  return (
    <div className='container'>
        {loading && <Loading />}
        <div className="flex flex-col items-center mx-auto">
            <h2 className="heading text-gray-600 text-center pb-4">Add A Movie</h2>
            <div className="flex mx-auto">
                <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={handleSubmitForm}
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
                                
                                <div className='mb-1 flex flex-col'>
                                    <label htmlFor="" className='text-left mb-2 text-[18px] font-[600]'>Movie Title</label>
                                    <TextField className=" w-[500px]"
                                    label="Title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="title"
                                    error={Boolean(touched.title) && Boolean(errors.title)}
                                    helperText={touched.title && errors.title}
                                        
                                    />
                                </div>  

                                


                                <div className='grid grid-cols-2 w-[500px] gap-2'>
                                    <div className='mb-1 flex flex-col'>
                                        <label htmlFor="" className='text-left mb-2 text-[18px] font-[600]'>Category</label>
                                        <TextField className=" "
                                        select
                                        value={values.category}
                                        label="Category"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="category"
                                        error={Boolean(touched.category) && Boolean(errors.category)}
                                        helperText={touched.category && errors.category}    
                                        >
                                            {category.map((item, index) => (
                                                <MenuItem key={index} value={item}>
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>

                                    

                                    <div className='mb-1 flex flex-col '>
                                        <label htmlFor="" className='text-left mb-2 text-[18px] font-[600]'>Release year</label>
                                        <TextField 
                                            inputProps={{ step: 1 }}
                                            type="number"
                                            name="release_year"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            label="Release Year"
                                            defaultValue={2024}
                                            fullWidth
                                            error={Boolean(touched.release_year) && Boolean(errors.release_year)}
                                            helperText={touched.release_year && errors.release_year}
                                        />
                                    </div>
                                </div>

                                <div className='flex flex-col w-[500px] gap-2'>
                                    <h1>Genre</h1>
                                    <div className='grid grid-cols-4 w-[500px] gap-2'>
                                        {genres.map((item, index) => (
                                            <div key={index}
                                                className={`box hover:cursor-pointer border border-red-500 p-2 text-center text-red-500 ${selectedGenre.includes(item) && 'bg-red-500 text-white'}`}
                                                onClick={() => setGenreFilter(item)}
                                            >
                                                <h1 className='text-sm'>{item}</h1>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            
                                {/* <div className='mb-1 flex flex-col'>
                                    <label htmlFor="" className='text-left mb-2 text-[18px] font-[600]'>Language</label>
                                    <TextField className="w-[300px]"
                                    select
                                    label="Language"
                                    value={values.language}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="language"
                                    error={Boolean(touched.language) && Boolean(errors.language)}
                                    helperText={touched.language && errors.language}
                                        
                                    >
                                        {languages.map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))}
                                    </TextField>
                                </div> */}

                                <div className='w-[500px] flex flex-col gap-2'>
                                    <h1>Language</h1>
                                    <div className='grid grid-cols-4 w-[500px] gap-2'>
                                        
                                        {languages.map((item, index) => (
                                            <div 
                                                className={`text-center hover:cursor-pointer box border border-red-500 p-2 ${selectedLanguages.includes(item) && 'bg-red-500 text-white'} text-red-500`} 
                                                key={index}
                                                onClick={() => setLanguageFilter(item)}
                                                >
                                                <h1 className="truncate text-sm">{item}</h1>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                

                                <div className='mb-1 flex flex-col'>
                                    <label htmlFor="" className='text-left mb-2 text-[18px] font-[600]'>Description</label>
                                    <TextField className=" w-[500px]"
                                    label="Description"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="description"
                                    multiline
                                    rows={3}
                                    error={Boolean(touched.description) && Boolean(errors.description)}
                                    helperText={touched.description && errors.description}
                                    />
                                </div>

                                <div className='my-2 text-left w-[500px] flex items-center space-x-7 '>
                                    <h1 className='text-left mb-2 text-[18px] font-[600]'>Image</h1>
                                    <input
                                        type='file'
                                        ref={imageRef}
                                        onChange={handleFileChange}
                                        style={{ position: 'absolute', left: '-9999px' }}
                                    />
                                    {!image && (<button
                                        onClick={() => imageRef.current.click()}
                                        className='text-white font-semibold upload-button rounded-full cursor-pointer px-5 py-2 bg-red-500' type="button"
                                    >
                                        Upload
                                    </button>)}
                                    {picture && <img
                                        onClick={() => imageRef.current.click()}
                                        src={picture}
                                        className='w-[60px] h-[60px] rounded-full cursor-pointer'
                                    />}
                                </div>

                                <div className='mt-4'>
                                    <button  type="submit" className="w-[500px] bg-blue-500 flex items-center justify-center text-white px-5 py-3 border rounded-md">
                                    Submit
                                    </button>
                                </div>

                            </form>
                        
                    )}
                </Formik>
            </div>
            
        </div>
        
      
    </div>
  )
}

export default CreateMovie
