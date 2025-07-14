import React, {FC} from 'react';
import {IComment} from "@/interfaces";
import Comment from "@/components/layout/Comment";

interface ICommentsListProps {
    comments: IComment[]
}

const CommentsList:FC<ICommentsListProps> = ({comments}) => {
    return (
        <div className={'comments_container'}>
            {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
        </div>
    );
};

export default CommentsList;