import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/profile" element={<Profile />} />
          {/* <Route path="new" element={<CallBackTutorial />}></Route>
            <Route path="state" element={<StateTutorial />}></Route>
            <Route path="effect" element={<EffectTutorial />}></Route>
            <Route path="layout" element={<LayoutEffectTutorial />}></Route>
            <Route path="memo" element={<MemoTutorial />}></Route>
            <Route path="reducer" element={<ReducerTutorial />}></Route>
            <Route path="ref" element={<RefTutorial />}></Route>
            <Route path="form" element={<Formpage />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
