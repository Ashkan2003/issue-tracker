import Pagination from "./issues/_components/Pagination";

export default function Home() {
  return (
    <>
      <div>hellowk word</div>
      <Pagination itemCount={100} pageSize={10} currentPage={2}/>
    </>
  );
}
