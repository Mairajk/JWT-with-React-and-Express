import { useState } from "react";
import axios from 'axios';



let baseURL = '';
if (window.location.href.split(':')[0] === 'http') {
    baseURL = 'http://localhost:5001'
};

const Main = () => {

    const [isLogin, setIsLogin] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastname] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupEmail, setSignupEmail] = useState('');

    const loginHandler = (e) => {
        e.preventDefault();

        axios.post(`${baseURL}/login`, {
            email: loginEmail,
            password: loginPassword
        })
            .then((res) => {
                console.log('response ===>', res);
                setIsLogin(true);
            })
            .catch((err) => {
                console.log('error ===>', err);
            })
    };


    const signupHandler = (e) => {
        e.preventDefault();

        axios.post(`${baseURL}/signup`, {
            firstName: firstName,
            lastName: lastName,
            email: signupEmail,
            password: signupPassword
        })
            .then((res) => {
                console.log('response ===>', res);
                console.log('Signup successfull');
                setIsSignup(false);
                setIsLogin(false);
            })
            .catch((err) => {
                console.log('error ===>', err);
            })
    };




    return (
        <div className="Main">

            {
                (isSignup) ?
                    <div className="signup">
                        <h1>Signup</h1>
                        <form action="" onSubmit={signupHandler}>

                            <input
                                type="text"
                                name="firstName"
                                required
                                placeholder="Enter your First name"
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                }}
                            />


                            <input
                                type="text"
                                name="lastName"
                                required
                                placeholder="Enter your last name"
                                onChange={(e) => {
                                    setLastname(e.target.value);
                                }}
                            />

                            <input
                                type="email"
                                name="email"
                                required placeholder="Enter your Email"
                                onChange={(e) => {
                                    setSignupEmail(e.target.value);
                                }}
                            />

                            <input
                                type="password"
                                name="password"
                                required
                                placeholder="Enter your password"
                                onChange={(e) => {
                                    setSignupPassword(e.target.value);
                                }}
                            />

                            <button type="submit">Signup</button>

                        </form>
                        <p> Already have an account</p>

                        <button
                            onClick={() => {
                                setIsSignup(false);
                                setIsLogin(false);
                            }}>Login</button>

                    </div>

                    :

                    (isLogin) ?
                        <h1>This is home</h1>
                        :
                        <div className="login">
                            <h1>Login</h1>
                            <form action="" onSubmit={loginHandler}>
                                <input
                                    type="email"
                                    required placeholder="Enter your Email"
                                    onChange={(e) => {
                                        setLoginEmail(e.target.value);
                                    }}
                                />

                                <input
                                    type="password"
                                    required
                                    placeholder="Enter your password"
                                    onChange={(e) => {
                                        setLoginPassword(e.target.value);
                                    }}
                                />


                                <button type="submit">Login</button>

                            </form>

                            <p> Create an account</p>

                            <button
                                onClick={() => {
                                    setIsSignup(true);
                                }}>Signup</button>

                        </div>


            }

        </div>
    )
};



export default Main; 