'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getPostByBoardId } from '@/api/board';

import usePostModalStore from '@/stores/postModalStore';
import useUserStore from '@/stores/userStore';

import PostDeleteModal from '@/components/post/PostDeleteModal';
import PageTitle from '@/components/common/PageTitle';
import PostCountInfo from '@/components/common/PostCountInfo';
import Screws from '@/components/common/Screws';
import Comment from '@/components/post/Comment';
import CommentForm from '@/components/post/CommentForm';
import PostContent from '@/components/post/PostContent';
import DateAndControl from '@/components/post/DateAndControlSection';
import PostImage from '@/components/post/PostImage';
import PostProfile from '@/components/post/PostProfile';
import HashTags from '@/components/post/HashTags';
import CommentDeleteModal from '@/components/post/CommentDeleteModal';
import LoadingNotice from '@/components/common/LoadingNotice';
import ErrorMessage from '@/components/common/ErrorMessage';

import { CommentDataInfo, PostDataInfo } from '@/types/data';

interface PostProps {
  params: { id: string };
}

export default function Post({ params }: PostProps) {
  const router = useRouter();

  const boardId = params.id;

  const [comments, setComments] = useState<CommentDataInfo[]>();

  const { userId } = useUserStore();
  const { isOpen, type } = usePostModalStore();

  if (!userId) return router.push('/signin');

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<PostDataInfo>(
    ['post', boardId],
    () => getPostByBoardId(boardId),
    {
      enabled: !!userId,
    },
  );

  useEffect(() => {
    if (post?.comments) setComments(post?.comments);
  }, [post?.comments]);

  return (
    <main className="px-4 flex justify-center items-center pb-[60px]">
      <div className="relative w-full max-w-[720px] min-w-[328px] h-[780px] border-gradient rounded-xl">
        <div className="h-full px-5 py-5">
          <Screws />
          {isLoading && (
            <div className="w-full h-full flex justify-center items-center">
              <LoadingNotice isTransparent={true} />
            </div>
          )}
          {isError && (
            <div className="w-full h-full flex justify-center items-center">
              <ErrorMessage />
            </div>
          )}
          {post && (
            <div className="px-5 h-full flex flex-col max-[450px]:pl-2">
              <PageTitle text={post.title} className="mb-7 break-words" />

              <div className="relative w-full flex justify-between items-center mb-4">
                <PostProfile
                  displayName={post.displayName}
                  userId={post.accountId}
                  profileImageUrl={post.profileImageUrl}
                  grade="브론즈 가드너"
                  usage="post"
                />
                <DateAndControl
                  date={new Date(post.createAt)}
                  usage="post"
                  ownerId={String(post.accountId)}
                  targetId={String(post.boardId)}
                />
              </div>
              <div className=" h-full pr-5 flex flex-col overflow-y-scroll scrollbar">
                <div className="px-[1.875rem] py-[1.625rem] w-full bg-brown-10 border-2 border-brown-50 rounded-lg mb-8 common-drop-shadow ">
                  <PostImage src={post.boardImageUrl} />
                  <PostContent content={post.content} />
                  <HashTags hashTags={post.hashTags} />
                </div>
                <PostCountInfo
                  liked={post.liked}
                  likesNum={post.likeNum}
                  commentNum={comments?.length || 0}
                  usage="post"
                  boardId={post.boardId}
                  className="mb-3"
                />
                <CommentForm boardId={String(post.boardId)} />
                <ul>
                  {comments?.map((comment: CommentDataInfo) => (
                    <Comment
                      key={comment.commentId}
                      comment={comment}
                      boardId={String(post.boardId)}
                    />
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      {isOpen &&
        post &&
        (type === 'post' ? (
          <PostDeleteModal />
        ) : (
          <CommentDeleteModal boardId={String(post?.boardId)} />
        ))}
    </main>
  );
}
