import React, { FC } from 'react';
import { IComment } from "@/interfaces";

interface CommentProps {
    comment: IComment;
}

const commentFields = [
    { key: 'name', label: 'Имя' },
    { key: 'email', label: 'Email' },
    { key: 'body', label: 'Текст' }
];

const Comment: FC<CommentProps> = ({ comment }) => {
    return (
        <div>
            {commentFields.map(field => (
                <div className={'comment_container'}
                     key={field.key}>
                    <label>{field.label}: </label>
                    <span>{comment[field.key as keyof IComment]}</span>
                </div>
            ))}
            <hr />
        </div>
    );
};

export default Comment;