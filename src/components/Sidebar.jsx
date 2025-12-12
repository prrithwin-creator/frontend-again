import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';


const Sidebar = () => {



  let navigate = useNavigate(); 
   console.log('hello');
  let handleLogout = () => {
    localStorage.removeItem('userInfo');
      navigate('/login');
  }





  return (
    <div className="sidebar">
      <div className="imgholder">
        <img src="img/fci.png" alt="" />
        <h5>Feni Computer Institute</h5>
      </div>
      <ListGroup>
        <ListGroup.Item>
          <Link to={'/teacher'}>Teacher</Link>
        </ListGroup.Item>

        <ListGroup.Item>
          <Link to={'/student'}>Student</Link>
        </ListGroup.Item>
        <ListGroup.Item><Link to={"/pdf"}>PDF</Link></ListGroup.Item>
         <ListGroup.Item><Link to={'/payment'}>Payment</Link></ListGroup.Item>
        <ListGroup.Item><Link to={'/leave'}>Leave</Link></ListGroup.Item>
       <ListGroup.Item><Link to={"/result"}>Result</Link></ListGroup.Item>
      </ListGroup>
      <Button variant="danger" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );
};

export default Sidebar;
