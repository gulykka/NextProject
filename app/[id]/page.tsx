"use client";
import React, { useEffect } from 'react';
import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux-hooks";
import DetailedPost from "@/components/layout/DetailedPost";
import Link from "next/link";
import Button from "@/components/UI/Button";

const Page = () => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const post = useAppSelector(state => state.posts.posts).find(post => post.id === Number(id));

    useEffect(() => {
        if (!post) {
            router.push('/');
        }
    }, [post, router]);

    if (!post) {
        return null;
    }

    return (
        <>
            <Button><Link style={{color: 'white', textDecoration: 'none'}} href={'/'}>Назад</Link></Button>
            <DetailedPost post={post} />
        </>
    );
};

export default Page;