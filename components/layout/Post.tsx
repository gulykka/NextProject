import React, {FC} from 'react';
import {IPost} from "@/interfaces";
import Link from "next/link";

interface IPostProps {
    post: IPost
}

const Post: FC<IPostProps> = ({post}) => {
    return (
        <Link href={'/' + post.id.toString()} className={'post_container'}>
            <h3>{post.title}</h3>
            <span>{post.body}</span>
        </Link>
    );
};

export default Post;