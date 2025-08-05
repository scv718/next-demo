'use client';

import { useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

interface Post {
  id: number;
  title: string;
  content: string;
  postType: string;
  isSecret: boolean;
  viewCount: number;
  createdAt: string;
  authorName: string;
}

export default function PostDetailPage() {
  const { postId } = useParams();
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      console.log('postId:', postId);
      console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`);
      const data = await res.json();
      setPost(data.data); // 백엔드 ApiResponseDto<T> 형태라고 가정
    } catch (error) {
      console.error('게시글 조회 실패', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  if (loading) return <div className='p-4'>로딩 중...</div>;
  if (!post) return <div className='p-4'>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-2'>{post.title}</h1>
      <div className='text-gray-500 text-sm mb-4'>
        작성자: {post.authorName} | 작성일: {new Date(post.createdAt).toLocaleString('ko-KR')} | 조회수:{' '}
        {post.viewCount} | 타입: {post.postType}
        {post.isSecret && <span className='ml-2 text-red-500 font-semibold'>🔒 비밀글</span>}
      </div>

      <div className='border p-4 rounded bg-white whitespace-pre-wrap'>{post.content}</div>

      <div className='mt-6'>
        <button className='px-4 py-2 bg-gray-300 rounded' onClick={() => router.back()}>
          목록으로 돌아가기
        </button>
      </div>
    </div>
  );
}
