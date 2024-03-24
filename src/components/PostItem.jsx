import React from "react";
import Button from "./UI/button/Button";
import { useNavigate } from "react-router-dom";

const PostItem = (props) => {
   const navigate = useNavigate();

   const openPost = () => {
      return navigate(`/posts/${props.post.id}`);
   } 
   return (
      <div className="post">
         <div className="post__content">
            <strong>
               {props.post.id} {props.post.title}
            </strong>
            <div>{props.post.body}</div>
         </div>
         <div className="post__btns">
            <Button onClick={() => openPost()}>Открыть</Button>
            <Button onClick={() => props.remove(props.post)}>Удалить</Button>
         </div>
      </div>
   );
};

export default PostItem;
