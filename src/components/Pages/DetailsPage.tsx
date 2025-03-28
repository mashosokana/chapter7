import React,{ useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./Page.module.css";

type Post = {
  thumbnailUrl: string;
  createdAt: string;
  title: string;
  content: string;
  id: string;
  categories: string[];
}

type RouteParams = {
  id: string;
}

export const DetailsPage: React.FC = () => {
 
  const { id } = useParams<RouteParams>();
  console.log(id);
  const [post,setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
        const data = await res.json();
        console.log("取得した記事データ", data);
        setPost(data.post);
      } catch (error) {
        console.error("記事の詳細の取得に失敗しました",error);
      }
      setLoading(false);
    };

    fetcher();
  }, [id]);

  if  (loading) {
    return <div>読み込み中...</div>
  }

  if (!post) {
    return <div>記事が見つかりません</div>;
  }
  
  return (
    <div className={classes.container}>
      <div className={classes.post}>
        <div className={classes.postImage}>
          <img src={post.thumbnailUrl} alt="" />
        </div>
        <div className={classes.postContent}>
          <div className={classes.postInfo}>
            <div className={classes.postData}>
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
            <div className={classes.postCategories}>
              {post.categories.map((category) => {
                return (
                  <div key={category} className={classes.postCategory}>
                    {category}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={classes.postTitle}>{post.title}</div>
          <div
          className={classes.postBody}
          dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </div>
  );
};