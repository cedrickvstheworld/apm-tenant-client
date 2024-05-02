import axios from "axios"
import { useState } from "react"
import { Container, Form, Button, InputGroup, Col, Row, ToastContainer, Toast } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [addressBefore, setAddressBefore] = useState('')
  const [contact, setContact] = useState('')
  const [password, setPassword] = useState('')
  const [showHide, setShowHide] = useState('show')
  const [passwordC, setPasswordC] = useState('')
  const [showHideC, setShowHideC] = useState('show')
  const [show, setShow] = useState(false);
  const [showAPIError, setShowAPIError] = useState(false);
  const [APIError, setAPIError] = useState('')

  const handleRegister = () => {
    const fields = [
      firstName,
      lastName,
      email,
      gender,
      addressBefore,
      contact,
      password,
      passwordC,
    ]
    for (const i in fields) {
      if (!fields[i] || !fields[i] === "") {
        setAPIError('incomplete form fields')
        setShowAPIError(true)
        return
      }
    }
    if (password !== passwordC) {
      setAPIError('Password confirmation entry does not match the password')
      setShowAPIError(true)
      return
    }
    const validPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!validPassword.test(password)) {
      setAPIError('Password must contain atleast 1 number, upper and lower case letters, special characters and must be minimum of 8 characters')
      setShowAPIError(true)
      return
    }
    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!validEmail.test(email.toLocaleLowerCase())) {
      setAPIError('Email Address is Invalid')
      setShowAPIError(true)
      return
    }
    const data = {
      firstName,
      lastName,
      email,
      gender,
      contact,
      addressBefore,
      password,
    }
    axios.post(`${process.env.REACT_APP_API_HOST}/tenants`, data, {
      headers: {
        access_token: localStorage.getItem('access_token'),
      },
    })
    .then((response) => {
      setFirstName('')
      setMiddleName('')
      setLastName('')
      setEmail('')
      setContact('')
      setGender('')
      setAddressBefore('')
      setPassword('')
      setPasswordC('')
      setShow(true)
    })
    .catch((error) => {
      setAPIError(error.response.data.message)
      setShowAPIError(true)
    })
  }
  return (
    <div className="Register">
      <Container>
        <h3 className="mb-3 mt-5">Tenant Registration</h3>
          <Form>
            <Row>
              <Col sm={12} md={6}>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control 
                    maxLength={300} 
                    value={firstName} onChange={e => setFirstName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="middleName">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control 
                    maxLength={300} 
                    value={middleName} onChange={e => setMiddleName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control 
                    maxLength={300} 
                    value={lastName} onChange={e => setLastName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    maxLength={100} 
                    value={email} onChange={e => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select 
                    value={gender}
                    as="select"
                    onChange={e => setGender(e.target.value)} 
                    aria-label="gender">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="Female">Female</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="addressBefore">
                  <Form.Label>Previous Address</Form.Label>
                  <Form.Control
                    maxLength={300} 
                    value={addressBefore} onChange={e => setAddressBefore(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="contact">
                  <Form.Label>Contact No.</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="basic-addon1">+63</InputGroup.Text>
                    <Form.Control
                      type="text"
                      maxLength={10} 
                      value={contact} 
                      onChange={e => {setContact(e.target.value.replace(/[^0-9]+/g, ''))}}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      maxLength={100}
                      type={showHide === 'show' ? 'password' : 'text'}
                      value={password} onChange={e => setPassword(e.target.value)}
                      aria-describedby="password"
                    />
                    <InputGroup.Text 
                      onClick={() => setShowHide(showHide === 'hide' ? 'show': 'hide')}
                      style={{cursor: 'pointer'}} 
                      id="password">{showHide}</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      maxLength={100}
                      type={showHideC === 'show' ? 'password' : 'text'}
                      value={passwordC} onChange={e => setPasswordC(e.target.value)}
                      aria-describedby="confirm-password"
                    />
                    <InputGroup.Text 
                      onClick={() => setShowHideC(showHideC === 'hide' ? 'show': 'hide')}
                      style={{cursor: 'pointer'}} 
                      id="confirm-password">{showHideC}</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <div>
                  <span className="text-primary">Note: password must pass the following criterias:</span> <br />
                  - minimum of 8 characters <br />
                  - has at least 1 special characters <br />
                  - has at least 1 number <br />
                  - has at least 1 uppercase and lowercase letters
                </div>
                <div className="d-flex justify-content-end mt-5">
                  <Button 
                    onClick={handleRegister} 
                    variant="success">
                    Register
                  </Button>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  Already have an account?&nbsp;<span
                    style={{cursor: 'pointer'}}
                    onClick={() => navigate('/')}
                    className="text-primary">Sign-in here</span>
                </div>
              </Col>
            </Row>
          </Form>
      </Container>
      <ToastContainer position='bottom-end' style={{position: 'fixed', padding: '20px'}}>
        <Toast bg="success" onClose={() => setShow(false)} show={show} delay={4000} autohide>
          <Toast.Header>
            <strong className="me-auto">Info</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Registration request submitted. Wait for apartment staff verification</Toast.Body>
        </Toast>
      </ToastContainer>
      <ToastContainer position='bottom-end' style={{position: 'fixed', padding: '20px'}}>
        <Toast bg="danger" onClose={() => setShowAPIError(false)} show={showAPIError} delay={4000} autohide>
          <Toast.Header>
            <strong className="me-auto">Alert!</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{APIError}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  )
}

export default Register