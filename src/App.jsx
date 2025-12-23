import WeddingWebsiteFull from "./components/WeddingWebsiteFull";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <WeddingWebsiteFull />

      {/* Toast global
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      /> */}
    </>
  );
}

export default App;
