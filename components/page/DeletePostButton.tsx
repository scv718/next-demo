'use client';

import { useRouter } from 'next/navigation';

interface Props {
  postId: number;
}

export default function DeletePostButton({ postId }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
        method: 'DELETE',
        credentials: 'include' // 쿠키 로그인 사용하는 경우 필요
      });

      if (!res.ok) throw new Error('삭제 실패');

      alert('게시글이 삭제되었습니다.');
      router.push('/posts'); // 목록 페이지 경로에 맞게 수정
    } catch (e) {
      alert('삭제 중 오류 발생');
      console.error(e);
    }
  };

  return (
    <button onClick={handleDelete} className='px-4 py-2 bg-red-500 text-white rounded'>
      삭제
    </button>
  );
}
