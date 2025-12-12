import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

const Teacher = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [teachername, setTeacherName] = useState('');
  const [departmentname, setDepartmentName] = useState('');
  const [teacherid, setTeacherid] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [teacherList, setTeacherList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [editId, setEditId] = useState("");

  // Create Teacher
  const handleClose = () => {
    setLoading(true);
    axios
      .post('https://backend-again-d5wz.onrender.com/createteacher', {
        teachername,
        departmentname,
        teacherid,
        phonenumber,
      })
      .then(() => {
        axios.get('https://backend-again-d5wz.onrender.com/allteacher').then((res) => {
          setTeacherList(res.data);
          setLoading(false);
          setShow(false);
        });
      });
  };

  // Update Teacher
  const handleUpdate = () => {
    setLoading(true);
    axios
      .patch(`https://backend-again-d5wz.onrender.com/teacher/${editId}`, {
        teachername,
        departmentname,
        teacherid,
        phonenumber,
      })
      .then(() => {
        axios.get('https://backend-again-d5wz.onrender.com/allteacher').then((res) => {
          setTeacherList(res.data);
          setLoading(false);
          setShow(false);
          setUpdate(false);
        });
      });
  };

  const handleCloseModal = () => {
    setShow(false);
    setUpdate(false);
  };

  const handleShow = () => {
    setTeacherName('');
    setDepartmentName('');
    setTeacherid('');
    setPhoneNumber('');
    setUpdate(false);
    setShow(true);
  };

  // Edit modal
  const handleShowModal = (id) => {
    setUpdate(true);
    setEditId(id);

    axios.get(`https://backend-again-d5wz.onrender.com/teacher/${id}`).then((res) => {
      const t = res.data[0];
      setTeacherName(t.teachername);
      setDepartmentName(t.departmentname);
      setTeacherid(t.teacherid);
      setPhoneNumber(t.phonenumber);
      setShow(true);
    });
  };

  // Login check
  useEffect(() => {
    const data = localStorage.getItem('userInfo');
    if (!data) {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch all teachers
  useEffect(() => {
    axios.get('https://backend-again-d5wz.onrender.com/allteacher').then((res) => {
      setTeacherList(res.data);
    });
  }, []);

  // Delete Teacher
  const handleDelete = (id) => {
    axios
      .post('https://backend-again-d5wz.onrender.com/deleteteacher', { id })
      .then(() => {
        axios.get('https://backend-again-d5wz.onrender.com/allteacher').then((res) => {
          setTeacherList(res.data);
        });
      });
  };

  return (
    <div className="main">
      <div className="left">
        <Sidebar />
      </div>

      <div className="right">
        <Button variant="primary" onClick={handleShow}>
          Add a Teacher
        </Button>

        <Modal show={show} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{update ? "Update Teacher" : "Add Teacher"}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Teacher Name</Form.Label>
                <Form.Control
                  value={teachername}
                  onChange={(e) => setTeacherName(e.target.value)}
                  type="text"
                  placeholder="Enter Name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Department Name</Form.Label>
                <Form.Control
                  value={departmentname}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  type="text"
                  placeholder="Enter Department"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Teacher ID</Form.Label>
                <Form.Control
                  value={teacherid}
                  onChange={(e) => setTeacherid(e.target.value)}
                  type="text"
                  placeholder="Enter Teacher ID"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  value={phonenumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="text"
                  placeholder="Enter Phone Number"
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button
              disabled={loading}
              variant="primary"
              onClick={update ? handleUpdate : handleClose}
            >
              {loading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : update ? (
                "Update Teacher"
              ) : (
                "Create Teacher"
              )}
            </Button>
          </Modal.Footer>
        </Modal>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Teacher Name</th>
              <th>Department</th>
              <th>Teacher ID</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {teacherList.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.teachername}</td>
                <td>{item.departmentname}</td>
                <td>{item.teacherid}</td>
                <td>{item.phonenumber}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleShowModal(item._id)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Teacher;
