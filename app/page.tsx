"use client";

import Image from "next/image";
import "../styles/home.css";
import classnames from "classnames";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { IoMenuOutline } from "react-icons/io5";
import { GrNext } from "react-icons/gr";
import React, { Suspense, useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import LoadingScreen from '../components/LoadingScreen';
import ErrorScreen from '../components/error';
import { useRouter } from 'next/navigation';

export default function Home() {

  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);

  const [currentArtIndex, setCurrentArtIndex] = useState(0);
  const router = useRouter();

  const handleNext = (index: number) => {
    let new_index = index + 1;
    if (new_index >= arts.length) {
      new_index = 0;
    }

    // Construct the new URL with the currentArtIndex parameter
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?currentArtIndex=${new_index}`;

    // Set the window's location to the new URL, triggering a page reload
    window.location.href = newUrl;
  };

  const handleBack = (index: number) => {
    let new_index = index - 1;
    if (new_index <= -1) {
      new_index = arts.length - 1;
    }

    // Construct the new URL with the currentArtIndex parameter
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?currentArtIndex=${new_index}`;

    // Set the window's location to the new URL, triggering a page reload
    window.location.href = newUrl;
  };

  const handleMenuItemClick = (index: number) => {
    // Construct the new URL with the currentArtIndex parameter
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?currentArtIndex=${index}`;

    // Set the window's location to the new URL, triggering a page reload
    window.location.href = newUrl;
  };

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const toggleDescription = () => {
    setDescriptionVisible(!isDescriptionVisible);
  };

  interface Art {
    title: string;
    title_Bangla: string;
    artist: string;
    year: string;
    year_Bangla: string;
    imageUrl: string;
    description: string;
    width: string;
    height: string;
    medium: string;
    medium_Bangla: string;
    type: string;
    publication: string;
    tags: [string];
    tags_Bangla: [string];
  }

  const [arts, setArts] = useState<Art[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isReady, setIsReady] = useState(false);

  const specificArtIdArray = [
    "5f84f014-cdbb-45fa-822f-8e803ce86e14",
    "7b676e6c-d861-4e3c-a556-bb8b5f0f981b",
    "f8e00d90-fa2a-425b-92a4-98759c82a7b9",
    "1b3b0b87-faf3-44e2-ae8a-5e1c51444e1a",
    "c6860657-8d4d-4389-a5c3-1e1ff3bb6abf",
    "da7494bb-5ada-4e0c-a6f1-84b374b1c0d3",
    "519f069e-86a8-4d78-9019-0008dc3e2e58",
  ];

  const colorArray = [
    // "#ec1f2e",
    // "#FBA834",
    // "#333A73",
    // "#FF9843",
    // "#402B3A",
    // "#D63484",
    // "#9ADE7B",
    "#000000",
    "#111111",
    "#222021",
    "#222222",
    "#333333",
    "#444444",
    "#555555",
  ];


  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 2500);

    let params = new URLSearchParams(window.location.search);
    let indexFromUrl = params.get('currentArtIndex');
    console.log("Current Index: ", indexFromUrl)
    if (indexFromUrl) {
      setCurrentArtIndex(Number(indexFromUrl));
    } else {
      setCurrentArtIndex(Number('0'));
    }

    const preloadImages = (arts: Art[]) => {
      const loadImage = (src: string) => new Promise((resolve, reject) => {
        const img = new window.Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
      // Map each art object to a loadImage promise
      const imagePromises = arts.map(art => loadImage(art.imageUrl));
      // Use Promise.all to wait for all images to be loaded
      return Promise.all(imagePromises);
    };

    const fetchData = async () => {
      try {
        const fetchPromises = specificArtIdArray.map(id =>
          fetch(`/api/getArt?id=${id}`).then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
        );
        const results = await Promise.all(fetchPromises);
        setArts(results);
        preloadImages(results);
      } catch (error) {
        console.error('Failed to fetch arts:', error);
        setError('Failed to load artworks. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => clearTimeout(timer);
  }, [router]);

  if (!isReady || isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen />;

  return (
    <main className="">
      <div className={classnames("bg-black w-[100vw] h-[100vh] absolute top-0 left-0 z-50", {"fade-in": !isLoading && isReady} )}></div>

      <div className={`flex flex-col ${isMenuVisible ? 'hidden' : ''} ${isDescriptionVisible ? 'hidden' : ''}`}>
        {/* Landing Image */}
        <div className="relative lg:w-screen lg:h-screen h-[100dvh] w-[100dvw] overflow-hidden">
          <div
            style={{ borderColor: colorArray[currentArtIndex] || colorArray[0], borderWidth: '0px', borderStyle: 'solid' }}
            className="m-0 absolute inset-0 image-container"
          >
            <Image
              src={`${arts[currentArtIndex].imageUrl}`}
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
        <div className="flex flex-col items-center lg:justify-center justify-end w-screen lg:h-screen h-[100dvh] absolute">
            <h1 className="text-4xl lg:text-[5rem] font-extrabold text-white text-center anim-appear custom-font drop-shadow-[0_2px_1.2px_rgba(0,0,0,0.8)]">{arts[currentArtIndex].title!=="" ? arts[currentArtIndex].title : "HIGH NOON"}</h1>
            <div className="lg:mt-14 mt-4 lg:mb-2 mb-6 lg:space-y-4">
              <h3 className="text-lg lg:text-[2.1rem] text-white text-center anim-appear bangla-font drop-shadow-[0_1.3px_1.2px_rgba(0,0,0,0.9)]">{arts[currentArtIndex].title_Bangla!=="" ? arts[currentArtIndex].title_Bangla : ""} - {arts[currentArtIndex].artist!=="" ? arts[currentArtIndex].artist : ""}</h3>
              <h3 className="text-base lg:text-[1.4rem] text-white text-center anim-appear bangla-font drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)]">{arts[currentArtIndex].medium_Bangla!=="" ? arts[currentArtIndex].medium_Bangla : ""} - {arts[currentArtIndex].year_Bangla!=="" ? arts[currentArtIndex].year_Bangla : ""}</h3>
              {/* <h3 className="text-base lg:text-[1.4rem] text-white text-center anim-appear bangla-font">১৩০ সেমি x ১৫০ সেমি</h3> */}
            </div>
            <div>
              <div className="anim-appear-2 custom-link">
              <button onClick={toggleDescription}
              className="bg-black px-4 lg:py-4 py-3 border-2 border-white lg:px-24 lg:m-6
            hover:text-white lg:text-xl text-base flex items-center justify-center relative link-comp w-full">
                <span className="text-gray-300 flex items-center justify-center hover:text-white duration-300">
                  <span className="relative hover-effect">বিস্তারিত জানুন</span>
                  <FaArrowRight className="ml-4 transform lg:-translate-x-1 -translate-x-1"/>
                </span>
              </button>
              </div>
            </div>
        </div>

        {/* Next Button only if currentArtIndex is not 6 */}
        {currentArtIndex !== arts.length - 1 && (
          <button onClick={() => handleNext(currentArtIndex)}>
            <div className="anim-appear-2 next-button-container">
              <div className="next-button">
                <GrNext className="lg:text-4xl text-4xl text-white"/>
              </div>
            </div>
          </button>
        )}

        {/* Back Button, only if currentArtIndex is not 0 */}
        {currentArtIndex !== 0 && (
          <button onClick={() => handleBack(currentArtIndex)}>
            <div className="anim-appear-2 back-button-container">
              <div className="next-button">
                <GrNext className="lg:text-4xl text-4xl text-white transform rotate-180"/>
              </div>
            </div>
          </button>
        )}

        {/* Menu */}
        <div className="absolute anim-appear-2 top-0 right-0 lg:mr-[2.5em] lg:mt-[2.5em] mr-[1em] mt-[1em]">
          <button onClick={toggleMenu}>
            <div className="lg:p-3 p-4 bg-black border-white lg:border-[4px] border-[3px]">
              <IoMenuOutline className="lg:text-4xl text-xl text-white"/>
            </div>
          </button>
        </div>

      </div>

      {/* ----------------------------------------------------------------- */}

      <div className={`${isMenuVisible ? '' : 'hidden'} ${isDescriptionVisible ? 'hidden' : ''}`}>

        <div className="flex lg:h-screen h-[100%]">

          {/* Left part with image */}
          <div
            style={{ borderColor: colorArray[currentArtIndex] || colorArray[0],
               borderWidth: '0px',
               borderStyle: 'solid',
               backgroundColor: colorArray[currentArtIndex] || colorArray[0]
              }}
            className="w-1/2 h-full relative overflow-hidden image-container hidden lg:flex"
          >
            <Image
              src={`${arts[currentArtIndex].imageUrl}`}
              alt="High Noon"
              layout="fill"
              objectFit="cover"
              className="image-zoom"
            />

            {/* Title */}
            <div className="flex flex-col w-full items-center justify-end h-full anim-appear-3">
                <h1 className="text-2xl lg:text-[3rem] font-extrabold text-white text-center custom-font drop-shadow-[0_2px_1.2px_rgba(0,0,0,0.8)]">{arts[currentArtIndex].title!=="" ? arts[currentArtIndex].title : ""}</h1>
                <div className="lg:mt-6 mt-4 lg:mb-0 mb-8 lg:space-y-4">
                  <h3 className="text-lg lg:text-[1.5rem] text-white text-center bangla-font drop-shadow-[0_2px_1.2px_rgba(0,0,0,0.8)]">{arts[currentArtIndex].title_Bangla!=="" ? arts[currentArtIndex].title_Bangla : ""} - {arts[currentArtIndex].artist!=="" ? arts[currentArtIndex].artist : ""}</h3>
                </div>
                <div>
                  <div className="custom-link">
                  <button onClick={toggleDescription} className="bg-black px-4 lg:py-4 py-3 border-2 border-white lg:px-24 lg:m-6 hover:text-white lg:text-xl text-base flex items-center justify-center relative link-comp">
                    <span className="text-gray-300 flex items-center justify-center hover:text-white duration-300">
                      <span className="relative hover-effect">বিস্তারিত জানুন</span>
                      <FaArrowRight className="ml-4 transform lg:-translate-x-1 -translate-x-1"/>
                    </span>
                  </button>
                  </div>
                </div>
            </div>

          </div>

          {/* Right part with menu */}
          <div className="lg:w-1/2 w-[92%] h-full flex flex-col lg:justify-start justify-center items-start transform translate-x-4 lg:translate-x-16 lg:mt-32 mt-0 lg:translate-y-2 translate-y-14">
            <ul className="">
              {/* Dynamically generate menu items, excluding the currentArtIndex */}
              {arts.map((art, index) => (
                index !== currentArtIndex && (
                  <button key={index} className="flex flex-col" onClick={() => handleMenuItemClick(index)}>
                    <li className="menu-item text-gray-800 hover-effect-black">&quot;{art.title !== "" ? art.title : ""}&quot;<p></p></li>
                    <p className="lg:ml-5 ml-3 lg:pt-0 pt-1 lg:text-base text-sm">{art.medium !== "" ? art.medium : ""} - {art.title_Bangla !== "" ? art.title_Bangla : ""}</p>
                  </button>
                )
              ))}

              <button className="flex flex-col">
                <li className="menu-item text-red-800 hover-effect-red">-View More</li>
                <p className="lg:ml-5 ml-3 lg:pt-0 pt-1 lg:text-base text-sm">শিল্পী কাইয়ুম চৌধুরীর আরো শিল্প দেখুন</p>
              </button>
            </ul>
          </div>

          {/* Menu Cross */}
          <div className="absolute anim-appear-3 top-0 right-0 lg:mr-[1.5em] lg:mt-[1.5em] mr-[0] mt-[0]">
            <button onClick={toggleMenu}>
              <div className="lg:p-3 p-4 bg-black">
                <IoClose  className="lg:text-4xl text-xl text-white"/>
              </div>
            </button>
          </div>

          {/* SQCF Foundation */}
          <div className="overflow-clip h-fit lg:absolute fixed lg:w-auto w-full anim-appear-3 lg:top-0 bottom-0 lg:right-0 lg:mr-[5.75em] lg:mt-[1.5em] mr-0 my-0">
            <Link href="about">
              <div className="lg:py-4 lg:px-4 py-4 px-6 m-0 bg-black link-comp">
                <h1 className="text-white text-lg text-center hover-effect">ABOUT SQCF FOUNDATION</h1>
              </div>
            </Link>
          </div>

          {/* Logo */}
          <div className="absolute top-0 left-0 lg:p-[40px] anim-appear-2">
            <div className="lg:flex items-center justify-center w-[90px] lg:w-[100px] h-[90px] lg:h-[100px] bg-[#f3ecdc] pr-1 hidden">
              <Image
                src="/images/logo.jpg"
                alt="Logo"
                width={90}
                height={90}
                className="w-auto lg:h-[90px] h-[70px]"
              />
            </div>
          </div>

          {/* Rotated Links */}
          <div className="flex flex-row absolute lg:bottom-0 lg:right-0 lg:left-auto left-0 transform lg:-rotate-90 rotate-0
          lg:-translate-y-44 -translate-y-[0px] lg:translate-x-[135px] -translate-x-0 text-gray-800">
              <Link href="/qayyum" className="bg-black text-white lg:text-base text-xs p-3 hover:bg-red-900">
                <p>Qayyum Chowdhury</p>
              </Link>
              <Link href="/tahera" className="bg-black text-white lg:text-base text-xs p-3 hover:bg-red-900">
                <p>Tahera Khanom</p>
              </Link>
          </div>

        </div>

      </div>


      {/* ----------------------------------------------------------------- */}

      <div className={`${isDescriptionVisible ? '' : 'hidden'}`}>
        <div className="flex lg:h-screen h-[100%] bg-whitesmoke">
            {/* Left part with image */}
            <div className="w-5/6 h-full overflow-hidden relative hidden lg:flex bg-[#111111]">
              <Image
                src={`${arts[currentArtIndex].imageUrl}`}
                alt="High Noon"
                layout="fill"
                objectFit="cover"
                className="image-zoom2 drop-shadow-xl border-2 border-black"
              />
            </div>

            {/* Right part with description */}
            <div className="overflow-y-scroll overflow-x-hidden lg:w-1/2 w-fit lg:h-[84%] h-[88%] flex flex-col lg:justify-start justify-start items-start bg-gray-100 transform translate-x-4 lg:translate-x-12 lg:mt-32 my-8 lg:-translate-y-12 translate-y-1">
              <br></br>

              <h1 className="w-[90%] custom-font leading-tight text-3xl lg:text-[2.5rem] anim-appear-4 text-[#898166]">{arts[currentArtIndex].title!=="" ? arts[currentArtIndex].title : ""}</h1>

              <p className="description lg:mt-6 custom-font text-lg lg:text-xl anim-appear-4 text-gray-800">{arts[currentArtIndex].title_Bangla!=="" ? arts[currentArtIndex].title_Bangla : ""} - {arts[currentArtIndex].artist!=="" ? arts[currentArtIndex].artist : ""}</p>

              <hr className="anim-appear-4 border w-full my-5 border-[#bbb190]"></hr>

              <p className="lg:mt-2 description text-base lg:text-xl anim-appear-4 text-gray-800 lg:w-5/6 w-[92%] text-justify font-light">
              {arts[currentArtIndex].description!=="" ? arts[currentArtIndex].description : ""}
              </p>
              <p className="mt-3 lg:mb-0 mb-3 description text-base lg:text-xl anim-appear-4 text-gray-800 w-5/6 text-justify font-light">
              {arts[currentArtIndex].publication!=="" ? arts[currentArtIndex].publication: ""}
              </p>

              <p className="lg:mt-4 mt-2 description custom-font text-base lg:text-xl anim-appear-4 text-gray-800 w-5/6 text-justify leading-10 font-light">
              {arts[currentArtIndex].height!=="" ? arts[currentArtIndex].height : ""}cm x {arts[currentArtIndex].width!=="" ? arts[currentArtIndex].width : ""}cm
              <br></br>
              {arts[currentArtIndex].medium_Bangla!=="" ? arts[currentArtIndex].medium_Bangla : ""} ({arts[currentArtIndex].medium!=="" ? arts[currentArtIndex].medium : ""})
              </p>

              {/* <p className="lg:mt-4 mt-2 custom-font text-base lg:text-xl anim-appear-4 text-gray-800 w-5/6 text-justify leading-10 font-light">
              Type: {arts.type!=="" ? arts.type : "Painting"}
              </p> */}

              <p className="custom-font description text-base lg:text-xl anim-appear-4 text-gray-800 w-5/6 text-justify leading-10 font-light">
              Year: {arts[currentArtIndex].year!=="" ? arts[currentArtIndex].year : ""}
              </p>


              <p className="lg:mt-4 mt-2 description custom-font text-sm lg:text-lg anim-appear-4 text-[#837341] w-5/6 text-justify leading-10 font-light">
                {Array.isArray(arts[currentArtIndex]?.tags) ? arts[currentArtIndex].tags.join(', ') : ""}
                {Array.isArray(arts[currentArtIndex]?.tags_Bangla) ? ', ' + arts[currentArtIndex].tags_Bangla.join(', ') : ""}
              </p>
              <br></br>
            </div>

            {/* Menu Cross */}
            <div className="absolute anim-appear-3 top-0 right-0 lg:mr-[1.5em] lg:mt-[1.5em] mr-[0] mt-[0]">
              <button onClick={toggleDescription}>
                <div className="lg:p-3 p-2 bg-black">
                  <IoClose  className="lg:text-4xl text-xl text-white"/>
                </div>
              </button>
            </div>

            {/* Next Button */}
            <button onClick={() => handleNext(currentArtIndex)}>
              <div className="anim-appear-2 fixed bottom-0 right-0">
                <div className="bg-black m-4 lg:p-4 p-3 lg:px-4 px-6">
                  <GrNext className="lg:text-2xl text-xl text-white"/>
                </div>
              </div>
            </button>
        </div>
      </div>

    </main>
  );
}