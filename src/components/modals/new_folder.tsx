import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, { ChangeEvent } from 'react';
import { fetcher_post } from '@/utils/fetcher';


type Args = {
  onHide: () => void;
  show: boolean;
  parent_id: string;
}

type CreateFolderType = {
  title: string;
  parent_id: string;
  ctype: 'folder';
}

async function create_new_folder(title: string, parent_id: string) {
  let data: CreateFolderType = {
    'title': title,
    'parent_id': parent_id,
    'ctype': 'folder'
  };

  return fetcher_post<CreateFolderType>('/nodes/', data);
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

const NewFolderModal = ({show, onHide, parent_id}: Args) => {
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const handleTitleChanged = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.currentTarget.value;

    setTitle(value);
    setErrorMessage('');
    setIsEnabled(validate_title(value))
  }

  const handleSubmit = async () => {
    let response = await create_new_folder(title, parent_id);
    onHide();
  }

  const handleCancel = () => {
    setTitle('');
    setErrorMessage('');
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
          Create Folder
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label htmlFor="title">Folder Title</Form.Label>
        <Form.Control
          aria-describedby="new title"
          onChange={handleTitleChanged} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!isEnabled}>Create</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewFolderModal;