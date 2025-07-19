import { useState } from 'react';
import { loginUser } from '../api/auth';

const Login =()=>{
    const [form, setForm]=useState({
        email:"",
        password:""
    })
    const handleChange =(e)=>{
       setForm(prev => ({
  ...prev,
  [e.target.id]: e.target.value
     }));
}


    const handleSubmit =async(e)=>{
        e.preventDefault();
        const data = await loginUser(form);
        alert(data.message||data.error);
        setForm({
            email:'',
            password:''
        })
    }

    return (
        <div className ="contailer">
            <div className ="login">
                <form onSubmit={handleSubmit}>
                    <div className ="lgn-grp">
                        <label htmlFor="email">Email :</label>
                        <input id="email" type ="text" placeholder="Enter your email " value ={form.email} onChange={handleChange}/>
                    </div>
                    <div className ="lgn-grp">
                        <label htmlFor="password">Password :</label>
                        <input id="password" type ="password" placeholder="Enter your password " value ={form.password} onChange={handleChange}/>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}
export default  Login;