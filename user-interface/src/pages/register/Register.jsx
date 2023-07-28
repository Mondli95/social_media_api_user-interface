import { Link } from 'react-router-dom';
import './register.scss';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {

    const [error, setError] = useState(null);
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: '',
        name: ''
    });

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8800/api/auth/register', inputs);
        } catch (err) {
            setError(err.response.data);
            console.log(error)
        }
    }

    return (
        <div className='register'>
            <div className="card">
                <div className="left">
                    <h1>Mondli social</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
                        ipsam itaque voluptas voluptates totam fuga recusandae doloribus
                        velit fugit, dolorem id optio odit rerum iusto cumque provident
                    </p>
                    <span>Do you have an account?</span>
                    <Link to={'/login'}>
                        <button>Login</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form>
                        <input type="text" placeholder='Username' name='username' onChange={handleChange} />
                        <input type="email" placeholder='Email' name='email' onChange={handleChange} />
                        <input type="password" placeholder='Password' name='password' onChange={handleChange} />
                        <input type="name" placeholder='Name' name='name' onChange={handleChange} />
                        <span style={{ color: 'red' }}>{error && error}</span>
                        <button onClick={handleClick}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
