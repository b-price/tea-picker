import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export default function ErrorAlert({show, handleClose, errorType, errorText}) {
  return (
    <Alert variant="danger" show={show} onClose={handleClose} dismissible>
      <Alert.Heading>Error: {errorType}</Alert.Heading>
      <p>
        {errorText}
      </p>
    </Alert>
  )
}
