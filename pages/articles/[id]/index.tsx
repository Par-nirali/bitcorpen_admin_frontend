import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import ShowArticleDetail from "../../../components/Articles/ShowArticleDetail";
import Header3 from "../../../components/Header/Header";
// import Sidebar from "../../../components/Sidebar/Sidebar";
import Slidebar from "../../../components/Slidebar/Slidebar";
import dynamic from "next/dynamic";

const ShowArticleDetail = dynamic(
  () => {
    return import("../../../components/Articles/ShowArticleDetail");
  },
  { ssr: false }
);

const Articledetails: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait until the router is ready and id is available
    if (!router.isReady) return;

    setIsLoading(false);
  }, [router.isReady, id]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="mainCon">
        <Slidebar />
        <div className="subCon">
          <Header3 />
          <div className="scrollDiv">
            {id && <ShowArticleDetail articleId={id} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Articledetails;
