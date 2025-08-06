'use client';

import { useState } from 'react';

interface PostFormProps {
  initialData?: {
    title: string;
    content: string;
    postType: string;
    isSecret: boolean;
  };
  onSubmit: (form: { title: string; content: string; postType: string; isSecret: boolean }) => void;
  submitText?: string;
}

export default function PostForm({ initialData, onSubmit, submitText = '등록' }: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');
  const [postType, setPostType] = useState(initialData?.postType ?? 'GENERAL');
  const [isSecret, setIsSecret] = useState(initialData?.isSecret ?? false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, postType, isSecret });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label className='block mb-1 font-medium'>제목</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full border p-2 rounded'
          required
        />
      </div>

      <div>
        <label className='block mb-1 font-medium'>내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='w-full border p-2 rounded h-40'
          required
        />
      </div>

      <div>
        <label className='block mb-1 font-medium'>게시판 타입</label>
        <select value={postType} onChange={(e) => setPostType(e.target.value)} className='w-full border p-2 rounded'>
          <option value='일반'>일반</option>
          <option value='QNA'>QnA</option>
          <option value='FAQ'>FAQ</option>
        </select>
      </div>

      <div className='flex items-center'>
        <input type='checkbox' checked={isSecret} onChange={(e) => setIsSecret(e.target.checked)} className='mr-2' />
        <label>비밀글로 작성</label>
      </div>

      <div className='flex justify-end gap-2'>
        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
          {submitText}
        </button>
      </div>
    </form>
  );
}
