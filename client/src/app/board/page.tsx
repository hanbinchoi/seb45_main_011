'use client';

import { useRouter } from 'next/navigation';

import useUserStore from '@/stores/userStore';

import BoardBanner from '@/components/board/BoardBanner';
import BoardSearchForm from '@/components/board/BoardSearchForm';
import RankBoard from '@/components/board/RankBoard';
import CommonButton from '@/components/common/CommonButton';
import PostList from '@/components/board/PostList';

export default function Board() {
  const router = useRouter();

  const userId = useUserStore((state) => state.userId);

  const navigateToAddPost = () => {
    if (userId !== null) return router.push('/post/add');
    return router.push('/signin');
  };

  return (
    <div className="pt-[120px] pb-[60px] px-4 flex flex-col gap-5 justify-center items-center max-[415px]:gap-4 max-[605px]:pt-[80px] ">
      <RankBoard />
      <BoardBanner />
      <div className="w-full min-w-[312px] max-w-[720px] h-[487px] border-gradient rounded-xl shadow-container">
        <div className="p-4 h-full flex flex-col gap-4">
          <div className="flex justify-between">
            <BoardSearchForm />
            <CommonButton
              type="button"
              size="sm"
              onClick={navigateToAddPost}
              className="hover:scale-105 transition-transform">
              글 쓰기
            </CommonButton>
          </div>
          <PostList />
        </div>
      </div>
    </div>
  );
}
