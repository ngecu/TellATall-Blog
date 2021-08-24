import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Button, Table,Form,} from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'

import Meta from '../../components/Meta'
import { LinkContainer } from 'react-router-bootstrap'
import {getTagsAction,createTagAction} from '../../actions/tagActions'

import Post from "../../components/Post";
import {deleteTag} from "../../actions/tagActions";



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TagScreen = ({history,match}) => {
    const [name, setName] = useState('')
    const [color, setColor] = useState('')

    const dispatch = useDispatch()
    const taglist = useSelector((state) => state.readTags)

    const { loadingReadTags, error, tags, page, pages } = taglist

    console.log("tags",tags)
    

    const tagCreate = useSelector((state) => state.tagCreate)
    
    useEffect(() => {
        dispatch(getTagsAction())

    },[dispatch] )

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteTag(id))
           
        }
    }

    const s = {
        name,color
    }

    const submitHandler = (e) => {
        e.preventDefault()
       dispatch(createTagAction(s))
       
       notify()
           
       setTimeout(() => { 
           history.push('/admin/taglist');
         }, 5000)
      }


      
    const notify = () => toast.success('🦄 Post Created Successfully,Redirecting', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    

    return (
        <>

<ToastContainer
        
        position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
        <Row>
            <Col>
            
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>TAG NAME</th>  
                    <th>TAG COLOR</th>
                    <th></th>
                </tr>
                </thead>
                {loadingReadTags ? (
                    <tbody>
                        <th></th>
                    <th></th>
        <Loader />
                    <th></th>
                    <th></th>
                    <th></th>
                    </tbody>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
                <tbody>
                {tags.map((tag) => (
                    <tr key={tag._id}>
                        <td>{tag._id}</td>
                        <td>{tag.name}</td>
                        <td>{tag.color}</td>

                        <td>
                        <LinkContainer to={`/admin/tag/${tag._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>

                        <LinkContainer to={`/post/${tag._id}`}>
                      <Button className='btn-sm' variant='light'>
                        View
                      </Button>
                    </LinkContainer>
                    
                            <Button
                                variant='danger'
                                className='btn-sm'
                                onClick={() => deleteHandler(tag._id)}
                            >
                                <i className='fas fa-trash'></i>
                            </Button>
                        </td>
                        <td>
                    
                  </td>
                    </tr>
                ))}
                </tbody>
      )}
            </Table>

 
            </Col>
            <Col>
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='color'>
              <Form.Label>Color</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Color'
                value={color}
                onChange={(e) => setColor(e.target.value)}
              ></Form.Control>
            </Form.Group>



            <Button type='submit' variant='primary'>
              Add
            </Button>
          </Form>
            </Col>
        </Row>
       </>
    )
}

export default TagScreen
