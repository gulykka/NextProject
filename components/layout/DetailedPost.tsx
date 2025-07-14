import React, {FC} from 'react';
import {IPost} from "@/interfaces";
import CommentsList from "@/components/layout/CommentsList";

interface IPostProps {
    post: IPost
}

const DetailedPost: FC<IPostProps> = ({post}) => {
    return (
        <div className={'detailed_post_container'}>
            <h1>{post?.title}</h1>
            <span>{post.body}</span>
            <h3>Комментарии:</h3>
            <CommentsList comments={post.comments}/>
        </div>
    );
};

export default DetailedPost;