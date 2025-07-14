"use client"
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/redux-hooks";
import {fetchGetPosts} from "@/store/slices/postSlice";
import PostsList from "@/components/layout/PostsList";
import {IPost} from "@/interfaces";
import './style.sass'
import Button from "@/components/UI/Button";

export default function Home() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.posts.status)
    const posts = useAppSelector(state => state.posts.posts)
    const count = Math.ceil(100 / 10)

    const [text, setText] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('searchText') || '';
        }
        return '';
    });

    const [limit, setLimit] = useState(() => {
        if (typeof window !== 'undefined') {
            return parseInt(localStorage.getItem('currentPage') || 0);
        }
        return 0;
    });

    const pageNumbers = Array.from({length: count}, (_, i) => i + 1);

    useEffect(() => {
        localStorage.setItem('searchText', text);
        localStorage.setItem('currentPage', limit.toString());
    }, [text, limit]);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchGetPosts({
                limit: limit,
                search: text.trim() || undefined
            }));
        }
    }, [dispatch, status, limit, text]);

    function search() {
        console.log(limit)
        dispatch(fetchGetPosts({
            search: text.trim(),
            limit: limit
        }));
    }

    function clear() {
        setText('');
        setLimit(0);
        dispatch(fetchGetPosts({limit: 0}));
    }

    return (
        <div className={'page_posts_container'}>
            {(status === 'loading' || status === null)
                ?
                <h3>LOADING...</h3>
                :
                <div className={'page_container'}>

                    <div className={'navbar'}>
                        <h2>Список постов</h2>
                        <div className={'panel_container'}>
                            <input
                                placeholder={'Поиск...'}
                                className={'search_input'}
                                value={text}
                                onChange={event => setText(event.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && search()}
                            />
                            <Button onClick={search}>Найти</Button>
                            <Button onClick={clear}>Сбросить</Button>
                        </div>
                    </div>

                    <PostsList posts={posts as IPost[]}/>

                    <div className={'paginate'}>
                        {pageNumbers.map(item =>
                            <Button
                                className={(limit === item) ? 'chosen_page' : ''}
                                onClick={() => setLimit(item)}
                                key={item}>
                                {item}
                            </Button>)}
                    </div>
                </div>
            }
        </div>
    );
}