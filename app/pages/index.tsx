import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface Props {
  apiUrl: string;
}

export default function PaginatedTable({ apiUrl }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const fetchPosts = async (page: number, keyword = "") => {
    const query = new URLSearchParams({
      page: String(page),
      size: "10",
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

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-2">
        <input
          className="border p-2 w-64"
          placeholder="검색어를 입력하세요"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleSearch}
        >
          검색
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">제목</th>
            <th className="border p-2">작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="border p-2">{post.id}</td>
              <td className="border p-2">{post.title}</td>
              <td className="border p-2">{post.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded ${
              page === i + 1 ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
