import React,{useState, useEffect} from 'react'
import MovieCreationIcon from '@mui/icons-material/MovieCreation';

export default function Signup() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  useEffect(()=>{
    inputValidationInitialise()
  },[])

  function inputValidationInitialise (){
    let emailText:HTMLElement|null =document.getElementById('emailText')
      let passwordText:HTMLElement|null =document.getElementById('passwordText')
      let repeatPasswordText:HTMLElement|null =document.getElementById('repeatPasswordText')
      
      if(emailText)emailText.classList.add('hidden')
      if(passwordText)passwordText.classList.add('hidden')
      if(repeatPasswordText)repeatPasswordText.classList.add('hidden')
  }

  function emailFlag() {
    let emailInput:HTMLElement|null =document.getElementById('email')
    let emailText:HTMLElement|null =document.getElementById('emailText')
    
    if(!email){
      if(emailInput)emailInput.style.borderColor='red'
      if(emailText)emailText.innerText='Can\'t be empty'    
      if(emailText)emailText.classList.remove('hidden')
    }
    else if( !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      if(emailInput)emailInput.style.borderColor='red'
      if(emailText)emailText.innerText='Enter valid email'    
      if(emailText)emailText.classList.remove('hidden')      
    }
    else{
      if(emailInput)emailInput.style.borderColor='#5A698F'
      if(emailText)emailText.classList.add('hidden')      
    }
    
  }

  function passwordFlag() {
    let passwordInput:HTMLElement|null =document.getElementById('password')
    let passwordText:HTMLElement|null =document.getElementById('passwordText')

    if(!password){
      if(passwordInput)passwordInput.style.borderColor='red'
      if(passwordText)passwordText.classList.remove('hidden')
     }else{
      if(passwordInput)passwordInput.style.borderColor='#5A698F'
      if(passwordText)passwordText.classList.add('hidden')     
     }
  }

  function repeatPasswordFlag() {
    let repeatPasswordInput:HTMLElement|null =document.getElementById('repeatPassword')
    let repeatPasswordText:HTMLElement|null =document.getElementById('repeatPasswordText')
    
    if(!repeatPassword){
      if(repeatPasswordInput)repeatPasswordInput.style.borderColor='red'
      if(repeatPasswordText)repeatPasswordText.classList.remove('hidden')
    }else{
      if(repeatPasswordInput)repeatPasswordInput.style.borderColor='#5A698F'
      if(repeatPasswordText)repeatPasswordText.classList.add('hidden')      
    }
  }

  function inputValidation (){
    emailFlag()
    passwordFlag()
    repeatPasswordFlag()
  }




  return (
    <div className=' bg-teal-blue h-screen flex flex-col items-center gap-14 pt-12 tablet:gap-20'>
        <MovieCreationIcon htmlColor='red' fontSize='large'/>
        <div className=' text-white text-sm bg-light-teal-blue mx-auto p-6 min-w-[326px] rounded-lg tablet:min-w-[400px] tablet:rounded-xl'>
            <form className=' flex flex-col items-center gap-6'>
                <h1 className='text-3xl self-start'>Sign Up</h1>
                <div className=' w-full h-9'>
                  <input 
                    id='email'
                    type="email" 
                    placeholder='Email address'
                    onChange={(e)=>{
                      setEmail(e.target.value)
                    }} 
                    className=' w-full h-full bg-transparent border-solid border-grey border-b-2 outline-none pb-4 px-4 focus:border-white focus:caret-red hover:cursor-pointer' 
                  /> <div id='emailText' className=' relative left-[60%] mt-[-2.25rem] w-28 text-red'>Can't be empty</div>
                </div>
                <div className=' w-full h-9'>
                  <input 
                    id='password'
                    type="Password" 
                    placeholder='Password'
                    onChange={(e)=>{
                      setPassword(e.target.value)
                    }} 
                    className=' w-full h-full bg-transparent border-solid border-grey border-b-2 outline-none pb-4 px-4 focus:border-white focus:caret-red hover:cursor-pointer' 
                  /> <div id='passwordText' className=' relative left-[60%] mt-[-2.25rem] w-28 text-red'>Can't be empty</div>
                </div>
                <div className=' w-full h-9'>
                  <input 
                    id='repeatPassword'
                    type="Password" 
                    placeholder='Repeat Password' 
                    onChange={(e)=>{
                      setRepeatPassword(e.target.value)
                    }} 
                    className=' w-full h-full bg-transparent border-solid border-grey border-b-2 outline-none pb-4 px-4 focus:border-white focus:caret-red hover:cursor-pointer' 
                  /> <div id='repeatPasswordText' className=' relative left-[60%] mt-[-2.25rem] w-28 text-red'>Can't be empty</div>
                </div>
                <input 
                  type='submit' 
                  value='Create an account' 
                  onClick={(e)=>{
                    e.preventDefault()
                    inputValidation()
                 }}
                  className=' w-full h-12 mt-4 bg-red rounded-lg outline-none text-xl hover:bg-white hover:text-teal-blue hover:cursor-pointer'
                />
            </form>
            <div className=' mt-6'>
                Already have an account? <span className=' text-red'> Login</span>
            </div>
        </div>
    </div>
  )
}
