import SideBar from "./components/SideBar";
import Body from "./components/Body";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
function App() {
  return (
    <div className="container-fluid custom__main">
      <div className="row">
        <div className="col-lg-2">
          <SideBar />
        </div>
        <div className="col-lg-10 py-3">
          <Body />
        </div>
      </div>
    </div>
  );
}

export default App;
