import React from 'react'
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import { Link } from 'react-router-dom';
export default function Signup() {
  return (
    <div>
        <MovieCreationIcon htmlColor='red'/>
        <div>
            <div>
                <input type="Email address" />
                <input type="Password" />
                <input type="Repeat Password" />
                <button>Create an account</button>
            </div>
            <div>
                Already have an account? 
            </div>
        </div>
    </div>
  )
}
