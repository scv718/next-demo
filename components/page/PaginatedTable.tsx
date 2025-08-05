'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

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

interface Props {
  apiUrl: string;
}

export default function PaginatedTable({ apiUrl }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const router = useRouter();

  const fetchPosts = async (page: number, keyword = '') => {
    const query = new URLSearchParams({
      page: String(page),
      size: '10',
      ...(keyword ? { keyword } : {})
    });

    const res = await fetch(`${apiUrl}?${query}`);
    const data = await res.json();

    setPosts(data.content);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchPosts(page, keyword);
  }, [page, keyword]);

  const handleSearch = () => {
    setPage(1);
    setKeyword(searchInput);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className='p-4'>
      {/* 상단 검색 + 등록 */}
      <div className='mb-4 flex justify-between items-center'>
        <div className='flex gap-2'>
          <input
            className='border p-2 w-64'
            placeholder='검색어를 입력하세요'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className='px-4 py-2 bg-blue-500 text-white rounded' onClick={handleSearch}>
            검색
          </button>
        </div>

        <button className='px-4 py-2 bg-green-600 text-white rounded' onClick={() => router.push('/posts/write')}>
          + 글쓰기
        </button>
      </div>

      {/* 테이블 */}
      <table className='w-full border'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='border p-2'>ID</th>
            <th className='border p-2'>제목</th>
            <th className='border p-2'>작성자</th>
            <th className='border p-2'>타입</th>
            <th className='border p-2'>비밀글</th>
            <th className='border p-2'>조회수</th>
            <th className='border p-2'>작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className='border p-2 text-center'>{post.id}</td>
              <td
                className='border p-2 text-blue-600 cursor-pointer hover:underline'
                onClick={() => router.push(`/posts/${post.id}`)}>
                {post.title}
              </td>
              <td className='border p-2 text-center'>{post.authorName}</td>
              <td className='border p-2 text-center'>{post.postType}</td>
              <td className='border p-2 text-center'>{post.isSecret ? '🔒' : ''}</td>
              <td className='border p-2 text-center'>{post.viewCount}</td>
              <td className='border p-2 text-center'>{formatDate(post.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className='flex justify-center mt-4 space-x-2'>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
            onClick={() => setPage(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
