import {useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Sidebar from '../components/Sidebar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios"
import Table from 'react-bootstrap/esm/Table';
import { useEffect } from 'react';



const Leave = () => {
    const [show, setShow] = useState(false);
    const [studentName, setStudentName] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [studentId, setStudentId] = useState("");
    const [LeaveList, setLeaveList] = useState([]);
  
  

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

let handleSubmit = ()=>{
  axios.post("https://backend-again-1.onrender.com/leave",{
    studentName: studentName,
    departmentName: departmentName,
    studentId: studentId
  }).then((data) => {
    console.log(data)
  })
  
  }
 

 useEffect(()=>{
axios.get("https://backend-again-1.onrender.com/leave").then((data)=> {
setLeaveList(data.data)
})

  }, [])
  




  return (
    <div className='main'>
      <div className='left'>
        <Sidebar/>
      </div>
      <div className='right'>
       <Button variant="primary" onClick={handleShow} className="me-2">
       Creat Leave
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement='bottom'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Leave</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e) => setStudentName(e.target.value)}>
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                 
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail"onChange={(e) => setDepartmentName(e.target.value)}>
                <Form.Label>Department Name</Form.Label>
                <Form.Control
               
                  type="email"
                  placeholder="Enter email"
                
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail"onChange={(e) => setStudentId(e.target.value)}>
                <Form.Label>Student ID</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"/>
              </Form.Group>
             
            </Form>
            <Button type='submit'onClick={handleSubmit}>Submit Leave</Button>
        </Offcanvas.Body>
        </Offcanvas>
         {/* table */}
        <Table striped bordered hover variant="">
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Department</th>
              <th>Student Id</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {LeaveList.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.studentname}</td>
                <td>{item.departmentname}</td>
                <td>{item.studentid}</td>
                <td>{item.total}</td>
                <td>
                 <Button
                variant="primary"
                   
                    >
                Edit
            </Button>
            <Button
            variant="danger"
            >
                Delete
              </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    </div>
    </div >
  );
};

export default Leave;