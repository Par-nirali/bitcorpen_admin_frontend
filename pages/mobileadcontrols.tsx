import type { NextPage } from "next";
import { useSelector } from "react-redux";
import Header3 from "../components/Header/Header";
import MobileAdControls from "../components/MobileAdControls/MobileAdControls";
import MobileAddAdControls from "../components/MobileAdControls/MobileAddAdControls";
import Slidebar from "../components/Slidebar/Slidebar";

const MobileAdcontrolss: NextPage = () => {
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
      case "mobileaddadcontrols":
        return <MobileAddAdControls />;
      case "mobilead_controls":
      default:
        return <MobileAdControls />;
    }
  };

  const redirectComponent = renderContent();

  return (
    <>
      <div className="mainCon">
        <Slidebar />
        <div className="subCon">
          <Header3 />
          <div className="scrollDiv">
            {/* {cookie === "true" && ( */}
            {/* <AdControls /> */}
            {redirectComponent}
            {/* )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileAdcontrolss;
