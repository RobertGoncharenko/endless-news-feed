import { useMemo } from "react";

export const useSortedPost = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    if (sort) {
       return [...posts].sort((a, b) =>
          a[sort].localeCompare(b[sort])
       );
    }
    return posts;
 }, [sort, posts]);
 return sortedPosts;
}

export const usePosts = (posts, sort, query) => {
  const sortedPosts = useSortedPost(posts,sort)
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
       post.title.toLowerCase().includes(query)
    );
 }, [query, sortedPosts]);
 return sortedAndSearchedPosts;
}