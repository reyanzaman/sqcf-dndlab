"use client";

import Image from "next/image";
import Link from "next/link";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import React, { useCallback, useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import ErrorScreen from "../../components/error";
import "/styles/home.css";
import axios from "axios";
import { IoMdSearch } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { AiOutlineLoading } from 'react-icons/ai';
import { debounce } from 'lodash';
import levenshtein from 'fast-levenshtein';

interface Art {
  id: string;
  title: string;
  title_Bangla: string;
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
  createdAt: Date;
  updatedAt: Date;
}

interface BookCover {
  id: string;
  title: string;
  title_Bangla: string;
  author: string;
  author_Bangla: string;
  publisher: string;
  publisher_Bangla: string;
  date: string;
  date_Bangla: string;
  imageUrl: string;
  description: string;
  type: string;
  type_Bangla: string;
  tags: string[];
  tags_Bangla: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface Poster {
  id: string;
  title: string;
  title_Bangla: string;
  imageUrl: string;
  description: string;
  category: string;
  year: string;
  year_Bangla: string;
  for_whom: string;
  width: number;
  height: number;
  tags: string[];
  tags_Bangla: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface Illustration {
  id: string;
  title: string;
  title_Bangla: string;
  subtitle: string;
  subtitle_Bangla: string;
  publisher: string;
  publisher_Bangla: string;
  year: string;
  year_Bangla: string;
  imageUrl: string;
  description: string;
  tags: string[];
  tags_Bangla: string[];
  createdAt: Date;
  updatedAt: Date;
}

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

export default function Category() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [arts, setArts] = useState<Art[]>([]);
  const [bookcovers, setBookCovers] = useState<BookCover[]>([]);
  const [posters, setPosters] = useState<Poster[]>([]);
  const [illustrations, setIllustrations] = useState<Illustration[]>([]);
  const [writings, setWritings] = useState<Writing[]>([]);
  const [isArtOpen, setIsArtOpen] = useState(false);
  const [isGPOpen, setIsGPOpen] = useState(false);
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [selectedCategory, setselectedCategory] = useState("Paintings");

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextPage = () => {
    if (
      currentPage <
      Math.ceil(
        arts.filter((art) => art.type === "painting").length / itemsPerPage
      )
    ) {
      setCurrentPage(currentPage + 1);
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  interface SearchResultBase {
    source?: string;
  }
  type ExtendedArt = Art & SearchResultBase;
  type ExtendedBookCover = BookCover & SearchResultBase;
  type ExtendedPoster = Poster & SearchResultBase;
  type ExtendedIllustration = Illustration & SearchResultBase;
  type ExtendedWriting = Writing & SearchResultBase;
  type SearchResult = ExtendedArt | ExtendedBookCover | ExtendedPoster | ExtendedIllustration | ExtendedWriting;
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // const similarityThreshold = 50;

  // const calculateSimilarity = (tag: any, query: string) => {
  //   const distance = levenshtein.get(tag.toLowerCase(), query.toLowerCase());
  //   const longestLength = Math.max(tag.length, query.length);
  //   const similarityPercentage = (1 - distance / longestLength) * 100;
  //   return similarityPercentage;
  // };

  const performSearch = (query: string) => {
    if (!query) {
      setSearchResults([]);
      setIsSearchLoading(false);
      return;
    }

    setIsSearchLoading(true);
    // Simulate fetching data
    setTimeout(() => {
      // Enhance items with a source field for identification
      const allItems = [
        ...arts.map(item => ({ ...item, source: 'Art' })) as (Art & SearchResultBase)[],
        ...bookcovers.map(item => ({ ...item, source: 'BookCover' })) as (BookCover & SearchResultBase)[],
        ...posters.map(item => ({ ...item, source: 'Poster' })) as (Poster & SearchResultBase)[],
        ...illustrations.map(item => ({ ...item, source: 'Illustration' })) as (Illustration & SearchResultBase)[],
        ...writings.map(item => ({ ...item, source: 'Writing' })) as (Writing & SearchResultBase)[],
      ];
      const matchedItems = allItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.title_Bangla.toLowerCase().includes(query.toLowerCase()) ||
        // item.tags.some(tag => calculateSimilarity(tag, query) >= (100 - similarityThreshold)) ||
        // item.tags_Bangla.some(tag => calculateSimilarity(tag, query) >= (100 - similarityThreshold))
        item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        item.tags_Bangla.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );

      setSearchResults(matchedItems); // Update with filtered items
      setIsSearchLoading(false);
    }, 2000);
  };

  const handleSearch = (e: any) => {
    e.preventDefault(); // Prevent the default form submission behavior
    performSearch(searchQuery); // Perform the search immediately with the current query
  };

  const groupedResults = searchResults.reduce((acc, item) => {
    let categoryName = item.source === 'BookCover' ? 'Book Cover'
                      : item.source === 'Illustration' ? 'Illustrations & Cards'
                      : item.source || 'Unknown';

    // Directly use the item's type as the category name if it's from the Art source
    if (item.source === 'Art' && 'type' in item) {
        categoryName = capitalizeFirstLetter(item.type);
    }

    // Initialize the category array if it does not exist
    if (!acc[categoryName]) {
        acc[categoryName] = [];
    }

    acc[categoryName].push(item);
    return acc;
  }, {} as Record<string, SearchResult[]>);


  // Helper function to capitalize the first letter of a string (e.g., "sketch" -> "Sketch")
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function isExtendedWriting(item: SearchResult): item is ExtendedWriting {
    return (item as ExtendedWriting).writer_Bangla !== undefined;
  }

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Define the debounced function directly inside the effect
    const debouncedPerformSearch = debounce(() => {
      performSearch(searchQuery);
    }, 500);

    if (searchQuery) {
      debouncedPerformSearch();
    }

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getAllArt");
        const response2 = await axios.get("/api/getAllBookCovers");
        const response3 = await axios.get("/api/getAllPosters");
        const response4 = await axios.get("/api/getAllIllustrations");
        const response5 = await axios.get("/api/getAllWriting");
        setArts(response.data);
        setBookCovers(response2.data);
        setPosters(response3.data);
        setIllustrations(response4.data);
        setWritings(response5.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsReady(true);
        setIsLoading(false);
      }
    };
    fetchData();
    return () => debouncedPerformSearch.cancel();
  }, [searchQuery]);

  if (!isReady || isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen />;

  Fancybox.bind("[data-fancybox]", {});

  return (
    <main className="text-white">
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
                      href="home"
                      className="text-2xl text-black custom-font rounded-lg py-2"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="category"
                      className="text-2xl text-black custom-font rounded-lg py-2"
                    >
                      Arts & Writings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="about"
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
                          className="py-2 px-3 text-gray-300 hover:text-white appear md:p-0 md:py-1 border-b border-white"
                        >
                          Arts & Writings
                        </a>
                      </li>
                      <li>
                        <a
                          href="about"
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
        <div>
          {/* Main Code */}
          <div className="mt-32 lg:mx-32 mx-0 lg:px-0 lg:py-8 p-8">
            <h1 className="lg:text-6xl text-4xl custom-font anim-appear-3">ARTS & WRITINGS</h1>

            {/* Search Bar */}
            <div className="flex lg:flex-cols flex-row justify-between items-end z-0 anim-appear-6">

              <div className="mt-12">

                <div className="relative w-full">
                  <form onSubmit={handleSearch}>
                    <input
                      type="text"
                      placeholder="Search..."
                      className="lg:w-[25vw] w-full h-10 pl-4 pr-12 text-white shadow focus:outline-none bg-black"
                      value={searchQuery} // Control component
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="absolute inset-y-0 right-0 flex items-center px-1 text-2xl text-white"
                    >
                      <IoMdSearch />
                    </button>
                  </form>
                </div>

              </div>

              {/* Item Count */}
              <div className="hidden lg:block">
                <h1 className="text-sm lg:mb-2 mb-1 lg:mt-0 mt-6 custom-font text-right">
                  <span className="text-amber-200">{writings.filter((writing) => writing.type === "Writings on QC").length}</span>{" "}
                  Writings on QC {" "}
                  | <span className="text-amber-200">{writings.filter((writing) => writing.category === "Poem").length}</span>{" "}
                  Poems {" "}
                  | <span className="text-amber-200">{writings.filter((writing) => writing.category === "Prose").length}</span>{" "}
                  Prose {" "}
                </h1>
                <h1 className="text-sm mb-1 custom-font text-right">
                  <span className="text-amber-200">
                    {arts.filter((art) => art.type === "painting").length}
                  </span>{" "}
                  Painting |{" "}
                  <span className="text-amber-200">
                    {arts.filter((art) => art.type === "drawing").length}
                  </span>{" "}
                  Drawing |{" "}
                  <span className="text-amber-200">
                    {arts.filter((art) => art.type === "sketch").length}
                  </span>{" "}
                  Sketch |{" "}
                  <span className="text-amber-200">{bookcovers.length}</span> Book
                  Covers |{" "}
                  <span className="text-amber-200">{posters.length}</span> Posters
                  | <span className="text-amber-200">{illustrations.length}</span>{" "}
                  Illustrations {" "}
                </h1>
              </div>

            </div>

            <hr className="my-4 border anim-appear-6"></hr>

            {/* Drop Downs */}
            {searchQuery === '' ? (
            <div className="flex lg:flex-row flex-col justify-between anim-appear-7">
              <div className="flex lg:flex-row flex-col">

                <div className="relative mt-2 w-[7rem]">
                  <button
                    className="text-zinc-300 hover:text-white text-2xl custom-font px-4 py-2.5 text-center inline-flex items-center"
                    type="button"
                    onClick={() => setIsArtOpen(!isArtOpen)}
                  >
                    Art
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                  {isArtOpen && (
                    <div className="z-10 w-44 mt-2 bg-black">
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentIndex(0);
                          setCurrentPage(1);
                          setselectedCategory("Paintings");
                        }}
                        className="block px-4 py-2 text-base text-zinc-300 hover:text-white"
                      >
                        Painting
                      </a>
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentIndex(0);
                          setCurrentPage(1);
                          setselectedCategory("Drawings");
                        }}
                        className="block px-4 py-2 text-base text-zinc-300 hover:text-white"
                      >
                        Drawing
                      </a>
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentIndex(0);
                          setCurrentPage(1);
                          setselectedCategory("Sketches");
                        }}
                        className="block px-4 py-2 text-base text-zinc-300 hover:text-white"
                      >
                        Sketch
                      </a>
                    </div>
                  )}
                </div>

                <div className="relative mt-2 w-[16rem]">
                  <button
                    className="text-zinc-300 hover:text-white text-2xl custom-font px-4 py-2.5 text-center inline-flex items-center"
                    type="button"
                    onClick={() => setIsGPOpen(!isGPOpen)}
                  >
                    Graphics Design
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                  {isGPOpen && (
                    <div className="z-10 w-44 mt-2 bg-black">
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentIndex(0);
                          setCurrentPage(1);
                          setselectedCategory("Book Covers");
                        }}
                        className="block px-4 py-2 text-base text-zinc-300 hover:text-white"
                      >
                        Book Cover
                      </a>
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentIndex(0);
                          setCurrentPage(1);
                          setselectedCategory("Posters");
                        }}
                        className="block px-4 py-2 text-base text-zinc-300 hover:text-white"
                      >
                        Poster
                      </a>
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentIndex(0);
                          setCurrentPage(1);
                          setselectedCategory("Illustrations & Cards");
                        }}
                        className="block px-4 py-2 text-base text-zinc-300 hover:text-white"
                      >
                        Illustration & Cards
                      </a>
                    </div>
                  )}
                </div>

                <div className="relative mt-2 w-[14rem]">
                  <button
                    className="text-zinc-300 hover:text-white text-2xl custom-font px-4 py-2.5 text-center inline-flex items-center"
                    type="button"
                    onClick={() => setIsWriteOpen(!isWriteOpen)}
                  >
                    Writing
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                  {isWriteOpen && (
                    <div className="z-10 w-44 mt-2 bg-black">
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentIndex(0);
                          setCurrentPage(1);
                          setselectedCategory("Writings on QC");
                        }}
                        className="block px-4 py-2 text-base text-zinc-300 hover:text-white"
                      >
                        Writings on QC
                      </a>
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentIndex(0);
                          setCurrentPage(1);
                          setselectedCategory("Poems");
                        }}
                        className="block px-4 py-2 text-base text-zinc-300 hover:text-white"
                      >
                        Poems
                      </a>
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentIndex(0);
                          setCurrentPage(1);
                          setselectedCategory("Prose");
                        }}
                        className="block px-4 py-2 text-base text-zinc-300 hover:text-white"
                      >
                        Prose
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <hr className="my-4 border anim-appear-7 block lg:hidden"></hr>
              <div className="mt-4">
                <h1 className="text-3xl lg:text-right text-center">Showing {selectedCategory}</h1>
              </div>
            </div>
            ):(
              <div></div>
            )}

            {searchQuery === '' ? (
            <div className="mt-12 anim-appear-8">

              {/* Images */}
              <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 items-center justify-center">
                {selectedCategory === "Paintings" &&
                  arts
                    .filter((art) => art.type === "painting")
                    .slice(currentIndex, currentIndex + itemsPerPage)
                    .map((art, index) => (
                      <div className="" key={index}>
                        <a
                          data-fancybox
                          data-src={`${art.imageUrl}`}
                          data-caption={`<div style='text-align: center;'>${art.title}<br><div style='color: #fde68a;'>${art.tags.join(', ')}<br>${art.tags_Bangla.join(', ')}</div></div>`}
                        >
                          <Image
                            src={art.imageUrl}
                            alt={art.title}
                            width={500}
                            height={500}
                            objectFit="cover"
                            className="w-full lg:h-[20vw] h-[35vw] object-cover border-4 border-black mb-2 hover:scale-105"
                          />
                        </a>
                        <div className="mb-2">
                          <h1 className="text-center text-sm px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                            {art.title}
                          </h1>
                          <h1 className="text-center bangla-font text-base px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                            ( {art.title_Bangla} )
                          </h1>
                          <h1 className="text-center text-xs px-1">
                            {art.width} cm X {art.height} cm
                          </h1>
                        </div>
                      </div>
                    ))}
                {selectedCategory === "Drawings" &&
                  arts
                    .filter((art) => art.type === "drawing")
                    .slice(currentIndex, currentIndex + itemsPerPage)
                    .map((art, index) => (
                      <div className="" key={index}>
                        <a
                          data-fancybox
                          data-src={`${art.imageUrl}`}
                          data-caption={`<div style='text-align: center;'>${art.title}<br><div style='color: #fde68a;'>${art.tags.join(', ')}<br>${art.tags_Bangla.join(', ')}</div></div>`}
                        >
                          <Image
                            src={art.imageUrl}
                            alt={art.title}
                            width={500}
                            height={500}
                            objectFit="cover"
                            className="w-full lg:h-[20vw] h-[35vw] object-cover border-4 border-black mb-2 hover:scale-105"
                          />
                        </a>
                        <div className="mb-2">
                          <h1 className="text-center text-sm px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                            {art.title}
                          </h1>
                          <h1 className="text-center bangla-font text-base px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                            ( {art.title_Bangla} )
                          </h1>
                          <h1 className="text-center text-xs px-1">
                            {art.width} cm X {art.height} cm
                          </h1>
                        </div>
                      </div>
                    ))}
                {selectedCategory === "Sketches" &&
                  arts
                    .filter((art) => art.type === "sketch")
                    .slice(currentIndex, currentIndex + itemsPerPage)
                    .map((art, index) => (
                      <div className="" key={index}>
                        <a
                          data-fancybox
                          data-src={`${art.imageUrl}`}
                          data-caption={`<div style='text-align: center;'>${art.title}<br><div style='color: #fde68a;'>${art.tags.join(', ')}<br>${art.tags_Bangla.join(', ')}</div></div>`}
                        >
                          <Image
                            src={art.imageUrl}
                            alt={art.title}
                            width={500}
                            height={500}
                            objectFit="cover"
                            className="w-full lg:h-[20vw] h-[35vw] object-cover border-4 border-black mb-2 hover:scale-105"
                          />
                        </a>
                        <div className="mb-2">
                          <h1 className="text-center text-sm px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                            {art.title}
                          </h1>
                          <h1 className="text-center bangla-font text-base px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                            ( {art.title_Bangla} )
                          </h1>
                          <h1 className="text-center text-xs px-1">
                            {art.width} cm X {art.height} cm
                          </h1>
                        </div>
                      </div>
                    ))}
                {selectedCategory === "Book Covers" &&
                  bookcovers
                    .slice(currentIndex, currentIndex + itemsPerPage)
                    .map((art, index) => (
                      <div className="" key={index}>
                        <a
                          data-fancybox
                          data-src={`${art.imageUrl}`}
                          data-caption={`<div style='text-align: center;'>${art.title_Bangla}<br><div style='color: #fde68a;'>${art.tags.join(', ')}<br>${art.tags_Bangla.join(', ')}</div></div>`}
                        >
                          <Image
                            src={art.imageUrl}
                            alt={art.title}
                            width={500}
                            height={500}
                            objectFit="cover"
                            className="w-full lg:h-[20vw] h-[35vw] object-cover border-4 border-black mb-2 hover:scale-105"
                          />
                        </a>
                        <div className="mb-2">
                          {/* <h1 className="text-center text-sm px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                            {art.title}
                          </h1> */}
                          <h1 className="text-center bangla-font text-base px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                            {art.title_Bangla}
                          </h1>
                          <h1 className="text-center text-xs px-1">
                            Written By {art.author_Bangla}
                          </h1>
                          <h1 className="text-center text-xs px-1">
                            Published By {art.publisher_Bangla}
                          </h1>
                        </div>
                      </div>
                    ))}
                {selectedCategory === "Posters" &&
                  posters
                    .slice(currentIndex, currentIndex + itemsPerPage)
                    .map((art, index) => (
                      <div className="" key={index}>
                        <a
                          data-fancybox
                          data-src={`${art.imageUrl}`}
                          data-caption={`<div style='text-align: center;'>${art.title_Bangla}<br><div style='color: #fde68a;'>${art.tags.join(', ')}<br>${art.tags_Bangla.join(', ')}</div></div>`}
                        >
                          <Image
                            src={art.imageUrl}
                            alt={art.title}
                            width={500}
                            height={500}
                            objectFit="cover"
                            className="w-full lg:h-[20vw] h-[35vw] object-cover border-4 border-black mb-2 hover:scale-105"
                          />
                        </a>
                        <div className="mb-2">
                          {/* <h1 className="text-center text-sm px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                            {art.title}
                          </h1> */}
                          <h1 className="text-center bangla-font text-base px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                            {art.title_Bangla}
                          </h1>
                          <h1 className="text-center text-xs px-1">
                            For {art.for_whom}
                          </h1>
                        </div>
                      </div>
                    ))}
                {selectedCategory === "Illustrations & Cards" &&
                  illustrations
                    .slice(currentIndex, currentIndex + itemsPerPage)
                    .map((art, index) => (
                      <div className="" key={index}>
                        <a
                          data-fancybox
                          data-src={`${art.imageUrl}`}
                          data-caption={`<div style='text-align: center;'>${art.title_Bangla}<br><div style='color: #fde68a;'>${art.tags.join(', ')}<br>${art.tags_Bangla.join(', ')}</div></div>`}
                        >
                          <Image
                            src={art.imageUrl}
                            alt={art.title}
                            width={500}
                            height={500}
                            objectFit="cover"
                            className="w-full lg:h-[20vw] h-[35vw] object-cover border-4 border-black mb-2 hover:scale-105"
                          />
                        </a>
                        <div className="mb-2">
                          {/* <h1 className="text-center text-sm px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                            {art.title}
                          </h1> */}
                          <h1 className="text-center bangla-font text-base px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                            {art.title_Bangla}
                          </h1>
                          <h1 className="text-center text-xs px-1">
                            {art.publisher_Bangla}
                          </h1>
                        </div>
                      </div>
                    ))}
                {selectedCategory === "Poems" &&
                  writings
                    .filter((writing) => writing.category === "Poem")
                    .slice(currentIndex, currentIndex + itemsPerPage)
                    .map((art, index) => (
                      <div className="" key={index}>
                        <Link href={`/category/writing/${art.id}`}>
                          <div className="relative group cursor-pointer">
                            {art.imageUrl ? (
                              <Image
                                src={art.imageUrl}
                                alt={art.title_Bangla}
                                width={500}
                                height={500}
                                objectFit="cover"
                                className="w-full lg:h-[20vw] h-[35vw] object-cover border-4 border-black mb-2 transition-all duration-500 ease-in-out group-hover:brightness-[.2] group-hover:border-8"
                              />
                            ) : (
                              <div className="w-full lg:h-[20vw] h-[35vw] flex items-center justify-center border-4 border-black mb-2 bg-gray-100 transition-all duration-500 ease-in-out group-hover:brightness-[0.2] group-hover:border-8 group-hover:text-gray-100 text-black">
                                <span className="lg:text-4xl text-2xl font-bold z-50 text-center overflow-hidden text-ellipsis p-4">{art.title_Bangla}</span>
                              </div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                              <h1 className="text-white text-3xl font-bold z-10 custom-font">View Writing</h1>
                            </div>
                          </div>
                        </Link>
                        <div className="mb-2">
                          {/* <h1 className="text-center text-sm px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                            {art.title}
                          </h1> */}
                          <h1 className="text-center bangla-font text-lg px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                            {art.title_Bangla}
                          </h1>
                          <h1 className="text-center text-xs px-1">
                            Published In: {art.publisher}
                          </h1>
                        </div>
                      </div>
                    ))}
                    {selectedCategory === "Prose" &&
                    writings
                      .filter((writing) => writing.category === "Prose")
                      .slice(currentIndex, currentIndex + itemsPerPage)
                      .map((art, index) => (
                        <div className="" key={index}>
                          <Link href={`/category/writing/${art.id}`}>
                            <div className="relative group cursor-pointer">
                              {art.imageUrl ? (
                                <Image
                                  src={art.imageUrl}
                                  alt={art.title_Bangla}
                                  width={500}
                                  height={500}
                                  objectFit="cover"
                                  className="w-full lg:h-[20vw] h-[35vw] object-cover border-4 border-black mb-2 transition-all duration-500 ease-in-out group-hover:brightness-[.2] group-hover:border-8"
                                />
                              ) : (
                                <div className="w-full lg:h-[20vw] h-[35vw] flex items-center justify-center border-4 border-black mb-2 bg-gray-100 transition-all duration-500 ease-in-out group-hover:brightness-[0.2] group-hover:border-8 group-hover:text-gray-100 text-black">
                                  <span className="lg:text-4xl text-2xl font-bold z-50 text-center overflow-hidden text-ellipsis p-4">{art.title_Bangla}</span>
                                </div>
                              )}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                <h1 className="text-white text-3xl font-bold z-10 custom-font">View Writing</h1>
                              </div>
                            </div>
                          </Link>
                          <div className="mb-2">
                            {/* <h1 className="text-center text-sm px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                              {art.title}
                            </h1> */}
                            <h1 className="text-center bangla-font text-lg px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                              {art.title_Bangla}
                            </h1>
                            <h1 className="text-center text-xs px-1">
                              Published In: {art.publisher_Bangla}
                            </h1>
                          </div>
                        </div>
                      ))}
                      {selectedCategory === "Writings on QC" &&
                      writings
                      .filter((writing) => writing.type === "Writings on QC")
                      .slice(currentIndex, currentIndex + itemsPerPage)
                      .map((art, index) => (
                        <div className="" key={index}>
                          <Link href={`/category/writing/${art.id}`}>
                            <div className="relative group cursor-pointer">
                              {art.imageUrl ? (
                                <Image
                                  src={art.imageUrl}
                                  alt={art.title_Bangla ? art.title_Bangla : art.title}
                                  width={500}
                                  height={500}
                                  objectFit="cover"
                                  className="w-full lg:h-[20vw] h-[35vw] object-cover border-4 border-black mb-2 transition-all duration-500 ease-in-out group-hover:brightness-[.2] group-hover:border-8"
                                />
                              ) : (
                                <div className="w-full lg:h-[20vw] h-[35vw] flex items-center justify-center border-4 border-black mb-2 bg-gray-100 transition-all duration-500 ease-in-out group-hover:brightness-[0.2] group-hover:border-8 group-hover:text-gray-100 text-black">
                                  <span className="lg:text-4xl text-2xl font-bold z-50 text-center overflow-hidden text-ellipsis p-4">{art.title_Bangla ? art.title_Bangla : art.title}</span>
                                </div>
                              )}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                <h1 className="text-white text-3xl font-bold z-10 custom-font">View Writing</h1>
                              </div>
                            </div>
                          </Link>
                          <div className="mb-2">
                            {/* <h1 className="text-center text-sm px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                              {art.title}
                            </h1> */}
                            <h1 className="text-center bangla-font text-lg px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                              {art.title_Bangla ? art.title_Bangla : art.title}
                            </h1>
                            <h1 className="text-center text-xs px-1">
                              Published In: {art.publisher_Bangla ? art.publisher_Bangla : art.publisher}
                            </h1>
                          </div>
                        </div>
                      ))}
              </div>

              {/* Pagination */}
              <div className="my-12">

                <div className="flex flex-row justify-between mt-4 items-center">

                  {/* Previous Page Button */}
                  {currentPage > 1 && (
                    <div className="flex flex-row gap-2 items-center cursor-pointer" onClick={handlePreviousPage}>
                      <FaArrowLeftLong className="lg:text-2xl text-4xl text-white " />
                      <h1 className="text-2xl lg:block hidden text-zinc-300 hover:text-white">
                        Previous Page
                      </h1>
                    </div>
                  )}
                  {currentPage <= 1 && (
                    <div className="flex flex-row gap-2 items-center cursor-not-allowed text-zinc-800 hover:text-zinc-900">
                      <FaArrowLeftLong className="lg:text-2xl text-4xl" />
                      <h1 className="text-2xl hidden lg:block">Previous Page</h1>
                    </div>
                  )}


                  {/* Page Number */}
                  <div>
                    {
                      (() => {
                        let totalItems;
                        switch (selectedCategory) {
                          case "Paintings":
                            totalItems = arts.filter((art) => art.type === "painting").length;
                            break;
                          case "Drawings":
                            totalItems = arts.filter((art) => art.type === "drawing").length;
                            break;
                          case "Sketches":
                            totalItems = arts.filter((art) => art.type === "sketch").length;
                            break;
                          case "Book Covers":
                            totalItems = bookcovers.length;
                            break;
                          case "Posters":
                            totalItems = posters.length;
                            break;
                          case "Illustrations & Cards":
                            totalItems = illustrations.length;
                            break;
                          case "Writings on QC":
                          case "Poems":
                          case "Prose":
                            totalItems = 1; // Assuming these categories inherently have only 1 page of items or are treated as such
                            break;
                          default:
                            totalItems = 0; // Default or error case
                        }

                        const totalPages = Math.ceil(totalItems / itemsPerPage);

                        return (
                          <h1 className="text-center lg:text-base text-sm">
                            Page: {currentPage} of {totalPages}
                          </h1>
                        );
                      })()
                    }
                  </div>


                  {/* Next Page Button */}
                  {
                    (() => {
                      let totalItems;
                      switch (selectedCategory) {
                        case "Paintings":
                          totalItems = arts.filter((art) => art.type === "painting").length;
                          break;
                        case "Drawings":
                          totalItems = arts.filter((art) => art.type === "drawing").length;
                          break;
                        case "Sketches":
                          totalItems = arts.filter((art) => art.type === "sketch").length;
                          break;
                        case "Book Covers":
                          totalItems = bookcovers.length;
                          break;
                        case "Posters":
                          totalItems = posters.length;
                          break;
                        case "Illustrations & Cards":
                          totalItems = illustrations.length;
                          break;
                        // Include other categories with their respective logic for totalItems
                        default:
                          totalItems = 0; // Handle any categories not explicitly mentioned
                      }

                      const totalPages = Math.ceil(totalItems / itemsPerPage);
                      const isLastPage = currentPage >= totalPages;

                      return (
                        <div
                          className={`flex flex-row gap-2 items-center ${
                            isLastPage ? "cursor-not-allowed text-zinc-800 hover:text-zinc-900" : "cursor-pointer"
                          }`}
                          onClick={!isLastPage ? handleNextPage : undefined}
                        >
                          <h1 className={`text-2xl lg:block hidden ${isLastPage ? "" : "text-zinc-300 hover:text-white"}`}>
                            Next Page
                          </h1>
                          <FaArrowRightLong className={`lg:text-2xl text-4xl ${isLastPage ? "" : "text-white"}`} />
                        </div>
                      );
                    })()
                  }


                </div>
              </div>

            </div>
            ):(
              // Search Screen
              <div className="grid lg:grid-cols-3 grid-cols-2 gap-2 items-center justify-center mt-12">
                {isSearchLoading ? (
                  <div className="flex justify-center items-center mt-64 mx-auto col-span-3">
                    <AiOutlineLoading className="animate-spin text-7xl font-bold text-white" />
                  </div>
                ) : (
                  Object.entries(groupedResults).map(([source, items]) => (
                    <div key={source} className="col-span-3">
                      <h2 className="text-2xl font-bold mb-4">{source}</h2>
                      <div className="grid lg:grid-cols-3 grid-cols-2 gap-2 items-center justify-center">
                        {items.map((result, index) => (
                          <div key={index} className="anim-appear-3">
                            {result.source!=="Writing" ? (
                              <a
                                data-fancybox
                                data-src={`${result.imageUrl}`}
                                data-caption={`<div style='text-align: center;'>${result.title}<br><div style='color: #fde68a;'>${result.tags.join(', ')}<br>${result.tags_Bangla.join(', ')}</div></div>`}
                              >
                                <Image
                                  src={result.imageUrl}
                                  alt={result.title}
                                  width={500}
                                  height={500}
                                  objectFit="cover"
                                  className="w-full lg:h-[25vw] h-[40vw] object-cover border-4 border-black mb-2 hover:scale-105"
                                />
                              </a>
                            ) : (
                              <div>
                                <Link href={`/category/writing/${result.id}`}>
                                  <div className="relative group cursor-pointer">
                                    {result.imageUrl ? (
                                      <Image
                                        src={result.imageUrl}
                                        alt={result.title_Bangla}
                                        width={500}
                                        height={500}
                                        objectFit="cover"
                                        className="w-full lg:h-[20vw] h-[35vw] object-cover border-4 border-black mb-2 transition-all duration-500 ease-in-out group-hover:brightness-[.2] group-hover:border-8"
                                      />
                                    ) : (
                                      <div className="w-full lg:h-[20vw] h-[35vw] flex items-center justify-center border-4 border-black mb-2 bg-gray-100 transition-all duration-500 ease-in-out group-hover:brightness-[0.2] group-hover:border-8 group-hover:text-gray-100 text-black">
                                        <span className="lg:text-4xl text-2xl font-bold z-50 text-center overflow-hidden text-ellipsis p-4">{result.title_Bangla}</span>
                                      </div>
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                      <h1 className="text-white text-3xl font-bold z-10 custom-font">View Writing</h1>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            )}

                            <div className="mb-2 custom-font">
                              <h1 className="text-center text-base font-bold px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                                {result.title}
                              </h1>
                              {result.source!=="Writing" ? (
                                <h1 className="text-center bangla-font text-base px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                                  ( {result.title_Bangla} )
                                </h1>
                              ) : (
                               <div>
                                 <h1 className="text-center bangla-font text-2xl px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                                   {result.title_Bangla}
                                 </h1>
                                 {isExtendedWriting(result) && (
                                    <div>
                                      <h1 className="text-center custom-font text-base px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                                        Written By: {result.writer_Bangla}
                                      </h1>
                                      <h1 className="text-center custom-font text-base px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                                        Published By: {result.publisher}
                                      </h1>
                                    </div>
                                  )}
                               </div>
                              )}
                              {'width' in result && 'height' in result ? (
                                <h1 className="text-center text-xs px-1">
                                  {result.width} cm X {result.height} cm
                                </h1>
                              ) : 'publisher_Bangla' in result ? (
                                <h1 className="text-center text-xs px-1">
                                  {result.publisher_Bangla}
                                </h1>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        ):(<div></div>)}
      </div>
    </main>
  );
}
