import React, {FC} from 'react';
import Post from "@/components/layout/Post";
import {IPost} from "@/interfaces";
import './style.sass';
import Link from 'next/link'

interface IListPostsProps {
    posts: IPost[];
}

const PostsList: FC<IListPostsProps> = ({posts}) => {
    return (
        <div className="posts_container">
            {posts.length === 0 ? (
                <h3 style={{alignSelf: 'center'}}>Ничего не найдено</h3>
            ) : (
                posts.map((post) => (
                    <Post
                        key={post.id}
                        post={post}
                    />
                ))

            )}
        </div>
    );
};

export default PostsList;