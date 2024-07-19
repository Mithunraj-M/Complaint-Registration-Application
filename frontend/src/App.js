import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import About from "./Components/Pages/About";
import AdminDashboard from "./Components/Pages/AdminDashboard";
import ComplaintRegister from "./Components/Pages/ComplaintRegister";
import ComplaintView from "./Components/Pages/ComplaintView";
import Dashboard from "./Components/Pages/Dashboard";
import FAQ from "./Components/Pages/FAQ";
import FeedbackForm from "./Components/Pages/FeedbackForm";
import Home from "./Components/Pages/Home";
import TrackComplaints from "./Components/Pages/TrackComplaints";
import Tutorial from "./Components/Pages/Tutorial";
import AdminLoginPage from "./Components/Pages/AdminLoginPage"

function App() {
  const [phoneId, setPhoneId] = useState("");
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home setPhoneId={setPhoneId} phoneId={phoneId} />}
        ></Route>
        <Route
          path="/Home"
          element={<Home setPhoneId={setPhoneId} phoneId={phoneId} />}
        ></Route>
        <Route path="/Tutorial" element={<Tutorial />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/FAQ" element={<FAQ />}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/FeedbackForm" element={<FeedbackForm />}></Route>
        <Route path="/TrackComplaints" element={<TrackComplaints />}></Route>
        <Route path="/AdminDashboard" element={<AdminDashboard />}></Route>
        <Route path="/ComplaintRegister" element={<ComplaintRegister />}></Route>
        <Route path="/ComplaintView" element={<ComplaintView />}></Route>
        <Route path="/AdminLoginPage" element={<AdminLoginPage/>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
