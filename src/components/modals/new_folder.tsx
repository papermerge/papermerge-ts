import { FormEvent, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, { ChangeEvent } from 'react';


type Args = {
  onHide: () => void;
  show: boolean;
}

function validate_title(value: string): boolean {
  if (!value) {
    return false;
  }

  if (!value.trim()) {
    return false;
  }

  return true;
}

const NewFolderModal = ({show, onHide}: Args) => {
  const [new_title, setNewTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const handleTitleChanged = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.currentTarget.value;

    setNewTitle(value);
    setErrorMessage('');
    setIsEnabled(validate_title(value))
  }

  const handleSubmit = (event: FormEvent) => {
    console.log(`Form submitted ${new_title}`);
    onHide();
  }

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      animation={false}>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          New Folder
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label htmlFor="title">Title</Form.Label>
        <Form.Control
          aria-describedby="new title"
          onChange={handleTitleChanged} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit} disabled={!isEnabled}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewFolderModal;