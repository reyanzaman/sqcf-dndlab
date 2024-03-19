"use client";

import Image from "next/image";
import Link from "next/link";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../../../../components/LoadingScreen";
import ErrorScreen from "../../../../components/error";
import axios from "axios";
import "/styles/home.css";

interface Writing {
  id: string;
  title: string;
  title_Bangla: string;
  subtitle: string;
  subtitle_Bangla: string;
  publisher: string;
  publisher_Bangla: string;
  link: string;
  writer: string;
  writer_Bangla: string;
  category: string;
  type: string;
  day: string;
  day_Bangla: string;
  month: string;
  month_Bangla: string;
  year: string;
  year_Bangla: string;
  imageUrl: string;
  imageAlt: string;
  text: string;
  tags: string[];
  tags_Bangla: string[];
}

export default function Writing({ params }: { params: { writingId: string } }) {
  const [writings, setWritings] = useState<Writing[]>([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getWriting", {
          params: { writingId: params.writingId },
        });
        setWritings([response.data]);
      } catch (error) {
        console.error("Failed to fetch writings:", error);
      } finally {
        setIsReady(true);
        setIsLoading(false);
      }
    };
    fetchData();
    return;
  }, []);

  if (!isReady || isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen />;

  Fancybox.bind("[data-fancybox]", {});

  return (
    <main className="text-white bg-black">
      <div className="h-full w-full">
        {/* Navbar */}
        <div className="anim-appear-3 relative z-40">
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
                    <h1 className="custom-font text-3xl my-4 text-black">
                      Menu
                    </h1>
                    <hr className="w-[85dvw] border-2 border-gray-800"></hr>
                  </li>
                  <li>
                    <Link
                      href="/home"
                      className="text-2xl text-black custom-font rounded-lg py-2"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category"
                      className="text-2xl text-black custom-font rounded-lg py-2"
                    >
                      Arts & Writings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-2xl text-black custom-font rounded-lg py-2"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <hr className="w-[85dvw] border-2 border-gray-800"></hr>
                  </li>
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
                          href="/home"
                          className="py-2 px-3 text-gray-300 hover:text-white appear md:p-0 md:py-1  "
                          aria-current="page"
                        >
                          Home
                        </a>
                      </li>
                      <li>
                        <a
                          href="/category"
                          className="py-2 px-3 text-gray-300 hover:text-white appear md:p-0 md:py-1 border-b border-white"
                        >
                          Arts & Writings
                        </a>
                      </li>
                      <li>
                        <a
                          href="/about"
                          className="py-2 px-3 text-gray-300 hover:text-white appear md:p-0 md:py-1 "
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

        {!isMenuOpen ? (
          <div className="mt-32 lg:mx-32 mx-0 lg:px-0 lg:py-8 p-8 anim-appear-4">
            <div className="flex flex-row justify-between">
              <div>
                <h1 className="bangla-font lg:text-8xl text-6xl font-bold mb-3">
                  {writings[0].title_Bangla ? writings[0].title_Bangla : writings[0].title}
                </h1>
                <h1 className="lg:text-xl text-base font-bold mb-2">
                  Published By: {writings[0].publisher ? writings[0].publisher : writings[0].publisher_Bangla}
                </h1>
                <h1 className="text-base mb-2">
                  {writings[0].subtitle_Bangla ? writings[0].subtitle_Bangla : writings[0].subtitle}
                </h1>
                <h1 className="text-sm mb-8">
                  Published On: {writings[0].day}/{writings[0].month}/
                  {writings[0].year}
                </h1>
              </div>
              <div className="lg:block hidden">
                <Link href='/category' className="bg-zinc-900 p-4 rounded-sm hover:bg-zinc-700 whitespace-nowrap w-full">Go Back</Link>
              </div>
            </div>

            <hr className={`${writings[0].category=='Poem' ? 'lg:mb-20 mb-12' : 'mb-2'} `}></hr>

            <div className={`grid grid-cols-1 ${writings[0].category=='Poem' ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-4 anim-appear-7`}>

              <div className={`order-2 ${writings[0].category=='Poem' ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="bangla-font text-xl pb-8 lg:leading-7 leading-10 text-justify pr-2">
                  {writings[0].text.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className={`order-1 ${writings[0].category=='Poem' ? 'lg:order-2' : 'lg:order-1'}`}>
                <a
                  data-fancybox
                  data-src={`${writings[0].imageUrl}`}
                  data-caption={`<div style='text-align: center;'>${
                    writings[0].imageAlt
                  }<br><div style='color: #fde68a;'>${writings[0].tags.join(
                    ", "
                  )}<br>${writings[0].tags_Bangla.join(", ")}</div></div>`}
                >
                  {writings[0].imageUrl ? (
                    <Image
                      src={writings[0].imageUrl}
                      alt={writings[0].title_Bangla}
                      width={500}
                      height={500}
                      objectFit="cover"
                      className={`${writings[0].category=='Poem' ? 'w-full h-fit' : 'w-fit h-fit my-6'} object-cover mb-2 transition-all duration-500 ease-in-out group-hover:brightness-[.2] group-hover:border-8`}
                    />
                  ) : (
                    <div></div>
                  )}
                </a>
                <p className="bangla-font text-lg">{writings[0].imageAlt}</p>

                <div className={`${writings[0].imageUrl=='' && writings[0].category=='Poem' ? 'm-0' : 'my-4'}`}>
                  <p className="bangla-font text-lg text-amber-200 py-2">
                    English Tags: {writings[0].tags.join(", ")}
                  </p>
                  <p className="bangla-font text-lg text-amber-200 py-2">
                    Bangla Tags: {writings[0].tags_Bangla.join(", ")}
                  </p>
                </div>

                <div className="my-12">
                  <Link
                    href={writings[0].link}
                    target="blank"
                    className="bg-amber-300 text-black p-4 rounded-sm hover:bg-amber-200"
                  >
                    LINK TO ORIGINAL ARTICLE
                  </Link>
                </div>

                {writings[0].category!=='Poem' && (
                  <hr className="text-white my-8"></hr>
                )}

                <hr className="lg:hidden block mt-8"></hr>
              </div>

            </div>
            <hr className="my-8"></hr>

            <div className="lg:hidden block w-full mb-2">
              <Link href='/category' className="bg-zinc-900 p-3 rounded-sm hover:bg-zinc-700 text-center block">Go Back</Link>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </main>
  );
}
