'use client';

import { useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import PostForm from '@/components/page/PostForm';

import { useSession } from 'next-auth/react';

interface PostData {
  title: string;
  content: string;
  postType: string;
  isSecret: boolean;
  authorEmail: string;
}

export default function EditPostPage() {
  const { postId } = useParams(); // posts/[id]/edit 기준
  const router = useRouter();
  const { data: session } = useSession();

  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`);
      const data = await res.json();
      setPost(data.data);
    } catch (e) {
      alert('게시글을 불러오지 못했습니다.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleUpdate = async (form: Omit<PostData, 'authorEmail'>) => {
    if (session?.user?.email !== post?.authorEmail) {
      alert('수정 권한이 없습니다.');

      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form })
    });

    if (res.ok) {
      alert('수정 완료!');
      router.push(`/posts/${postId}`);
    } else {
      alert('수정 실패');
    }
  };

  if (loading) return <div className='p-4'>로딩 중...</div>;
  if (!post) return <div className='p-4'>게시글이 없습니다.</div>;

  return (
    <div className='max-w-2xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>게시글 수정</h1>
      <PostForm initialData={post} onSubmit={handleUpdate} submitText='수정' />
    </div>
  );
}
