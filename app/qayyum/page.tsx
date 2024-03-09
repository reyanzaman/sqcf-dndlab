"use client";

import Image from "next/image";
import Link from "next/link";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import React, { useEffect, useState } from 'react';
import LoadingScreen from '../../components/LoadingScreen';
import ErrorScreen from '../../components/error';

export default function Qayyum() {

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const specificArtIdArray = [
    "f8e00d90-fa2a-425b-92a4-98759c82a7b9",
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {

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
        setIsReady(true);
      } catch (error) {
        console.error("Failed to fetch arts:", error);
        setError("Failed to load artworks. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    return;
  }, []);

  if (!isReady || isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen />;

  Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });

  Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });

  return <main className="bg-[#000000] h-[100dvh] w-[100dvw] text-white p-8">
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="anim-appear-3 z-50">
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
                      <span className="self-center text-2xl text-black font-semibold whitespace-nowrap appear">
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
                    <h1 className="custom-font text-3xl my-4 text-black">Menu</h1>
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
                          className="py-2 px-3 text-gray-300 hover:text-white appear md:p-0 md:py-1  "
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
                          className="py-2 px-3 appear md:p-0 md:py-1 border-b border-white"
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

      <div>
        <h1 className="text-5xl text-center">Under Development</h1>
      </div>
    </div>
  </main>;
}
