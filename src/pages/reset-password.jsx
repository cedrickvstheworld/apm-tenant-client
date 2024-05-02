import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button, Container, Form, Toast, ToastContainer, InputGroup } from "react-bootstrap";
import axios from "axios";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [token] = useState(searchParams.get("token"))
  const [password, setPassword] = useState('')
  const [showHide, setShowHide] = useState('show')
  const [passwordC, setPasswordC] = useState('')
  const [showHideC, setShowHideC] = useState('show')

  const [show, setShow] = useState(false);
  const [showAPIError, setShowAPIError] = useState(false);
  const [APIError, setAPIError] = useState('')

  const handleSubmit = () => {
    const fields = [
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
    axios.patch(
      `${process.env.REACT_APP_API_HOST}/tenants/reset-password`,
      { newPassword: password, token }
    )
      .then((response) => {
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
    <div className="ResetPassword">
      <Container
        style={{display: 'grid', justifyContent: 'center'}}
      >
        <div className="mt-5">
          <Form>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
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
              <Form.Label>Confirm New Password</Form.Label>
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
            <div className="d-flex justify-content-end mt-3">
              <Button 
                onClick={handleSubmit} 
                variant="success">
                Proceed
              </Button>
            </div>
          </Form>
        </div>
      </Container>
      <ToastContainer position='bottom-end' style={{position: 'fixed', padding: '20px'}}>
        <Toast bg="success" onClose={() => setShow(false)} show={show} delay={4000} autohide>
          <Toast.Header>
            <strong className="me-auto">Info</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Reset Password Successful</Toast.Body>
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

export default ResetPassword;