"use client";

import Image from "next/image";
import Link from "next/link";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import React, { useEffect, useState } from 'react';
import ErrorScreen from '../../components/error';
import "../../styles/home.css";
import { MdOutlineArrowForwardIos } from "react-icons/md";

export default function About() {

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

  if (!isReady || isLoading) return <div className="bg-black w-[100dvw] h-[100dvh]"></div>;
  if (error) return <ErrorScreen />;

  Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });

  return <main className="bg-[#000000] text-white h-fit w-full">
    <div className="flex flex-col">

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

      <div className="flex flex-col items-center justify-center pt-16 pb-4 mt-20 lg:px-24 px-0 anim-appear-5">
        {/* Header */}
        <header className="text-center mb-12 px-8">
          <h1 className="lg:text-8xl text-6xl lg:text-center text-left font-bold">Shilpi Qayyum Chowdhury Foundation</h1>
          <p className="text-3xl mt-8 lg:text-center text-left">Meet the team behind the scenes</p>
        </header>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-2 px-0">
          {/* Person 1 */}
          <div className="shadow-lg overflow-hidden">
            <div className="w-full h-80 relative">
              <a
                data-fancybox
                data-src="/images/tahera.jpg"
                data-caption="Tahera Khanam"
              >
              <Image src="/images/tahera.jpg" alt="Tahera Khanam" layout="fill" objectFit="cover" objectPosition="0% 20%"/>
              </a>
            </div>
            <div className="py-6">
              <h2 className="lg:text-3xl text-3xl pb-2 text-center font-semibold mb-2 custom-font">তাহেরা খানম</h2>
              <p className="bangla-font text-center lg:text-base text-lg">প্রতিষ্ঠাতা ও সভাপতি</p>
              <p className="bangla-font text-center lg:text-base text-lg">শিল্পী কাইয়ুম চৌধুরী ফাউণ্ডেশন</p>

              <div className="w-full mx-auto lg:my-4 my-6">
                <Link href="tahera" className="bg-black p-2 lg:mx-16 mx-0 flex justify-center items-center border-2
                border-white hover:shadow-lg text-zinc-400 hover:text-white">
                  <MdOutlineArrowForwardIos className="text-2xl mr-2" /><h1 className="text-base text-center">বিস্তারিত জানুন</h1>
                </Link>
              </div>

            </div>
          </div>

          {/* Person 2 */}
          <div className="shadow-lg overflow-hidden">
            <div className="w-full h-80 relative">
              <a
                data-fancybox
                data-src="/images/zaber.jpg"
                data-caption="Moinul Islam Zaber"
              >
              <Image src="/images/zaber.jpg" alt="Moinul Islam Zaber" layout="fill" objectFit="cover"/>
              </a>
            </div>
            <div className="py-6">
              <h2 className="lg:text-3xl text-3xl pb-2 text-center font-semibold mb-2 custom-font">মইনুল ইসলাম জাবের</h2>
              <p className="bangla-font text-center lg:text-base text-lg">অধ্যাপক, কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং বিভাগ</p>
              <p className="bangla-font text-center lg:text-base text-lg">ঢাকা বিশ্ববিদ্যালয়</p>

              <div className="w-full mx-auto lg:my-4 my-6">
                <Link href="zaber" className="bg-black p-2 lg:mx-16 mx-0 flex justify-center items-center border-2
                border-white hover:shadow-lg text-zinc-400 hover:text-white">
                  <MdOutlineArrowForwardIos className="text-2xl mr-2" /><h1 className="text-base text-center">বিস্তারিত জানুন</h1>
                </Link>
              </div>

            </div>
          </div>

          {/* Person 3 */}
          <div className="shadow-lg overflow-hidden">
            <div className="w-full h-80 relative">
              <a
                data-fancybox
                data-src="/images/mrittika.jpg"
                data-caption="Mrittika Shahita"
              >
              <Image src="/images/mrittika.jpg" alt="Mrittika Shahita" layout="fill" objectFit="cover"/>
              </a>
            </div>
            <div className="py-6">
              <h2 className="lg:text-3xl text-3xl pb-2 text-center font-semibold mb-2 custom-font">মৃত্তিকা সহিতা</h2>
              <p className="bangla-font text-center lg:text-base text-lg">সহযোগী অধ্যাপক, ইতিহাস বিভাগ</p>
              <p className="bangla-font text-center lg:text-base text-lg">ঢাকা বিশ্ববিদ্যালয়</p>

              <div className="w-full mx-auto lg:my-4 my-6">
                <Link href="mrittika" className="bg-black p-2 lg:mx-16 mx-0 flex justify-center items-center border-2
                border-white hover:shadow-lg text-zinc-400 hover:text-white">
                  <MdOutlineArrowForwardIos className="text-2xl mr-2" /><h1 className="text-base text-center">বিস্তারিত জানুন</h1>
                </Link>
              </div>
            </div>
          </div>

          {/* Person 4 */}
          <div className="shadow-lg overflow-hidden">
            <div className="w-full h-80 relative">
              <a
                data-fancybox
                data-src="/images/tariqul.jpg"
                data-caption="Tariqul Islam"
              >
              <Image src="/images/tariqul.jpg" alt="Tariqul Islam" layout="fill" objectFit="cover" objectPosition="0% 40%"/>
              </a>
            </div>
            <div className="py-6">
              <h2 className="lg:text-3xl text-3xl pb-2 text-center font-semibold mb-2 custom-font">মো: তরিকুল ইসলাম</h2>
              <p className="bangla-font text-center lg:text-base text-lg">প্রধান নির্বাহী</p>
              <p className="bangla-font text-center lg:text-base text-lg">শিল্পী কাইয়ুম চৌধুরী ফাউণ্ডেশন</p>

              <div className="w-full mx-auto lg:my-4 my-6">
                <Link href="tariqul" className="bg-black p-2 lg:mx-16 mx-0 flex justify-center items-center border-2
                border-white hover:shadow-lg text-zinc-400 hover:text-white">
                  <MdOutlineArrowForwardIos className="text-2xl mr-2" /><h1 className="text-base text-center">বিস্তারিত জানুন</h1>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Person main */}
        <div className="shadow-lg lg:w-[100%] lg:max-w-[79em] w-[75dvw] overflow-hidden pt-8 pb-2">
          <div className="mx-0 h-[30em] relative">
            <a
              data-fancybox
              data-src="/images/qc2.jpg"
              data-caption="Qayyum Chowdhury"
            >
            <Image src="/images/qc2.jpg" alt="Qayyum Chowdhury" layout="fill" objectFit="cover" objectPosition="75% 30%"/>
            </a>
          </div>
          <div className="py-6">
            <h2 className="text-3xl pb-2 text-center font-semibold mb-2 custom-font">শিল্পী কাইয়ুম চৌধুরী</h2>

            <div className="lg:w-2/4 w-full mx-auto lg:my-4 my-6">
              <Link href="qayyum" className="bg-black p-2 lg:mx-16 mx-0 flex justify-center items-center border-2
              border-white hover:shadow-lg text-zinc-400 hover:text-white">
                <MdOutlineArrowForwardIos className="text-2xl mr-2" /><h1 className="text-base text-center">বিস্তারিত জানুন</h1>
              </Link>
            </div>

          </div>
        </div>

      </div>

    </div>
  </main>;
}
