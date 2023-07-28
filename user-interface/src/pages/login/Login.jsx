import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { useContext, useState } from 'react';
import { AuthenticationContext } from '../../context/authenticationContext';

const Login = () => {
    const { login } = useContext(AuthenticationContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            login(inputs);
            navigate('/');
        } catch (err) {
            setError(err.response.data);
        }
    }

    return (
        <div className='login'>
            <div className="card">
                <div className="left">
                    <h1>Hello! Welcome</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
                        ipsam itaque voluptas voluptates totam fuga recusandae doloribus
                        velit fugit, dolorem id optio odit rerum iusto cumque provident
                    </p>
                    <span>Don't you have an account?</span>
                    <Link to={'/register'}>
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder='Username' name='username' onChange={handleChange} />
                        <input type="password" placeholder='Password' name='password' onChange={handleChange} />
                        <span style={{ color: 'red' }}>{error && error}</span>
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
