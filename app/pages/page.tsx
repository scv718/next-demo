import PaginatedTable from "@/components/page/PaginatedTable";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">게시글 목록</h1>
      <PaginatedTable apiUrl="http://localhost:17070/api/posts" />
    </div>
  );
}
