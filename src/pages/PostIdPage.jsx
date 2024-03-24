import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';

const PostIdPage = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const params = useParams();
  const [fetchPostById, isLoading, error] = useFetching( async(id) => {
    const response = await PostService.getById(id)
    setPost(response.data)
  });
  const [fetchComments, isCommentLoading, commentError] = useFetching( async(id) => {
    const response = await PostService.getCommentsByPostId(id)
    setComments(response.data)
  });

  useEffect( () => {
    fetchPostById(params.id)
    fetchComments(params.id)
  }, [])
  return (
    <div>
      <h1>
        Вы открыли страницу поста c ID: {params.id}
      </h1>
      {isLoading ? <Loader /> : <div>{post.id} {post.title}</div>}
      <h2>Comments</h2>
      {
      isLoading 
      ? 
        <Loader /> 
      : 
      <div>
        {comments.map((comment) => 
        <div key={comment.id} style={{marginTop: 10}}>
          <h5>{comment.email}</h5>
          <div>{comment.body}</div>
        </div>)}
      
      </div>
      }

    </div>
  );
};

export default PostIdPage;