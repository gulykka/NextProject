import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "@/store/store";
import {IComment, IPost} from "@/interfaces";

interface IPostState {
    posts: IPost[];
    error: string | null;
    count: number | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

interface IArg {
    search?: string;
    limit?: number;
    page?: number;
}

export const fetchGetPosts = createAsyncThunk<IPost[], IArg, { state: RootState }>(
    'posts/fetchGetPosts',
    async (arg: IArg | null, {rejectWithValue, dispatch}) => {
        try {
            const url = new URL('https://jsonplaceholder.typicode.com/posts');

            if (arg?.search) {
                url.searchParams.append('q', arg.search);
            }
            if (arg?.limit) {
                url.searchParams.append('_start', (arg.limit*10).toString());
                url.searchParams.append('_limit', (10).toString());

                if (arg?.page) {
                    url.searchParams.append('_page', arg.page.toString());
                }
            }

            console.log('Final URL:', url.toString());

            const [postsResponse, commentsResponse] = await Promise.all([
                fetch(url.toString()),
                fetch('https://jsonplaceholder.typicode.com/comments')
            ]);

            if (!postsResponse.ok || !commentsResponse.ok) {
                throw new Error('Failed to fetch data');
            }

            const [posts, comments] = await Promise.all([
                await postsResponse.json() as Promise<IPost[]>,
                await commentsResponse.json() as Promise<IComment[]>
            ]);

            return posts.map(post => ({
                ...post,
                comments: comments.filter(comment => comment.postId === post.id)
            }));

        } catch (e) {
            return rejectWithValue(e instanceof Error ? e.message : 'Unknown error');
        }
    }
);


const initialState: IPostState = {
    posts: [],
    error: null,
    count: null,
    status: 'idle'
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setCount(state, action) {
            state.count = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetPosts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchGetPosts.fulfilled, (state, action: PayloadAction<IPost[]>) => {
                state.status = 'succeeded';
                state.posts = action.payload;
                state.error = null;
            })
            .addCase(fetchGetPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    }
});

export const {searchPost, clearSearch, setCount} = postSlice.actions;
export const postReducer = postSlice.reducer;