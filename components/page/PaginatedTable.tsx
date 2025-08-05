"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

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

  const fetchPosts = async (page: number) => {
    const res = await fetch(`${apiUrl}?page=${page}&size=10`);
    const data = await res.json();
    setPosts(data.content);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>제목</TableHead>
            <TableHead>작성일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center gap-2 mt-6">
        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i}
            variant={page === i + 1 ? "default" : "outline"}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}
