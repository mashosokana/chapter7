import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { DetailsPage } from "./components/Pages/DetailsPage";
import { Routes, Route  } from "react-router-dom";
import Contact from "./components/Contact/Contact";
import React from "react";

export const App: React.FC = () => {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<DetailsPage />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    </>
  )
};