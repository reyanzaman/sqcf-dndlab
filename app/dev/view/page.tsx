"use client";

import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import axios from "axios";
import "../../../styles/home.css";
import useAuth from "../../../hooks/useAuth";
import { Login } from "../../../components/login";
import Image from "next/image";
import Link from "next/link";

interface Art {
  id: string;
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

const ViewArt: NextPage = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const [arts, setArts] = useState<Art[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchArts = async () => {
      try {
        const response = await axios.get("/api/getAllArt"); // Ensure this URL matches your API route
        setArts(response.data);
      } catch (error) {
        console.error("Failed to fetch arts:", error);
      }
    };

    if (isAuthenticated) {
      fetchArts();
    }
  }, [isAuthenticated, refreshKey]);

  const handleSubmit2 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
  };

  const handlerefresh = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRefreshKey((prevKey) => prevKey + 1);
    console.log("Refreshed", refreshKey);
  };

  if (isAuthenticated) {
    return (
      <div className="">
        <div className="flex-row flex justify-between items-center">
            <h1 className="m-2 text-4xl font-bold">SQCF ART GALLERY</h1>
            <Link href="/dev/insert"
            className="bg-emerald-950 text-white custom-font text-2xl px-4 py-1 rounded drop-shadow-lg mx-4"
            >Back</Link>
        </div>
        <hr className="border-b-2 border-black mt-2 mb-4 w-full"></hr>

        <div className="grid lg:grid-cols-8 grid-cols-2">
            <h1 className="m-1 text-sm font-bold mx-4 border-2 border-black p-2 shadow-lg bg-orange-100">Art Count: {arts.length}</h1>
            <h1 className="m-1 text-sm font-bold mx-4 border-2 border-black p-2 shadow-lg bg-rose-100">Painting Count: {arts.filter(art => art.type === "painting" || art.type === "Painting").length}</h1>
            <h1 className="m-1 text-sm font-bold mx-4 border-2 border-black p-2 shadow-lg bg-green-100">Drawing Count: {arts.filter(art => art.type === "drawing" || art.type === "Drawing").length}</h1>
            <h1 className="m-1 text-sm font-bold mx-4 border-2 border-black p-2 shadow-lg bg-amber-100">Sketch Count: {arts.filter(art => art.type === "sketch" || art.type === "Sketch").length}</h1>
            <h1 className="m-1 text-sm font-bold mx-4 border-2 border-black p-2 shadow-lg bg-yellow-100">Graphics Design Count: 0</h1>
            <h1 className="m-1 text-sm font-bold mx-4 border-2 border-black p-2 shadow-lg bg-fuchsia-100">Book Cover Count: {arts.filter(art => art.type === "book cover" || art.type === "Book cover").length}</h1>
            <h1 className="m-1 text-sm font-bold mx-4 border-2 border-black p-2 shadow-lg bg-pink-100">Poster  Count: {arts.filter(art => art.type === "poster" || art.type === "Poster").length}</h1>
            <h1 className="m-1 text-sm font-bold mx-4 border-2 border-black p-2 shadow-lg bg-emerald-100">Illustration & Cards Count: {arts.filter(art => art.type === "Illustration & cards" || art.type === "illustration & cards").length}</h1>
        </div>

        <div className="overflow-x-scroll m-4 border-4 border-black h-[75dvh]">
          <table className="bg-slate-200 min-w-full ">
            <thead className="text-left align-top border-2">
              <tr>
                <th className="border-2 border-black px-4 py-2">Image</th>
                <th className="border-2 border-black px-4 py-2">ID</th>
                <th className="border-2 border-black px-4 py-2">Title</th>
                <th className="border-2 border-black px-4 py-2">
                  Title (Bangla)
                </th>
                <th className="border-2 border-black px-4 py-2">Artist</th>
                <th className="border-2 border-black px-4 py-2">Year</th>
                <th className="border-2 border-black px-4 py-2">
                  Year (Bangla)
                </th>
                <th className="border-2 border-black px-4 py-2">Image URL</th>
                <th className="border-2 border-black px-4 py-2">Description</th>
                <th className="border-2 border-black px-4 py-2">Width</th>
                <th className="border-2 border-black px-4 py-2">Height</th>
                <th className="border-2 border-black px-4 py-2">Medium</th>
                <th className="border-2 border-black px-4 py-2">
                  Medium (Bangla)
                </th>
                <th className="border-2 border-black px-4 py-2">Type</th>
                <th className="border-2 border-black px-4 py-2">Publication</th>
                <th className="border-2 border-black px-4 py-2">Tags</th>
                <th className="border-2 border-black px-4 py-2">
                  Tags (Bangla)
                </th>
              </tr>
            </thead>
            <tbody className="text-left bg-slate-50">
              {arts.map((art) => (
                <tr key={art.id}>
                  <td className="border-2 border-black p-4"><div className="w-[200px]"><Image src={art.imageUrl} alt={art.title} width={250} height={250} objectFit="contain" className="h-auto w-min-[250px]"/></div></td>

                  <td className="border-2 border-black px-4 py-1"><div className="h-max-[20rem] h-min-fit w-min-fit w-max-[25rem]">{art.id}</div></td>
                  <td className="border-2 border-black px-4 py-1"><div className="h-max-[20rem] h-min-fit w-min-fit w-max-[25rem]">{art.title}</div></td>
                  <td className="border-2 border-black px-4 py-1"><div className="h-max-[20rem] h-min-fit w-min-fit w-max-[25rem]">{art.title_Bangla}</div></td>
                  <td className="border-2 border-black px-4 py-1"><div className="h-max-[20rem] h-min-fit w-min-fit w-max-[25rem]">{art.artist}</div></td>
                  <td className="border-2 border-black px-4 py-1"><div className="h-max-[20rem] h-min-fit w-min-fit w-max-[25rem]">{art.year}</div></td>
                  <td className="border-2 border-black px-4 py-1"><div className="h-max-[20rem] h-min-fit w-min-fit w-max-[25rem]">{art.year_Bangla}</div></td>
                  <td className="border-2 border-black px-4 py-1"><div className="h-max-[20rem] h-min-fit w-min-fit w-max-[25rem]">{art.imageUrl}</div></td>
                  <td className="border-2 border-black px-4 py-1"><div className="h-max-[20rem] h-min-fit w-min-fit w-max-[25rem] text-justify">{art.description}</div></td>
                  <td className="border-2 border-black px-4 py-1"><div className="h-max-[20rem] h-min-fit w-min-fit w-max-[25rem]">{art.width}</div></td>
                  <td className="border-2 border-black px-4 py-1"><div className="h-max-[20rem] h-min-fit w-min-fit w-max-[25rem]">{art.height}</div></td>
                  <td className="border-2 border-black px-4 py-1"><div className="h-max-[20rem] h-min-fit w-min-fit w-max-[25rem]">{art.medium}</div></td>
                  <td className="border-2 border-black px-4 py-1"><div className="h-max-[20rem] h-min-fit w-min-fit w-max-[25rem]">{art.medium_Bangla}</div></td>
                  <td className="border-2 border-black px-4 py-1"><div className="h-max-[20rem] h-min-fit w-min-fit w-max-[25rem]">{art.type}</div></td>
                  <td className="border-2 border-black px-4 py-1"><div className="h-max-[20rem] h-min-fit w-min-fit w-max-[25rem]">{art.publication}</div></td>
                  <td className="border-2 border-black px-4 py-1"><div className="h-max-[20rem] h-min-fit w-min-fit w-max-[25rem]">{art.tags.join(", ")}</div></td>
                  <td className="border-2 border-black px-4 py-1"><div className="h-max-[20rem] h-min-fit w-min-fit w-max-[25rem]">{art.tags_Bangla.join(", ")}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-row justify-center items-center lg:mt-0 mt-4 mx-8 gap-x-6">
          <button
            className="bg-sky-800 text-white p-2 rounded-sm border border-black transform mb-4 w-[95%] drop-shadow-lg"
            onClick={handlerefresh}
          >
            Refresh
          </button>
          <button
            className="bg-rose-800 text-white p-2 rounded-sm border border-black transform mb-4 w-[95%] drop-shadow-lg"
            onClick={handleSubmit2}
          >
            Logout
          </button>
        </div>
      </div>
    );
  } else {
    return <Login onLogin={login} />;
  }
};

export default ViewArt;
