"use client";

import Image from "next/image";
import Link from "next/link";
import "../../styles/innerPage.css";
import "../../styles/home.css";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import ErrorScreen from "../../components/error";
import { FaArrowRight } from "react-icons/fa6";

export default function Home() {
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
  const [error, setError] = useState("");
  const [isReady, setIsReady] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const specificArtIdArray = [
    "f8e00d90-fa2a-425b-92a4-98759c82a7b9",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 2500);

    const preloadImages = (arts: Art[]) => {
      const loadImage = (src: string) =>
        new Promise((resolve, reject) => {
          const img = new window.Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      // Map each art object to a loadImage promise
      const imagePromises = arts.map((art) => loadImage(art.imageUrl));
      // Use Promise.all to wait for all images to be loaded
      return Promise.all(imagePromises);
    };

    const fetchData = async () => {
      try {
        const fetchPromises = specificArtIdArray.map((id) =>
          fetch(`/api/getArt?id=${id}`).then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
        );
        const results = await Promise.all(fetchPromises);
        setArts(results);
        preloadImages(results);
      } catch (error) {
        console.error("Failed to fetch arts:", error);
        setError("Failed to load artworks. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => clearTimeout(timer);
  }, []);

  if (!isReady || isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen />;

  Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });

  return (
    <main className="bg-[#000000] text-white">

      {/* Logo */}
      {/* <div className="top-0 right-0 appear z-30 border-8 border-[#0c0f0c] absolute hidden lg:block">
        <div className="flex items-center justify-center w-[80px] h-[80px] bg-[#f3ecdc]">
          <Image
            src="/images/logo.jpg"
            alt="Logo"
            width={85}
            height={85}
            className="w-auto lg:h-[70px] h-[70px]"
          />
        </div>
      </div> */}

      <div className="flex flex-col">
        <div className="">
          {/* Navbar */}
          {isMenuOpen ? (
            // Mobile
            <div className="text-blackflex flex-col bg-white h-[100dvh] z-10">
              <div className="bg-white">
                <nav className="w-full z-20 top-0 start-0">
                  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-8">
                    <a
                      href="/"
                      className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                      <span className="self-center text-2xl font-semibold whitespace-nowrap appear">
                        SQCF
                      </span>
                    </a>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                      <button
                        onClick={toggleMenu}
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-900"
                        aria-controls="navbar-sticky"
                        aria-expanded={isMenuOpen ? "true" : "false"}
                      >
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="none"
                          viewBox="0 0 17 14"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1h15M1 7h15M1 13h15"
                          />
                        </svg>
                      </button>
                    </div>
                    <div
                      className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                      id="navbar-sticky"
                    ></div>
                  </div>
                </nav>
              </div>
              <div className="appeaar">
                <ul className="flex flex-col items-start justify-center px-8 py-4 space-y-10 h-[65dvh]">

                  <li>
                    <h1 className="custom-font text-3xl my-4">Menu</h1>
                    <hr className="w-[85dvw] border-2 border-gray-800"></hr>
                  </li>
                  <li>
                    <Link href="home"
                    className="text-2xl text-black custom-font rounded-lg py-2"
                    >Home</Link>
                  </li>
                  <li>
                    <Link href="category"
                    className="text-2xl text-black custom-font rounded-lg py-2"
                    >Arts & Writings</Link>
                  </li>
                  <li>
                    <Link href="about"
                    className="text-2xl text-black custom-font rounded-lg py-2"
                    >About</Link>
                  </li>
                  <li><hr className="w-[85dvw] border-2 border-gray-800"></hr></li>
                </ul>
              </div>
            </div>
          ) : (
            // Desktop
            <div className="h-full w-full flex flex-col items-center justify-center">
              <nav className="fixed w-full z-20 top-0 start-0 bg-black">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-8 pt-8 pb-4">
                  <a
                    href="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                  >
                    <span className="self-center text-2xl font-semibold whitespace-nowrap appear">
                      SQCF
                    </span>
                  </a>
                  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                      onClick={toggleMenu}
                      data-collapse-toggle="navbar-sticky"
                      type="button"
                      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
                      aria-controls="navbar-sticky"
                      aria-expanded={isMenuOpen ? "true" : "false"}
                    >
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="none"
                        viewBox="0 0 17 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 1h15M1 7h15M1 13h15"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-sticky"
                  >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                      <li>
                        <a
                          href="home"
                          className="py-2 px-3 text-white appear md:p-0 md:py-1 border-b border-white "
                          aria-current="page"
                        >
                          Home
                        </a>
                      </li>
                      <li>
                        <a
                          href="category"
                          className="py-2 px-3 text-gray-300 hover:text-white appear md:p-0 md:py-1"
                        >
                          Arts & Writings
                        </a>
                      </li>
                      <li>
                        <a
                          href="about"
                          className="py-2 px-3 text-gray-300 hover:text-white appear md:p-0 md:py-1"
                        >
                          About
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between anim-appear-3">
          <div className="lg:w-1/2 px-4 lg:px-16 h-full transform translate-y-[15dvh]">
            <h1 className="custom-font lg:text-6xl text-5xl lg:mt-0 mt-8 lg:mx-0 mx-4 text-white leading-[4.2rem]">
              Discover the Life and Work of Artist Qayyum Chowdhury
            </h1>
            <p className="custom-font text-2xl text-white mt-8 lg:mx-0 mx-4">
              Explore the collection of his paintings, drawings, writings and more.
            </p>
            <hr className="my-6 opacity-0"></hr>
            <Link href="#"
              className="text-3xl text-gray-300 hover:text-white
              flex flex-row items-center justify-start lg:mx-0 mx-4
              transform hover:translate-x-2">
                <FaArrowRight></FaArrowRight>
                <p className="custom-font text-3xl ml-3 text-gray-300 hover:text-white">Explore</p>
            </Link>
          </div>
          <div className="lg:flex hidden mr-16">
            <hr className="border-gray-50 mt-14 border-2 mx-auto w-[80dvw] lg:hidden block"></hr>
            <div className="lg:flex lg:flex-1 lg:justify-center">
              <div className="overflow-hidden lg:translate-y-[18dvh] translate-y-16 h-fitlg:mx-0 mx-6">
                <div className="">
                  <a
                    data-fancybox
                    data-src={`${arts[0].imageUrl}`}
                    data-caption={`${arts[0].title}`}
                  >
                    <Image
                      src={`${arts[0].imageUrl}`}
                      alt={`${arts[0].title}`}
                      height={550}
                      width={550}
                      objectFit="contain"
                      className="image-zoom-2 rounded"
                    />
                  </a>
                  <p className="bangla-font text-center my-4 text-xl">{`${arts[0].title_Bangla}`}
                  &nbsp;- {`${arts[0].artist}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </main>
  );
}
