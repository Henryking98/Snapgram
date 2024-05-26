// import React, { useState, useEffect } from "react";
// import {useGetCurrentUser, useDeleteCommentedPost, useCommentPost} from "@/lib/react-query/queriesAndMutations";

import { useUserContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import { PostCardProps } from "@/types";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Models } from "appwrite";
// import Loader from "./Loader";

const PostCard = ({ post }: PostCardProps) => {
	//const { mutate: commentPost, isPending: isCommentingPost } = useCommentPost();
	// const { mutate: deleteCommentedPost, isPending: isDeletingCommentedPost } = useDeleteCommentedPost();
    // const [isComment, setIsComment] = useState("");
    // const [addingComment, setAddingComment] = useState(false);
	// const { mutate: commentPost, isPending: isCommenting } = useCommentPost();

	const { user } = useUserContext();

    //const { data: currentUser } = useGetCurrentUser();

    // const commentedPostRecord = currentUser?.comment.find((record: Models.Document) => record.post?.$id === post?.$id)

	// useEffect(() => {
    //   setAddingComment(!!commentedPostRecord);
    // }, [commentedPostRecord]);


// 	const handleAddComment = () => {
//     if (isComment.trim() === "") return; 

//     if (commentedPostRecord) {
//       // If the user already commented, delete the comment
//       deleteCommentedPost(commentedPostRecord.$id);
//     } else {
//       // Otherwise, add the comment
//       commentPost({ postId: post?.$id || "", userId });
// 	  console.log(commentPost)
//     }

//     setIsComment(""); // Clear the comment text input after adding/deleting the comment
//     setAddingComment(false); // Set adding comment state to false
//   };
    
    if (!post.creator) return;

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post?.creator?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {multiFormatDateString(post.$createdAt)}
              </p>
              -
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}
        >
          <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
        </Link>
      </div>
      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string) => (
              <li key={tag} className="text-light-3">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img
          src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="post image"
          className="post-card_img"
        />
      </Link>

      <PostStats post={post} userId={user.id} />

      <div className="flex mt-5 relative">
        <Link to={`/profile/${user.id}`} className="mr-3">
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="h-10 w-10 rounded-full"
          />
        </Link>
        <div className="flex flex-1 bg-[#101012] rounded-lg">
          <Input
            type="text"
            className="shad-input_2"
            placeholder="Write your comment..."
            // value={isComment}
            // onChange={(e) => setIsComment(e.target.value)}
          />
          <Button type="button" className="btn-send flex flex-end">
            <img
              src="/assets/icons/send.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
