import axios from "axios";
import { useState } from "react";
import { Button, Container, Form, Toast, ToastContainer } from "react-bootstrap";

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [APIError, setAPIError] = useState('')
  const [show, setShow] = useState(false);
  const [showAPIError, setShowAPIError] = useState(false);

  const handleSubmit = () => {
    if (!email) {
      setAPIError('Provide Email Address')
      setShowAPIError(true)
      return
    }
    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!validEmail.test(email.toLocaleLowerCase())) {
      setAPIError('Email Address is Invalid')
      setShowAPIError(true)
      return
    }
    axios.post(
      `${process.env.REACT_APP_API_HOST}/tenants/forgot-password`,
      { email }
    )
      .then((response) => {
        setShow(true)
      })
      .catch((error) => {
        setAPIError(error.response.data.message)
        setShowAPIError(true)
      })
  }

  return (
    <div className="ForgotPassword">
      <Container
        style={{display: 'grid', justifyContent: 'center'}}
      >
        <div>
          <div className="mt-5 mb-3">
            Steps for resetting password will be sent to your <br /> email if registered
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                maxLength={100}
                placeholder="Email Address"
                value={email} onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button 
                onClick={handleSubmit} 
                variant="primary">
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
          <Toast.Body className="text-white">Mail sent to your email address</Toast.Body>
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

export default ForgotPassword;