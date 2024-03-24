import { useEffect, useRef, useState } from "react";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import Button from "../components/UI/button/Button";
import Loader from "../components/UI/loader/Loader";
import { getPageCount } from "../components/utils/pages";
import Modal from "../components/UI/modal/Modal";
import Pagination from "../components/UI/pagination/Pagination";
import PostList from "../components/PostList";
import PostFilter from "../components/PostFilter";
import PostForm from "../components/PostForm";
import PostService from "../API/PostService";
import { useObserver } from "../hooks/useObserver";
import Select from "../components/UI/select/Select";

function Posts() {
   const [posts, setPosts] = useState([]);
   const [filter, setFilter] = useState({ sort: "", query: "" });
   const [modal, setModal] = useState(false);
   const [totalPages, setTotalPages] = useState(0);
   const [limit, setLimit] = useState(10);
   const [page, setPage] = useState(1);
   const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
   const lastElement = useRef();

   const [fetchPosts, isPostsLoading, postError] = useFetching(
      async (limit, page) => {
         const response = await PostService.getAll(limit, page);
         setPosts([...posts, ...response.data]);
         const totalCount = response.headers["x-total-count"];
         setTotalPages(getPageCount(totalCount, limit));
      }
   );

   useObserver(lastElement, page < totalPages, isPostsLoading, () => {
      setPage(page + 1);
   })

   useEffect(() => {
      fetchPosts(limit, page);
   }, [page, limit]);

   const createPost = (newPost) => {
      setPosts([...posts, newPost]);
      setModal(false);
   };

   const removePost = (post) => {
      setPosts(posts.filter((p) => p.id !== post.id));
   };

   const pageChange = (page) => {
      setPage(page);
   };

   return (
      <div className="App">
         <Button style={{ marginTop: "30px" }} onClick={() => setModal(true)}>
            Создать пост
         </Button>
         <Modal visible={modal} setVisible={setModal}>
            <PostForm create={createPost} />
         </Modal>
         <hr style={{ margin: "15px 0" }} />
         <PostFilter filter={filter} setFilter={setFilter} />
         <Select 
            value={limit}
            onChange={value => setLimit(value)}
            defaultValue={"Колличество элементов на странице"}
            options={[
               {value: 5, name: "5"},
               {value: 10, name: "10"},
               {value: 20, name: "20"},
               {value: -1, name: "All"},
            ]}
         />
         {postError && <h1>Упс, произошла ошибка: {postError}</h1>}
         {isPostsLoading && (
            <div
               style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "50px",
               }}
            >
               <Loader />
            </div>
         )}
         
            <PostList
               remove={removePost}
               posts={sortedAndSearchedPosts}
               title={"Список постов JS"}
            />
            
            
         <div ref={lastElement}></div>

         {/* <Pagination
            page={page}
            pageChange={pageChange}
            totalPages={totalPages}
         /> */}
      </div>
   );
}

export default Posts;
