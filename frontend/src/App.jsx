import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MainURL } from "./MainURL";
import axios from "axios";
import Home from "./pages/Home";
import LoginAndRegister from "./pages/LoginAndRegister";
import { UserContextProvider } from "./context/UserContext";

axios.defaults.baseURL = MainURL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<LoginAndRegister />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
