import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Add = (props) => {
    const [show, setShow] = useState(false);
    const { renderr, setRenderr } = props.onRndr;

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const addBlog = (e) => {
        e.preventDefault()
        setRenderr(true)
        let today = new Date().toISOString().slice(0, 10)
        fetch(`http://54.255.88.203:3020/createblog`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "blog_header": e.target[0].value,
                    "blog_text": e.target[1].value,
                    "created_date": today,
                }
            )
        })
            .then(res => res.json())
            .then(() => {
                handleClose()
            })
            .finally(() => {
                setRenderr(!renderr)
            })
    }

    return (
        <>
            <Button className='add' onClick={handleShow}>
                + Add Post
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton> <h2 style={{ width: "calc(100% - 32px)", textAlign: "center" }}>Add Post</h2> </Modal.Header>
                <Modal.Body>
                    <Form className='form' onSubmit={addBlog}>
                        <Form.Group className='mb-3'>
                            <Form.Control type="text" placeholder="Text" />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control style={{height: '200px'}} as="textarea" type="text" placeholder="Description" />
                        </Form.Group>
                        <Button variant='outline-secondary' style={{marginRight: "55%"}} className='mb-3' onClick={handleClose}>Cancel</Button>
                        <Button className='mb-3' type='submit'>+ Create Post</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Add;