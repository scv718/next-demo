'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';

export default function WritePostPage() {
  const router = useRouter();
  const { data: session } = useSession(); // ✅ 세션에서 로그인 정보

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('GENERAL');
  const [isSecret, setIsSecret] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      alert('로그인이 필요합니다.');

      return;
    }

    const payload = {
      title,
      content,
      authorEmail: '난 라곰이다옹',
      postType,
      isSecret
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert('게시글이 등록되었습니다.');
      router.push('/posts');
    } else {
      alert(JSON.stringify(session, null, 2));
      alert('등록에 실패했습니다.');
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>게시글 작성</h1>

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
            <option value='GENERAL'>일반</option>
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
            등록
          </button>
          <button
            type='button'
            onClick={() => router.push('/posts')}
            className='bg-gray-300 text-black px-4 py-2 rounded'>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
