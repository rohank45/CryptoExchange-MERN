import React, { useEffect, useContext } from "react";

import Aos from "aos";
import "aos/dist/aos.css";

import GlobalStats from "../FrontEnd/GlobalStats";
import LimCryptos from "./Home/LimCryptos";
import LimExchanges from "./Home/LimExchanges";
import LimNews from "./Home/LimNews";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import VoiceAss from "../voice-assistant/VoiceAss";
import BasicQue from "../Components/BasicQue";
import Middle from "../Components/Middle";
import CustomerReview from "../Components/CustomerReview";
import ScrollToTop from "../Extras/ScrollToTop";

import { UserContext } from "../App";

const Home = () => {
  const { state } = useContext(UserContext);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  // useEffect(() => {
  //   if (!state) {
  //     // return <p className="alert alert-warning"> please login.. </p>;
  //     alert("please login...");
  //   }
  // }, []);

  return (
    <div className="font-nunito scrollbar-hide overflow-x-hidden">
      <NavBar />
      <Header />
      <GlobalStats />
      <LimCryptos />
      <div data-aos="flip-up">
        <Middle />
      </div>

      <LimExchanges />
      <LimNews />
      <BasicQue />
      <CustomerReview />
      <Footer />

      <ScrollToTop />
      <VoiceAss />
    </div>
  );
};

export default Home;
