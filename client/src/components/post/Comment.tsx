import { useForm } from 'react-hook-form';

import usePostStore from '@/stores/postStore';

import useEditCommentMutation from '@/hooks/useEditCommentMutation';

import PostProfile from './PostProfile';
import DateAndControlSection from './DateAndControlSection';
import CommonButton from '../common/CommonButton';

import { CommentDataInfo } from '@/types/data';
import { CommentInputValue } from '@/types/common';

interface CommentProps {
  comment: CommentDataInfo | null;
  boardId: string | null;
}

export default function Comment({ comment, boardId }: CommentProps) {
  if (!comment || !boardId) return null;

  const { register, handleSubmit } = useForm<CommentInputValue>({
    defaultValues: {
      comment: comment.content,
    },
  });

  const { editMode, targetId, setEditMode } = usePostStore();

  const { mutate: editComment } = useEditCommentMutation({ boardId, targetId });

  const isEdit = editMode && String(comment.commentId) === targetId;

  const submitCommentForm = (data: CommentInputValue) => {
    editComment(data);
    setEditMode(false);
  };

  return (
    <li className="pl-[1.375rem] mb-8 max-[500px]:pl-0">
      <div className="flex justify-between mb-2 relative">
        <PostProfile
          userId={1}
          displayName={comment.displayName}
          grade="브론즈 가드너"
          profileImageUrl={comment.profileUrl}
          usage="comment"
        />
        {isEdit || (
          <DateAndControlSection
            date={new Date(comment?.createdAt)}
            usage="comment"
            ownerId={String(comment.accountId)}
            targetId={String(comment.commentId)}
          />
        )}
      </div>
      <div className="pl-11 max-[550px]:pl-0">
        {isEdit ? (
          <form onSubmit={handleSubmit(submitCommentForm)}>
            <input
              autoFocus={true}
              className="w-full px-[0.875rem] py-[0.75rem] bg-brown-10 border-2 border-brown-50 rounded-xl text-black-50 text-xs left-3 common-drop-shadow outline-none max-[500px]:py-[0.5rem]  max-[500px]:text-[0.5rem]"
              {...register('comment')}
            />
            {isEdit && (
              <div className="flex p-2 justify-end gap-2">
                <CommonButton size="sm" type="submit">
                  수정
                </CommonButton>
                <CommonButton
                  size="sm"
                  type="button"
                  onClick={() => setEditMode(false)}>
                  취소
                </CommonButton>
              </div>
            )}
          </form>
        ) : (
          <p className="w-full px-[0.875rem] py-[0.75rem] bg-brown-10 border-2 border-brown-50 rounded-xl text-black-50 text-xs left-3 common-drop-shadow max-[500px]:px-[0.6rem] max-[500px]:py-[0.5rem]  max-[500px]:text-[0.5rem]">
            {comment.content}
          </p>
        )}
      </div>
    </li>
  );
}
