'use client';

import { useForm } from 'react-hook-form';

import { updateUserPassword } from '@/api/profile';

import useSignModalStore from '@/stores/signModalStore';

import PasswordInput from '../common/PasswordInput';
import CommonButton from '../common/CommonButton';

import { InputValues } from '@/types/common';

type Token = {
  token: string;
};

export default function PasswordForm({ token }: Token) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<InputValues>();

  const changeState = useSignModalStore((state) => state.changeState);

  const presentPassword = watch('password');
  const changedPassword = watch('newPasswordCheck');

  const updatePassword = async () => {
    if (!presentPassword && !changedPassword) return;

    if (presentPassword === changedPassword) {
      alert('기존 비밀번호와 동일합니다. 새로운 비밀번호를 입력해 주세요.');
      return;
    }

    try {
      await updateUserPassword(presentPassword, changedPassword, token);

      reset();
      changeState('ChangePasswordModal');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(updatePassword)}
      className="relative w-fit flex flex-col justify-center items-center">
      <div className="w-fit flex max-[580px]:flex-col">
        <label
          htmlFor="password"
          className="text-[20px] text-brown-80 font-bold pt-2 pr-2 whitespace-nowrap max-[580px]:p-0 max-[580px]:pb-3">
          기존 비밀번호 :
        </label>
        <PasswordInput
          name="password"
          register={register}
          errors={errors}
          password={presentPassword}
          className="w-[244px] mr-14 max-[420px]:w-[200px]"
        />
      </div>
      <div className="w-fit flex max-[580px]:flex-col">
        <label
          htmlFor="newPassword"
          className="text-[20px] text-brown-80 font-bold pt-2 pr-2 whitespace-nowrap max-[580px]:p-0 max-[580px]:pb-3">
          새 비밀번호 :
        </label>
        <PasswordInput
          name="newPassword"
          register={register}
          errors={errors}
          className="w-[244px] mr-[38px] max-[580px]:mr-14 max-[420px]:w-[200px]"
        />
      </div>
      <div className="w-fit flex max-[580px]:flex-col">
        <label
          htmlFor="newPasswordCheck"
          className="text-[20px] text-brown-80 font-bold pt-2 pr-2 whitespace-nowrap max-[580px]:p-0 max-[580px]:pb-3">
          비밀번호 확인 :
        </label>
        <div className="flex">
          <PasswordInput
            name="newPasswordCheck"
            register={register}
            errors={errors}
            watch={watch}
            className="w-[244px] max-[420px]:w-[200px]"
          />
          <div className="mt-[2px]">
            <CommonButton
              type="submit"
              size="sm"
              className="w-[52px] h-8 ml-2 hover:scale-110 transition-transform">
              변경
            </CommonButton>
          </div>
        </div>
      </div>
    </form>
  );
}
