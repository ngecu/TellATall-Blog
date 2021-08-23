import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Button, Table} from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'

import Meta from '../../components/Meta'
import { LinkContainer } from 'react-router-bootstrap'
import {getTagsAction} from '../../actions/tagActions'

import Post from "../../components/Post";
import {deleteTag} from "../../actions/tagActions";

const TagScreen = ({history,match}) => {

    const dispatch = useDispatch()
    const taglist = useSelector((state) => state.readTags)

    const { loadingReadTags, error, tags, page, pages } = taglist

    console.log("tags",tags)
    useEffect(() => {
        dispatch(getTagsAction())

    },[dispatch] )

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteTag(id))
           
        }
    }

    return (
        <>

            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>TAG NAME</th>
                    <th>COLOR</th>
                    <th>IMAGE</th>
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
                        <td>{tag.title}</td>
                        <td>{tag.author.name}</td>
                        <td>{tag.createdAt.substring(0, 10)}</td>

                        <td>
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

        </>
    )
}

export default TagScreen
