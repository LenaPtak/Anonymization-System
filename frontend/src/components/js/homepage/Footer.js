import React, { useState, useEffect, useRef } from "react";
import "../../css/homepage/Footer.css";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const previousScrollTop = useRef(0);

  useEffect(() => {
    // function handleScroll() {
    //   const height = document.documentElement.offsetHeight;
    //   const scrollTop = document.documentElement.scrollTop;
    //   console.log("before", isVisible);
    //   setIsVisible(true);
    //   // if (scrollTop > previousScrollTop.current) {
    //   //   setIsVisible(true);
    //   // } else {
    //   //   setIsVisible(false);
    //   // }
    //   previousScrollTop.current = scrollTop;
    //   console.log("after", isVisible);
    // }

    // window.addEventListener("scroll", handleScroll);

    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  return (
    <div>
      {/* <div className={`${isVisible ? "footer--hidden" : "footer--visible"}`}> */}
      <div className="footer">
        <img className="footer__logo" src="..\images\logo.png" alt="logo" />
        <h1 className="footer__title">Team</h1>
        <h1 className="footer__title">History</h1>
        <h1 className="footer__title">Contact us</h1>
      </div>
    </div>
  );
}
