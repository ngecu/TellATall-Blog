import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Card} from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'

import Meta from '../../components/Meta'
import { LinkContainer } from 'react-router-bootstrap'
import {getPostsAction} from '../../actions/postActions'

import Post from "../../components/Post";

const HomeScreen = ({history,match}) => {

    const dispatch = useDispatch()
    const postlist = useSelector((state) => state.readPosts)

    const { loading, error, posts, page, pages } = postlist

    console.log("posts",posts)
    useEffect(() => {
        dispatch(getPostsAction())

    },[dispatch] )
    return (
        <>
            <div className="container">
                <div className="mainheading">
                    <h1 className="sitetitle">TECH MINDSET AFRICA LTD</h1>
                    <p className="lead">
                        World Class AI Consultancy institution
                    </p>
                </div>
            <section className="recent-posts">
                    <div className="section-title">
                        <h2><span>All Stories</span></h2>
                    </div>



                    <div className="card-columns listrecent">
                        {posts.map((post) => (

                                <Post post={post}  />



                        ))}


                    </div>
                </section>




            </div>




        </>
    )
}

export default HomeScreen
