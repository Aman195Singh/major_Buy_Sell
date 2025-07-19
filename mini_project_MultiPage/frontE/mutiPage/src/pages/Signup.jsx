import React,{ useState } from "react";
import {signupUser} from "../api/auth";

const Signup =()=>{
    const [form,setForm]=useState({
        name:"",
        email:"",
        phoneno:"",
        password:"",

    });

    
    const handleChange = (e) => {
       setForm(prev => ({
  ...prev,
  [e.target.id]: e.target.value
        }));
};


    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = await signupUser(form);
        alert(data.message||data.error);
        setForm({
        name:"",
        email:"",
        phoneno:"",
        password:"",
        });
    }
    return (
        
            <div className ="container">
                <div className="signup">
                    <form onSubmit={handleSubmit}>
                        <h2>Signup</h2>
                        <div className ="Sin-grp">
                            <label htmlFor="name">Name :</label>
                            <input id ="name" type ="text" placeholder="enter your name" value={form.name} onChange={handleChange}/>
                        </div>
                        <div className ="Sin-grp">
                            <label htmlFor="email">Email :</label>
                            <input id ="email" type ="text" placeholder="enter your email" value={form.email} onChange={handleChange}/>
                        </div>
                        <div className ="Sin-grp">
                            <label htmlFor="phoneno">Phone NO :</label>
                            <input id ="phoneno" type ="text" placeholder="enter your phoneno" value={form.phoneno} onChange={handleChange}/>
                        </div>
                        <div className ="Sin-grp">
                            <label htmlFor="password">Password :</label>
                            <input id ="password" type ="password" placeholder="enter your password" value={form.password} onChange={handleChange}/>
                        </div>

                        <button type="submit">Signup</button>
                    </form>
              </div>
            </div>
    )
}
export default Signup ;