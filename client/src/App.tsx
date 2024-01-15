import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../src/components/util/Http";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import Profile from "./pages/ProfilePage";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import CreateListing from "./pages/CreateListingPage";
import Header from "./components/component/Header";
import AuthRoutes from "./components/component/AuthRoutes";
import EditListing from "./pages/EditListingPage";
import ListingDetail from "./pages/ListingDetailPage";
import Search from "./pages/Search";
import { useState, useEffect } from "react";
import Loading from "./components/component/Loading";

const App: FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [isSlow, setSlow] = useState(false);

  useEffect(() => {
    const alreadyLoaded = localStorage.getItem("alreadyLoaded");

    if (!alreadyLoaded) {
      localStorage.setItem("alreadyLoaded", "true");

      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      const slowLoadTimer = setTimeout(() => {
        if (isLoading) {
          setSlow(true);
        }
      }, 5000);

      return () => {
        clearTimeout(timer);
        clearTimeout(slowLoadTimer);
      };
    } else {
      setLoading(false);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        {isSlow ? (
          <Loading messagae="This may take a little longer due to your connection speed." />
        ) : (
          <Loading messagae="Loading, please wait..." />
        )}
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/search" element={<Search />} />
          <Route element={<AuthRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/edit-listing/:id" element={<EditListing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
