import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { Link } from 'react-router';





const PDF = () => {
  const [show, setShow] = useState(false);
  
  const [name, setStudentName] = useState('');
  const [departmentname, setDepartmentname] = useState('');
  const [writer, setWriter] = useState('');
  const [file,setFile] = useState('');
  const [serial, setSerial] = useState('');
  let [booklist, setBookslist] = useState([]);

  const handleClose = () => {
    console.log(file)
    axios.post("https://backend-again-1.onrender.com/uploadbook", {
      name:name,
      departmentname: departmentname,
      writer: writer,
      serial: serial,
      avatar:file
    },
      {
      headers: {
      'Content-Type': 'multipart/form-data',
    },
})
    
    
  } ;
  const handleShow = () => setShow(true);




let handleChange = (e) => {
 setFile(e.target.files[0])
}

useEffect(() => {
axios.get("https://backend-again-1.onrender.com/allbook").then((data) => {
setBookslist(data.data);
});
}, []);


  return (
    <div className='main'> 
      <div className='left'>
      <Sidebar/>
      </div>
      <div className='right'>
      <Button variant="primary" onClick={handleShow}>
          Add a Book
        </Button>

        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title> Add a Book</Modal.Title>
          </Modal.Header>

          <Modal.Body>
           
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='email'
                  placeholder="Enter email"
               />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Department Name</Form.Label>
                <Form.Control
                
                  type="email"
                  placeholder="Enter email"
                 
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Writer</Form.Label>
                <Form.Control
               
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
             <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Serial</Form.Label>
                <Form.Control
                
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
                 
             <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Upload</Form.Label>
                <Form.Control
                  
                  onChange={ handleChange }
                  type="file"
                  placeholder="Enter email"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
           
             
              <Button variant="primary" onClick={handleClose}
              >Create Student</Button>

            
          </Modal.Footer>
        </Modal>
       <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Department</th>
          <th>Serial</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
            {booklist.map((item,index) =>(
           <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td><Link to={`https://backend-again-1.onrender.com/${item.url}`}target='_blank'>Read</Link></td>
         
        </tr>
          
          ))}
       
       
      </tbody>
    </Table>  
      </div>
    </div>
  )
}

export default PDF
