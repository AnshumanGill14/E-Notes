import React,{useState} from 'react'
import { json, useNavigate } from 'react-router-dom';

const Signup = () => {
  let Navigate=useNavigate();
    const [details , setdetails]=useState({name:"", email:"",password:""})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
              
            },
            body: JSON.stringify({name:details.name, email:details.email,password:details.password})
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
        setdetails({...details,[e.target.name]:e.target.value}) 
      } 
  return (
    <div className='h-100 d-flex align-items-center justify-content-center'>
      <form onSubmit={handleSubmit}>
      <div className="mb-3 my-4" >
          <label htmlFor="name" className="form-label"><strong>Name</strong></label>
          <input type="text" className="form-control  " id="name" name="name" value={details.name} onChange={onChange} aria-describedby="emailHelp" />
        </div><strong></strong>
        <div className="mb-3">
          <label htmlFor="email" className="form-label"><strong>Email address</strong></label>
          <input type="email" className="form-control " id="email" name="email"value={details.email} onChange={onChange}  aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label"><strong>Password</strong></label>
          <input type="password" className="form-control " id="password" value={details.password}onChange={onChange}  name="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label"><strong>Confirm Password</strong></label>
          <input type="password" className="form-control " id="cpassword" value={details.cpassword} onChange={onChange} name="cpassword" />
        </div>
        
        <button type="submit" className="btn btn-dark">Submit</button>
      </form>
    </div>
  )
}

export default Signup
