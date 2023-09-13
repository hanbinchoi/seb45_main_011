'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { getUserInfo } from '@/api/history';

import useUserStore from '@/stores/userStore';
import useHistoryStore from '@/stores/historyStore';

import useClient from '@/hooks/useClient';

import CommonButton from '../common/CommonButton';

interface HistoryUserProps {
  paramsId: string;
}

export default function UserInfo({ paramsId }: HistoryUserProps) {
  const isClient = useClient();
  const router = useRouter();

  const userId = '1';
  // const userId = useUserStore((state) => state.userId);
  const id = paramsId;

  const { setHistoryUser, profileImageUrl, displayName, grade, point } =
    useHistoryStore();
  const { isGoogleLogin, isLogin } = useUserStore();

  const profileImage = () => {
    if (!profileImageUrl) return '/assets/img/bg_default_profile.png';

    if (isLogin || isGoogleLogin) {
      return profileImageUrl;
    }

    return '/assets/img/bg_default_profile.png';
  };

  useEffect(() => {
    const getHistoryData = async () => {
      try {
        const response = await getUserInfo(id);

        setHistoryUser(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getHistoryData();
  }, [id]);

  return (
    <div className="flex flex-col justify-center items-center">
      {isClient && (
        <Image
          src={profileImage()}
          className="rounded-[50%] border-brown-50 border-[3px] mb-4 shadow-outer/down"
          width={100}
          height={100}
          alt="profile_img"
        />
      )}
      <div className="flex flex-col justify-center items-center mb-4 gap-2">
        <div className="text-2xl font-bold text-brown-80">{displayName}</div>
        <p className="font-bold text-brown-70">{grade}</p>
      </div>
      {userId === id ? (
        <div className="flex items-center justify-center gap-2 bg-[url('/assets/img/bg_board_sm.png')] w-[192px] h-[96px] shadow-outer/down mb-5">
          <img src="/assets/img/point.svg" />
          <p className="text-xl font-bold text-brown-10">
            {point.toLocaleString()}
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-center gap-3">
            <CommonButton
              type="button"
              size="lg"
              children="정원 구경하기"
              className="w-[203px] h-[52px]"
              onGoToGarden={() => router.push(`/garden/${id}`)}
            />
            <CommonButton
              type="button"
              size="lg"
              children="식물 카드 열람"
              className="w-[213px] h-[52px]"
              onGoToLeafs={() => router.push(`/leafs/${id}`)}
            />
          </div>
          <CommonButton
            type="button"
            size="lg"
            children="작성한 게시글"
            className="w-[203px] h-[52px] text-brown-50 border-brown-50 bg-[url('/assets/img/bg_wood_light.png')] mt-6 cursor-default"
          />
        </>
      )}
    </div>
  );
}
