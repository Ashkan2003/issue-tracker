import Pagination from "./issues/_components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <>
      <div>hellowk word</div>
      <Pagination itemCount={100} pageSize={10} currentPage={parseInt(searchParams.page)} />
    </>
  );
}
