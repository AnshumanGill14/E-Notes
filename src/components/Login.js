import React, { useState } from 'react'
import { json, useNavigate } from 'react-router-dom';


const Login = () => {
    let Navigate=useNavigate();
    const [credentials , setCredentials]=useState({email:"",password:""})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
              
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json= await response.json();
          console.log(json);
          if (json.success){
            localStorage.setItem('token', json.authtoken )
            Navigate("/");
          }
          else{
            alert("Invalid Credentials")
          }
    }

    const onChange=(e)=>{ 
        setCredentials({...credentials,[e.target.name]:e.target.value}) 
      } 
    return (
        <div className='h-100 d-flex align-items-center justify-content-center'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 my-4" >
                    <label htmlFor="email" className="form-label"><strong>Email address</strong></label>
                    <input type="email" className="form-control w-80" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3"><strong></strong>
                    <label htmlFor="password" className="form-label"><strong>Password</strong></label>
                    <input type="password" className="form-control w-80" id="password" name="password" value={credentials.password} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-dark">Submit</button>
            </form>
        </div>
    )
}

export default Login
