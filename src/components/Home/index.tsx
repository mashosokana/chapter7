import React,{ useState, useEffect } from "react";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";

type Post = {
  id: string;
  createdAt: number;
  categories: string[];
  title: string;
  content: string;
}

export const Home: React.FC = ( )=> {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

    useEffect (() => {
      const fetcher = async () => {
        try {
          const res = await fetch(
            "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts"
          );
          const data = await res.json();
          console.log("取得したデータ:",data);
          setPosts(data.posts);
        } catch (error) {
          console.error("記事一覧の取得に失敗しました", error);
        }
        setLoading(false);
      };
      fetcher();
    },[]);

    if (loading) {
      return<div>読み込み中...</div>;
    }
  return(
    <div>
      <ul className={classes.container}>
        {posts.map((post) => {
          return (
            <li key={post.id} className={classes.list}>
              <Link to={`/post/${post.id}`} className={classes.ling}>
                <div className={classes.post}>
                  <div className={classes.postContent}>
                    <div className={classes.postInfo}>
                      <div className={classes.postDate}>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                      <div className={classes.postCategories}>
                        {post.categories.map((category,id) => (
                            <p key={id} className={classes.postCategory}>
                              {category}
                            </p>
                        ))}
                      </div>
                    </div>
                    <p className={classes.postTitle}>{post.title}</p>
                    <div className={classes.postBody}
                    dangerouslySetInnerHTML={{__html:post.content}} />
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};