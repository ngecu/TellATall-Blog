import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Button, Table} from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'

import Meta from '../../components/Meta'
import { LinkContainer } from 'react-router-bootstrap'
import {getPostsAction} from '../../actions/postActions'

import Post from "../../components/Post";
import {deletePost} from "../../actions/postActions";

const HomeScreen = ({history,match}) => {

    const dispatch = useDispatch()
    const postlist = useSelector((state) => state.readPosts)

    const { loadingReadPosts, error, posts, page, pages } = postlist

    console.log("posts",posts)
    useEffect(() => {
        dispatch(getPostsAction())

    },[dispatch] )

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deletePost(id))
           
        }
    }

    return (
        <>

            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>AUTHOR</th>
                    <th>DATE</th>
                    <th></th>
                </tr>
                </thead>
                {loadingReadPosts ? (
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
                {posts.map((post) => (
                    <tr key={post._id}>
                        <td>{post._id}</td>
                        <td>{post.title}</td>
                        <td>{post.author.name}</td>
                        <td>{post.createdAt.substring(0, 10)}</td>

                        <td>
                        <LinkContainer to={`/post/${post._id}`}>
                      <Button className='btn-sm' variant='light'>
                        View
                      </Button>
                    </LinkContainer>
                    
                            <Button
                                variant='danger'
                                className='btn-sm'
                                onClick={() => deleteHandler(post._id)}
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

        </>
    )
}

export default HomeScreen
