import React from 'react'
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import { Link } from 'react-router-dom';
export default function Signup() {
  return (
    <div className=' bg-teal-blue h-screen flex flex-col items-center gap-14 pt-12'>
        <MovieCreationIcon htmlColor='red' fontSize='large'/>
        <div className=' text-white bg-light-teal-blue p-6 min-w-[326px] rounded-lg'>
            <form className=' flex flex-col items-center gap-6'>
                <h1 className='text-3xl self-start'>Sign Up</h1>
                <input type="email" placeholder='Email address' className=' w-full h-9 bg-transparent border-solid border-grey border-b-2 outline-none pb-4' />
                <input type="Password" placeholder='Password' className=' w-full h-9 bg-transparent border-solid border-grey border-b-2 outline-none pb-4' />
                <input type="Password" placeholder='Repeat Password' className=' w-full h-9 bg-transparent border-solid border-grey border-b-2 outline-none pb-4' />
                <input type='submit' value='Create an account' className=' w-full h-12 mt-4 bg-red rounded-lg outline-none text-xl'/>
            </form>
            <div className=' mt-6'>
                Already have an account? 
            </div>
        </div>
    </div>
  )
}
