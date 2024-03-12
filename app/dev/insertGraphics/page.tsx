"use client";

import React, { ChangeEvent, useState } from 'react';
import type { NextPage } from "next";
import "../../../styles/home.css";
import useAuth from "../../../hooks/useAuth";
import { Login } from "../../../components/login";
import Papa from 'papaparse';
import Link from 'next/link';

const AddArt: NextPage = () => {
  const { isAuthenticated, login, logout } = useAuth();

  // Automated System

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('drawings'); // Default category
  const [csvData, setCsvData] = useState([]);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  interface CsvRow {
    'Title (English)': string;
    'Title (Bangla)': string;
    'Description': string;
    'Year (English)': string;
    'Year (Bangla)': string;
    'Image name': string;
    'Measurement': string;
    'Medium (English)': string;
    'Medium (Bangla)': string;
    'Type (English)': string;
    'Tags (English)': string;
    'Tags (Bangla)': string;
    [key: string]: string;
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
      setFileName(file.name); // Update the fileName state with the name of the file
      console.log(file.name)
    } else {
      // Reset the selected file and file name if no file is selected
      setSelectedFile(null);
      setFileName('No Supported File Uploaded'); // Clear the fileName if no file is selected
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please upload a file first.");
      return;
    } else {
      const readFile = (file: File): Promise<string | ArrayBuffer> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            // Check for the result and ensure it's not undefined. If undefined, resolve to an empty string as a fallback.
            const result = e.target?.result;
            resolve(result ?? "");
          };
          reader.onerror = (e) => reject(e);
          reader.readAsText(file);
        });

      try {
        const text = await readFile(selectedFile);
        let errorOccurred = false;

        if (typeof text === "string") {
          Papa.parse<CsvRow>(text, {
            header: true, // Now treating the first row as headers
            skipEmptyLines: true,
            complete: async (result) => {
              const transformedData = result.data.map((row) => {
                const imageUrl = `https://dndlab-sqcf.s3.ap-southeast-1.amazonaws.com/${selectedCategory}/${row["Image File Name"]}.JPG`;

                const measurement = row["Measurement in English"]
                  .toUpperCase()
                  .split("X")
                  .map((dim) => dim.trim().replace(/ CM$/, ""));
                const [width, height] =
                  measurement.length === 2 ? measurement : [null, null];

                return {
                  title: row["Title in English"],
                  title_Bangla: row["Title in Bangla"],
                  year: row["Year in English"],
                  year_Bangla: row["Year in Bangla"],
                  imageUrl,
                  description: row["Description"] ?? "",
                  width,
                  height,
                  medium: row["Media in English"],
                  medium_Bangla: row["Media in Bangla"],
                  type: row["Category in English"],
                  publication: row["Publication"] ?? "",
                  tags:
                    row["Tags in English"]
                      .split(",")
                      .map((tag) => tag.trim()) ?? [],
                  tags_Bangla:
                    row["Tags in Bangla"].split(",").map((tag) => tag.trim()) ??
                    [],
                };
              });

              for (const data of transformedData) {
                try {
                  const response = await fetch("/api/addArt", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                  });

                  if (!response.ok) {
                    errorOccurred = true;
                    throw new Error(
                      `Failed to add artwork: ${response.statusText}`
                    );
                  }

                  console.log("Artwork added successfully", data);
                } catch (error: any) {
                  console.error("Error adding artwork:", error);
                  alert(`Error adding artwork: ${error.message}`);
                  return; // Early return on first error
                }
              }

              if (!errorOccurred) {
                alert("All artwork uploaded to database successfully");
              }
            },
          });
        }
      } catch (error: any) {
        console.error("Error reading file:", error);
        alert(`Error reading file: ${error.message}`);
      }
    }
  };

  const handleSubmit2 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
  };

  if (isAuthenticated) {
    return (
      <div style={{ padding: "20px" }}>

        <h2 className="text-4xl font-bold custom-font lg:mb-2 mb-8 text-center">
          Insert New Graphics Design
        </h2>

        {/* Automated Submission */}

        <hr className="my-8 border-b-2 border-orange-800" />

        <div className="lg:grid-cols-2 grid-cols-1 flex flex-col lg:gap-y-6 gap-y-4 items-center justify-center">
          <h1 className="text-4xl font-bold text-center">Automated using csv file</h1>
          <div className='text-black text-xl'>{fileName ? fileName : 'No File Uploaded'}</div> {/* Display the uploaded file name */}
          <div className="flex flex-row gap-x-4 items-center justify-center">
            <label className="bg-orange-200 p-2 rounded-sm border border-black w-[10em] cursor-pointer text-center my-auto">
              Upload
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </label>
            <button
              className="bg-rose-300 p-2 rounded-sm border border-black w-[10em] text-center mb-2"
              type="button" // Changed to type="button" to prevent form submission
              style={{ marginTop: "10px" }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>

        <div className='flex flex-row items-center justify-center my-4'>
          <label htmlFor="category-select">Choose a category:</label>
          <select className='bg-pink-100 mx-2 rounded p-1 border-black border' id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="book_covers">Book Covers</option>
            <option value="posters">Posters</option>
            <option value="illustration_cards">Illustrations &amp; Cards</option>
          </select>
        </div>

        <div className='grid lg:grid-cols-2 grid-cols-1 lg:w-1/3 w-full mx-auto'>
            <div className='text-center pb-4 pt-8'>
                <Link href="/dev/view"
                className='text-2xl font-bold custom-font bg-sky-950 text-white p-3 rounded-xl text-center px-6 drop-shadow-lg'
                >VIEW DATA</Link>
            </div>

            <div className='text-center pb-4 pt-8'>
                <Link href="/dev/insertArt"
                className='text-2xl font-bold custom-font bg-indigo-600 text-white p-3 rounded-xl text-center px-6 drop-shadow-lg'
                >INSERT ART</Link>
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

export default AddArt;
