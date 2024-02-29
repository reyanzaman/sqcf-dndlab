"use client";

import Image from "next/image";
import "../styles/home.css";
import classnames from "classnames";
import db from "@/modules/db";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { IoMenuOutline } from "react-icons/io5";
import { GrNext } from "react-icons/gr";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function Home() {

  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <main className="">

      <div className={`flex flex-col ${isMenuVisible ? 'hidden' : ''}`}>
        {/* Landing Image */}
        <div className="relative w-screen h-screen overflow-hidden">
          <div
            className={classnames(
              "m-0 absolute inset-0",
              "image-container" // Applied class for the container with border
            )}
          >
            <Image
              src="https://dndlab-sqcf.s3.ap-southeast-1.amazonaws.com/Home_Paintings/IMG_9587.JPG"
              alt="High Noon"
              layout="fill"
              objectFit="cover"
              className="image-zoom" // Applied zoom-in class to the image
            />
          </div>
        </div>

        {/* Logo */}
        <div className="absolute top-0 left-0 lg:p-[2.5em] p-[1em] anim-appear-2">
          <div className="flex items-center justify-center w-[75px] lg:w-[150px] h-[75px] lg:h-[150px] bg-[#f3ecdc] pr-1">
            <Image
              src="/images/logo.jpg"
              alt="Logo"
              width={75}
              height={75}
              className="w-auto lg:h-[140px] h-[70px]"
            />
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col items-center lg:justify-center justify-end w-screen h-screen absolute">
            <h1 className="text-4xl lg:text-[5rem] font-extrabold text-white text-center anim-appear custom-font">HIGH NOON</h1>
            <div className="lg:mt-14 mt-4 lg:mb-2 mb-6 lg:space-y-4">
              <h3 className="text-lg lg:text-[2.1rem] text-white text-center anim-appear bangla-font">মধ্যদুপুর - শিল্পী কাইয়ুম চৌধুরী</h3>
              <h3 className="text-base lg:text-[1.4rem] text-white text-center anim-appear bangla-font">ম্যাসোনাইট বোর্ডে তেলরং - ১৯৬৮</h3>
              {/* <h3 className="text-base lg:text-[1.4rem] text-white text-center anim-appear bangla-font">১৩০ সেমি x ১৫০ সেমি</h3> */}
            </div>
            <div>
              <div className="anim-appear-2 custom-link">
              <Link href="/" className="bg-black px-4 lg:py-4 py-3 border-2 border-white lg:px-24 lg:m-6 hover:text-white lg:text-xl text-base flex items-center justify-center relative link-comp">
                <span className="text-gray-300 flex items-center justify-center hover:text-white duration-300">
                  <span className="relative hover-effect">বিস্তারিত জানুন</span>
                  <FaArrowRight className="ml-4 transform translate-x-3"/>
                </span>
              </Link>
              </div>
            </div>
        </div>

        {/* Next Button */}
        <div className="anim-appear-2 next-button-container">
          <div className="next-button">
            <GrNext className="lg:text-4xl text-4xl text-white"/>
          </div>
        </div>

        {/* Menu */}
        <div className="absolute anim-appear-2 top-0 right-0 lg:mr-[2.5em] lg:mt-[2.5em] mr-[1em] mt-[1em]">
          <button onClick={toggleMenu}>
            <div className="lg:p-3 p-4 bg-black border-white lg:border-[4px] border-[3px]">
              <IoMenuOutline className="lg:text-4xl text-xl text-white"/>
            </div>
          </button>
        </div>
      </div>

      <div className={`${isMenuVisible ? '' : 'hidden'}`}>

        <div className="flex h-screen">

          {/* Left part with image */}
          <div className="w-1/2 h-full relative overflow-hidden image-container hidden lg:flex">
            <Image
              src="https://dndlab-sqcf.s3.ap-southeast-1.amazonaws.com/Home_Paintings/IMG_9587.JPG"
              alt="High Noon"
              layout="fill"
              objectFit="cover"
              className="image-zoom"
            />

            {/* Title */}
            <div className="flex flex-col w-full items-center justify-end h-full anim-appear-3">
                <h1 className="text-2xl lg:text-[3rem] font-extrabold text-white text-center custom-font">HIGH NOON</h1>
                <div className="lg:mt-6 mt-4 lg:mb-0 mb-8 lg:space-y-4">
                  <h3 className="text-lg lg:text-[1.5rem] text-white text-center bangla-font">মধ্যদুপুর - শিল্পী কাইয়ুম চৌধুরী</h3>
                </div>
                <div>
                  <div className="custom-link">
                  <Link href="/" className="bg-black px-4 lg:py-4 py-3 border-2 border-white lg:px-24 lg:m-6 hover:text-white lg:text-xl text-base flex items-center justify-center relative link-comp">
                    <span className="text-gray-300 flex items-center justify-center hover:text-white duration-300">
                      <span className="relative hover-effect">বিস্তারিত জানুন</span>
                      <FaArrowRight className="ml-4 transform translate-x-3"/>
                    </span>
                  </Link>
                  </div>
                </div>
            </div>

          </div>

          {/* Right part with menu */}
          <div className="lg:w-1/2 w-fit h-full flex flex-col lg:justify-start justify-center items-start bg-gray-100 transform translate-x-4 lg:translate-x-24 lg:mt-32 mt-0 lg:translate-y-0 -translate-y-13">
            <ul className="">
              <button className="flex flex-col">
                <li className="menu-item hover-effect-black">&quot;High Noon&quot; <p></p></li>
                <p className="lg:ml-5 ml-3 lg:pt-0 pt-1 lg:text-base text-sm">Oil on masonite board - মধ্যদুপুর ১৯৬৮</p>
              </button>

              <button className="flex flex-col">
                <li className="menu-item hover-effect-black">&quot;Independence&quot;</li>
                <p className="lg:ml-5 ml-3 lg:pt-0 pt-1 lg:text-base text-sm">Oil on canvas - স্বাধীনতা ১৯৭২</p>
              </button>

              <button className="flex flex-col">
                <li className="menu-item hover-effect-black">&quot;Collecting Shapla&quot;</li>
                <p className="lg:ml-5 ml-3 lg:pt-0 pt-1 lg:text-base text-sm">Acrylic on paper - শাপলা তোলা ১৯৯৮</p>
              </button>

              <button className="flex flex-col">
                <li className="menu-item hover-effect-black">&quot;Boat in moonlight&quot;</li>
                <p className="lg:ml-5 ml-3 lg:pt-0 pt-1 lg:text-base text-sm">Watercolour - চন্দ্রালোকে নৌকা ১৯৫৭</p>
              </button>

              <button className="flex flex-col">
                <li className="menu-item hover-effect-black">&quot;Quest for self-63&quot;</li>
                <p className="lg:ml-5 ml-3 lg:pt-0 pt-1 lg:text-base text-sm">Acrylic on canvas - আত্মানুসন্ধান-৬৩ ২০১২</p>
              </button>

              <button className="flex flex-col">
                <li className="menu-item hover-effect-black">&quot;Quest for Self-45&quot;</li>
                <p className="lg:ml-5 ml-3 lg:pt-0 pt-1 lg:text-base text-sm">Acrylic on canvas - আত্মানুসন্ধান-৪৫ ২০১১</p>
              </button>

              <button className="flex flex-col">
                <li className="menu-item hover-effect-black">-View More</li>
                <p className="lg:ml-5 ml-3 lg:pt-0 pt-1 lg:text-base text-sm">শিল্পী কাইয়ুম চৌধুরীর আরো শিল্প দেখুন</p>
              </button>
            </ul>
          </div>

          {/* Menu Cross */}
          <div className="absolute anim-appear-3 top-0 right-0 lg:mr-[1.5em] lg:mt-[1.5em] mr-[0] mt-[0] transform lg:translate-x-0 translate-x-0.5">
            <button onClick={toggleMenu}>
              <div className="lg:p-3 p-4 bg-black">
                <IoClose  className="lg:text-4xl text-xl text-white"/>
              </div>
            </button>
          </div>

          {/* SQCF Foundation */}
          <div className="absolute lg:w-auto w-full anim-appear-3 lg:top-0 bottom-0 right-0 lg:mr-[5.75em] lg:mt-[1.5em] mr-0 mt-[1em]">
            <Link href="about">
              <div className="lg:py-4 lg:px-4 py-4 px-6 m-0 bg-black">
                <h1 className="text-white text-lg text-center">ABOUT SQCF FOUNDATION</h1>
              </div>
            </Link>
          </div>

          {/* Logo */}
          <div className="absolute top-0 left-0 lg:p-[2.5em] p-0 anim-appear-3">
            <div className="flex items-center justify-center w-[90px] lg:w-[150px] h-[90px] lg:h-[150px] bg-[#f3ecdc] pr-1">
              <Image
                src="/images/logo.jpg"
                alt="Logo"
                width={75}
                height={75}
                className="w-auto lg:h-[140px] h-[70px]"
              />
            </div>
          </div>

        </div>

      </div>

    </main>
  );
}