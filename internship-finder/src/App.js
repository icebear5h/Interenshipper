import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Home from "./components/home";
import NavBar from "./components/navBar";
import Internships from "./components/internships";
import NotFound from "./components/notFound";
import InternshipPage from "./components/internshipPage";
import SignInSignUp from "./components/signInSignUp"; // Import the SignInSignUp component
import './App.css';

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <React.Fragment>
        <ToastContainer />
        <NavBar/>
        <main className="container">
          <Routes>
            <Route path="/register" element={<SignInSignUp />} />
            <Route path="/login" element={<SignInSignUp />} />
            <Route path="/" element={<SignedOut><RedirectToSignIn /></SignedOut>} />
            <Route path="/myInterestList" element={<SignedIn><InternshipPage /></SignedIn>} />
            {/* <Route path="/internships/:id" element={<InternshipPage />} /> */}
            <Route path="/internships" element={<SignedIn><Internships /></SignedIn>} />
            <Route path="/home" element={<SignedIn><Home /></SignedIn>} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </main>
      </React.Fragment>
    </ClerkProvider>
  );
}

export default App;
