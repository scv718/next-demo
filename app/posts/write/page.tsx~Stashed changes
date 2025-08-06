'use client';

import { useRouter } from 'next/navigation';

import PostForm from '@/components/page/PostForm';

import { useSession } from 'next-auth/react';

interface PostFormInput {
  title: string;
  content: string;
  postType: string;
  isSecret: boolean;
}

interface PostCreatePayload extends PostFormInput {
  authorEmail: string;
}

export default function WritePostPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleCreate = async (form: PostFormInput) => {
    if (!session?.user?.email) {
      alert('로그인이 필요합니다.');

      return;
    }

    const payload = {
      ...form,
      authorEmail: session.user.email
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
      alert('등록에 실패했습니다.');
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>게시글 작성</h1>
      <PostForm onSubmit={handleCreate} submitText='등록' />
    </div>
  );
}
