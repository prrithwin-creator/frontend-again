import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Login = () => {
  let navigate = useNavigate();
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  let [emailError, setEmailError] = useState('');
  let [passwordError, setPasswordError] = useState('');
  let[message,setMessage] = useState("")

  let handleEmailChange = e => {
    setEmail(e.target.value);
    setEmailError('');
  };
  let handlePasswordChange = e => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  let handleFormSubmit = e => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
      setEmailError('Email required');
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email');
    }
    if (!password) {
      setPasswordError('Password required');
    }

    if ( email && password) {
      axios.post('https://backend-again-1.onrender.com/login', {
          email: email,
          password: password
        }).then((data) => {
          console.log(data.data)

           if(typeof data.data == 'string') {
             setMessage(data.data);
           } else {
             localStorage.setItem('userInfo', JSON.stringify(data.data));
             navigate('/student');
           }
            
            
        })
    }


  };

 useEffect(() => {
   let data = localStorage.getItem('userInfo');
   if (data) {
     navigate('/student');
   }
 }, []);





  return (
    <div className="registration">
      <div className="imgholder">
        <img src="img/fci.png" alt="" />
        <h3>Feni Computer Institute</h3>
      </div>
      <Container>
        {message && <h1>{message}</h1>}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={handleEmailChange}
              type="email"
              placeholder="Enter email"
            />
            {emailError && (
              <Alert key="danger" variant="danger">
                {emailError}
              </Alert>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handlePasswordChange}
              type="password"
              placeholder=" Enter Password"
            />
            {passwordError && (
              <Alert key="danger" variant="danger">
                {passwordError}
              </Alert>
            )}
          </Form.Group>

          <Button onClick={handleFormSubmit} variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        <Alert key="danger" variant="danger">
          Don't have an account?<Link to="/">Registration</Link>
        </Alert>
      </Container>
    </div>
  );
};

export default Login;
