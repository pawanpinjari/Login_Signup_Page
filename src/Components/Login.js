import React, { useState } from 'react';
import { useNavigate } from'react-router';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const history=useNavigate();
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [message, setMessage] = useState('');

   

    const handleLogin = async () => {
        alert(email+password+role)
        // try {
        //     const response = await axios.post('http://localhost:8000/login', { email, password, role });
        //     const token = response.data.token;
        //     setMessage(`Login successful. Token: ${token}`);
        // } catch (error) {
        //     setMessage('Invalid credentials');
        // }

        try{

            await axios.post("http://localhost:8000/login",{ email, password, role })
            .then(res=>{
                const data=res.data;
                console.log("data",data)
                if(res.data=="notexist"){
                    setMessage('Invalid credentials');
                }
                else if(res.data.user){
                    history("/home",{state:{user:data.user,role:data.role}})
           
                }
            })
            .catch(e=>{
                setMessage('Invalid credentials');
            })

        }
        catch(e){
            setMessage('Invalid credentials');
        }
    };

    return (
        <div className="container">
            <h1>Login Here</h1>
            <div className="form-group">
                <label>Email:</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Role:</label>
                <div className="radio-group">

                
                <span>
                    <input type="radio" id="user" name="role" value="user" checked={role === "user"} onChange={() => setRole("user")} />
                    <label htmlFor="user">User</label>
                </span>
                <span>
                    <input type="radio" id="admin" name="role" value="admin" checked={role === "admin"} onChange={() => setRole("admin")} />
                    <label htmlFor="admin">admin</label>
                </span>
                <span>
                    <input type="radio" id="client" name="role" value="client" checked={role === "client"} onChange={() => setRole("client")} />
                    <label htmlFor="client">client</label>
                </span>

                </div>
            </div>

            <div className="button-group">
                <button className="button" onClick={handleLogin}>Login</button>
                
            </div>
            <p className="message">{message}</p>
            <p>I have no account <a href="/signup">Signup Here</a></p>
        </div>
    )
}

export default Login
