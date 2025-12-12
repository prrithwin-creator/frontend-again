import Sidebar from '../components/Sidebar'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const Result = () => {
const [show, setShow] = useState(false);
const [studentList, setStudentList] = useState([]);
const [resultField, setResultField] = useState([]);
const [studentId, setStudentId] = useState("");
const [departmentName, setDepartmentName] = useState("");
const [resultList, setResultList] = useState([]);


const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

useEffect(()=>{
    axios.get("https://backend-again-d5wz.onrender.com/allstudent").then((data)=>{
      console.log(data)
      setStudentList(data.data)
    });
   }, []);

   let handleAddResult = ()=>(
    setResultField([...resultField,{subject:"", result:""}])
   )

   let handleDelete = (id)=>{
    let arr = resultField
    arr.splice(id, 1);
    setResultField([...arr])
   }

   
   let handleSubjectChange = (e,id)=>{
    resultField[id].subject = e.target.value
    console.log(resultField)
   }

   let handleResultChange = (e,id)=>{
    resultField[id].result = e.target.value
    console.log(resultField)
  }
  
  let handleSubmit = () => {
    axios.post("https://backend-again-d5wz.onrender.com/result",{
     "departmentname": departmentName,
      "studentid": studentId,
      "result": resultField
    }).then((data) => {
      console.log("lalalala",data)
    })
  }

 
useEffect(()=>{
axios.get("https://backend-again-d5wz.onrender.com/result").then((data)=>{
setResultList(data.data)
})
})



  return (
    <div className="main">
        <div className="left">
          <Sidebar/>
        </div>
        <div className="right">
           <>
      <Button variant="primary" onClick={handleShow}>
       Add a Result
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Label>Department</Form.Label>
              
        <Form.Control
          type="text"
          id="inputPassword5"
          aria-describedby="passwordHelpBlock"
         onChange={(e)=>setDepartmentName(e.target.value) }      
                
              />
           
        
              
      <br/>

      <Form.Select aria-label="Default select example"onChange={(e)=> setStudentId(e.target.value)} >
      <option>Select Student</option>
      {studentList.map(item=>(
        <option  value={item._id}>{item.studentname}</option>
      ))}</Form.Select>
  
       <Button onClick={handleAddResult}>Add Result</Button>
         {resultField.map((item,index)=>(
           <div style={{display:"flex"}}>
        <div className="left">
         <Form.Control
        type="text"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
          
        onChange={(e)=>handleSubjectChange(e,index)}
        
      />
        </div>
        <div className="right">
         <Form.Control
        type="text"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
         onChange={(e)=>handleResultChange(e,index)}
      />
        </div>
        <Button onClick={()=>handleDelete(index)} variant="danger">Delete</Button>
       </div>

         ))}
       

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
          Submit
          </Button>
        </Modal.Footer>
      </Modal>
        </>
        
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Student Name</th>
          <th>Department Name</th>
          <th>CGPA</th>
        </tr>
      </thead>
          <tbody>
          {resultList.map((item, index) => (
  <tr>
    <td>{index + 1}</td>
    <td>{item.studentid?.studentname}</td>
    <td>{item.departmentname}</td>
    <td>{item.cgpa}</td>
  </tr>
))}

        
      </tbody>
    </Table>
        </div>

    </div>
  )
}






export default Result