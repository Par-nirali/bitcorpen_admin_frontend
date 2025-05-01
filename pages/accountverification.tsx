import type { NextPage } from "next";
import { useSelector } from "react-redux";
import AccountVerification from "../components/AccountVerification/AccountVerification";
import ShowUserAccountDetail from "../components/AccountVerification/ShowUserAccountDetail";
import Header3 from "../components/Header/Header";
import Slidebar from "../components/Slidebar/Slidebar";

const AccountVerifications: NextPage = () => {
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
      case "showaccountdetails":
        return <ShowUserAccountDetail />;
      case "accountverification":
      default:
        return <AccountVerification />;
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
          <div className="scrollDiv">
            {/* <Team /> */}
            {redirectComponent}
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default AccountVerifications;
