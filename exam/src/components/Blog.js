import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import Add from './Add';

const Blog = () => {
    const [blog, setBlog] = useState([]);
    const [remove, setRemove] = useState(false);
    const [renderr, setRenderr] = useState(false);

    useEffect(() => {

        fetch("http://54.255.88.203:3020/getblogs", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                setBlog(res.data)
            })
    }, [[remove], renderr])

    const deleteBlog = (id) => {
        setRemove(true)
        fetch(`http://54.255.88.203:3020/deleteblog/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify()
        })
            .then(res => res.json())
            .then(() => {
                setRemove(false)
            })
    }

    return (
        <>
            <h1>MY BLOG POSTS</h1>
            <Add onRndr={{renderr, setRenderr}}/>
            <div className='blog'>
                {
                    blog.map((data, i) =>
                        <>
                            <Card className='card border-0' key={i}>
                                <div className='img'>
                                    <Card.Img variant="top" src="/img/img1.jpeg" />
                                    <Button className='delete' variant='light' onClick={() => { deleteBlog(data._id) }}><b>Delete Post</b></Button>
                                </div>
                                <Card.Body>
                                    <p className='p'>{data.created_date.slice(0, 10)}</p>
                                    <Card.Title>{data.blog_header}</Card.Title>
                                    <Card.Text>
                                        {data.blog_text}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <hr />
                        </>

                    )
                }
            </div>
        </>
    )
}

export default Blog;