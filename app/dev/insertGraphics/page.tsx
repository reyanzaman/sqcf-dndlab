"use client";

import React, { ChangeEvent, useState } from "react";
import type { NextPage } from "next";
import "../../../styles/home.css";
import useAuth from "../../../hooks/useAuth";
import { Login } from "../../../components/login";
import Papa from "papaparse";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const AddGraphics: NextPage = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const prisma = new PrismaClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("book_covers"); // Default category
  const [csvData, setCsvData] = useState([]);

  // Function to set filename
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
      setFileName(file.name); // Update the fileName state with the name of the file
      console.log(file.name);
    } else {
      // Reset the selected file and file name if no file is selected
      setSelectedFile(null);
      setFileName("No Supported File Uploaded"); // Clear the fileName if no file is selected
    }
  };

  const handleSubmit = async (selectedFile: File, selectedCategory: string) => {
    if (!selectedFile) {
      alert("Please upload a file first.");
      return;
    }

    // Function to read file content
    const readFile = (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
      });

    try {
      const fileContent = await readFile(selectedFile);
      let parseErrorOccurred = false;

      Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
        complete: async (result) => {
          // Depending on the selectedCategory, call the respective function to process and save the data
          console.log(selectedCategory);
          switch (selectedCategory) {
            case "book_covers":
              await processBookCovers(result.data);
              break;
            case "posters":
              await processPosters(result.data);
              break;
            case "illustration_cards":
              await processIllustrationCards(result.data);
              break;
            default:
              alert("Invalid category selected");
              console.error("Invalid category selected");
              parseErrorOccurred = true;
          }
        },
        error: (error: any) => {
          console.error("Error parsing CSV file:", error);
          alert("Error parsing CSV file. Please check the file format.");
          parseErrorOccurred = true;
        },
      });
    } catch (error) {
      console.error("Error reading file:", error);
      alert(
        `Error reading file: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  // Define your data processing functions
  async function processBookCovers(data: any[]) {
    const transformedData = data.map((item) => ({
      title: item["Book Name (English)"],
      title_Bangla: item["Book Name (Bangla)"],
      author: item["Author/Editor (English)"],
      author_Bangla: item["Author/Editor (Bangla)"],
      publisher: item["Publisher (English)"],
      publisher_Bangla: item["Publisher (Bangla)"],
      date: item["Publication date (English)"],
      date_Bangla: item["Publication date (Bangla)"],
      imageUrl: `https://dndlab-sqcf.s3.ap-southeast-1.amazonaws.com/${selectedCategory}/${item["Image File Name"]}.JPG`,
      description: item["Description"] ?? "",
      type: item["Type (English)"],
      type_Bangla: item["Type (Bangla)"],
      tags: item["Tags in English"].split(","),
      tags_Bangla: item["Tags in Bangla"].split(","),
    }));

    let errorOccurred = false;
    for (const data of transformedData) {
      try {
        const response = await fetch("/api/addBookCover", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          errorOccurred = true;
          throw new Error(`Error: ${response.statusText}`);
        }

        console.log("Book Cover added successfully", data);
      } catch (error: any) {
        console.error("Error adding book cover:", error);
        alert(`Error adding book cover: ${error.message}`);
        return;
      }
    }

    if (!errorOccurred) {
      alert("All book covers uploaded to database successfully");
    }
  }

  async function processPosters(data: any[]) {
    const transformedData = data.map((item) => {

      const measurement = item["Measurement in English"]
        .toUpperCase()
        .split("X")
        .map((dim: string) => dim.trim().replace(/ CM$/, ""));
      const [width, height] =
        measurement.length === 2 ? measurement : [null, null];

      return {
        title: item["Title in English"] ?? "",
        title_Bangla: item["Title in Bangla"] ?? "",
        imageUrl: `https://dndlab-sqcf.s3.ap-southeast-1.amazonaws.com/${selectedCategory}/${item["Image File Name"]}.JPG`,
        description: item["Description"] ?? "",
        category: item["Catagory"],
        year: item["Year of Publication in English"] ?? "",
        year_Bangla: item["Year of Publication in Bangla"] ?? "",
        for_whom: item["For Whom in Bangla"],
        width: width,
        height: height,
        tags: item["Tags in English"]
          .split(",")
          .map((tag: string) => tag.trim()),
        tags_Bangla: item["Tags in Bangla"]
          .split(",")
          .map((tag: string) => tag.trim()),
      };
    });

    let errorOccurred = false;
    for (const data of transformedData) {
      try {
        const response = await fetch("/api/addPoster", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          errorOccurred = true;
          throw new Error(`Error: ${response.statusText}`);
        }

        console.log("Posters added successfully", data);
      } catch (error: any) {
        console.error("Error adding Posters:", error);
        alert(`Error adding Posters: ${error.message}`);
        return;
      }
    }

    if (!errorOccurred) {
      alert("All Posters uploaded to database successfully");
    }
  }

  async function processIllustrationCards(data: any[]) {
    const transformedData = data.map((item) => ({
      title: item["Title in English"],
      title_Bangla: item["Title in Bangla"],
      subtitle: item["Sub Title in English"] ?? "",
      subtitle_Bangla: item["Sub Title"],
      publisher: item["Organization/Person/Publisher in English"] ?? "",
      publisher_Bangla: item["Organization/Person/Publisher"],
      year: item["Year in English"],
      year_Bangla: item["Year in Bangla"],
      imageUrl: `https://dndlab-sqcf.s3.ap-southeast-1.amazonaws.com/${selectedCategory}/${item["Image File Name"]}.JPG`,
      description: item["Description"] ?? "",
      tags: item["Tags in English"].split(",").map((tag: string) => tag.trim()),
      tags_Bangla: item["Tags in Bangla"]
        .split(",")
        .map((tag: string) => tag.trim()),
    }));

    let errorOccurred = false;
    for (const data of transformedData) {
      try {
        const response = await fetch("/api/addIllustration", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          errorOccurred = true;
          throw new Error(`Error: ${response.statusText}`);
        }

        console.log("Illustrations added successfully", data);
      } catch (error: any) {
        console.error("Error adding Illustrations:", error);
        alert(`Error adding Illustrations: ${error.message}`);
        return;
      }
    }

    if (!errorOccurred) {
      alert("All Illustrations uploaded to database successfully");
    }
  }

  // Logout Function
  const handleSubmit2 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
  };

  // Storing category in state
  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  if (isAuthenticated) {
    return (
      <div style={{ padding: "20px" }} className="text-white">
        <h2 className="text-4xl font-bold custom-font lg:mb-2 mb-8 text-center">
          Insert New Graphics Design
        </h2>

        {/* Automated Submission */}

        <hr className="my-8 border-b-2 border-orange-800" />

        <div className="lg:grid-cols-2 grid-cols-1 flex flex-col lg:gap-y-6 gap-y-4 items-center justify-center">
          <h1 className="text-4xl font-bold text-center">
            Automated insert using csv file
          </h1>
          <div className="text-white text-xl">
            {fileName ? fileName : "No File Uploaded"}
          </div>{" "}
          {/* Display the uploaded file name */}
          <div className="flex flex-row gap-x-4 items-center justify-cente text-black">
            <label className="bg-orange-200 p-2 rounded-sm border border-black w-[10em] cursor-pointer text-center my-auto">
              Upload
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
            <button
              className="bg-rose-300 text-black p-2 rounded-sm border border-black w-[10em] text-center mb-2"
              type="button" // Changed to type="button" to prevent form submission
              style={{ marginTop: "10px" }}
              onClick={() =>
                selectedFile && handleSubmit(selectedFile, selectedCategory)
              }
            >
              Submit
            </button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center my-4">
          <label htmlFor="category-select">Choose a category:</label>
          <select
            className="bg-pink-100 mx-2 rounded p-1 border-black border text-black"
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="book_covers">Book Covers</option>
            <option value="posters">Posters</option>
            <option value="illustration_cards">
              Illustrations &amp; Cards
            </option>
          </select>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 lg:w-1/3 w-full mx-auto">
          <div className="text-center pb-4 pt-8">
            <Link
              href="/dev/view"
              className="text-2xl font-bold custom-font bg-sky-950 text-white p-3 rounded-xl text-center px-6 drop-shadow-lg"
            >
              VIEW DATA
            </Link>
          </div>

          <div className="text-center pb-4 pt-8">
            <Link
              href="/dev/insertArt"
              className="text-2xl font-bold custom-font bg-indigo-600 text-white p-3 rounded-xl text-center px-6 drop-shadow-lg"
            >
              INSERT ART
            </Link>
          </div>
        </div>

        <hr className="my-8 border-b-2 border-orange-800" />

        {/* Logout */}

        <div className="flex justify-center items-center lg:mt-0 mt-4">
          <button
            className="bg-rose-800 text-white p-2 rounded-sm border border-black transform mb-4 w-[95%]"
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

export default AddGraphics;
