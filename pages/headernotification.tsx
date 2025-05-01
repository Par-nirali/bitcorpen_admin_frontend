import type { NextPage } from "next";
import { useSelector } from "react-redux";
import Header3 from "../components/Header/Header";
import HeaderNotifHelpDetail from "../components/HeaderNotification/HeaderNotifHelpDetail";
import HeaderNotification from "../components/HeaderNotification/HeaderNotification";
import Slidebar from "../components/Slidebar/Slidebar";

const HeaderNotifi: NextPage = () => {
  const selectedproject = useSelector((state: any) => state.selectedproject);
  // const [cookie, setCookie] = useState<any>("");
  // const router = useRouter();

  // useEffect(() => {
  //   const temp = Cookies.get("isLoggedIn");
  //   setCookie(temp);
  //   if (temp === "false" || !temp) {
  //     router.push("/login");
  //   }
  // }, []);
  const renderContent = () => {
    switch (selectedproject) {
      case "headernotifhelpdetail":
        return <HeaderNotifHelpDetail />;
      case "header_notification":
      default:
        return <HeaderNotification />;
    }
  };

  const redirectComponent = renderContent();

  return (
    <>
      {/* {cookie === "true" && ( */}
      <div className="mainCon">
        <Slidebar />
        <div className="subCon">
          <Header3 />
          <div className="scrollDiv">{redirectComponent}</div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default HeaderNotifi;
