"use client";

import { useState } from "react";
import type { NextPage } from "next";
import "../../styles/home.css";
import useAuth from "../hooks/useAuth";
import { Login } from "../components/Login";

const AddArt: NextPage = () => {
  const { isAuthenticated, login, logout } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    title_Bangla: "",
    artist: "",
    year: "",
    imageUrl: "",
    description: "",
    width: "",
    height: "",
    Medium: "",
    Medium_Bangla: "",
    type: "",
    tags: "",
    tags_Bangla: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit2 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Convert tags to arrays
    const dataToSend = {
      ...formData,
      year: formData.year,
      width: parseInt(formData.width),
      height: parseInt(formData.height),
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      tags_Bangla: formData.tags_Bangla.split(",").map((tag) => tag.trim()),
    };

    try {
      const response = await fetch("/api/addArt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        console.log("Artwork added successfully");
        alert("Artwork added successfully");
        // Optionally reset form or redirect
        setFormData({
          title: "",
          title_Bangla: "",
          artist: "",
          year: "",
          imageUrl: "",
          description: "",
          width: "",
          height: "",
          Medium: "",
          Medium_Bangla: "",
          type: "",
          tags: "",
          tags_Bangla: "",
        });
      } else {
        console.error("Failed to add artwork");
        alert("Failed to add artwork");
      }
    } catch (error) {
      console.error("Failed to submit the form", error);
      alert("Failed to submit the form");
    }
  };

  if (isAuthenticated) {
    return (
      <div style={{ padding: "20px" }}>
        <h2 className="text-4xl font-bold custom-font border-b border-black mb-8 text-center">
          Add New Artwork
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-row bg-orange-100 p-8 rounded-xl drop-shadow-md mb-8 space-x-8"
        >
          <div className="mx-2 w-1/2">
            <div className="py-4">
              <label>
                Title (English):
                <input
                  className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="py-4">
              <label>
                Title (Bangla):
                <input
                  className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                  type="text"
                  name="title_Bangla"
                  value={formData.title_Bangla}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="py-4">
              <label>
                Artist (Bangla):
                <input
                  className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                  type="text"
                  name="artist"
                  value={formData.artist}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="py-4">
              <label>
                Year (English):
                <input
                  className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="py-4">
              <label>
                Image URL:
                <input
                  className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="py-4">
              <label>
                Description:
                <textarea
                  className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="">
              <button
                className="bg-orange-200 p-2 rounded-sm border border-black transform translate-y-4 mb-4 w-[10em]"
                type="submit"
                style={{ marginTop: "10px" }}
              >
                Submit
              </button>
            </div>
          </div>
          <div className="mx-2 w-1/2">
            <div className="py-4">
              <label>
                Width (English) (cm):
                <input
                  className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                  type="number"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="py-4">
              <label>
                Height (English) (cm):
                <input
                  className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="py-4">
              <label>
                Medium:
                <input
                  className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                  type="text"
                  name="Medium"
                  value={formData.Medium}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="py-4">
              <label>
                Medium (Bangla):
                <input
                  className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                  type="text"
                  name="Medium_Bangla"
                  value={formData.Medium_Bangla}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="py-4">
              <label>
                Type (English):
                <input
                  className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="py-4">
              <label>
                Tags (English, comma-separated):
                <input
                  className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="py-4">
              <label>
                Tags (Bangla, comma-separated):
                <input
                  className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                  type="text"
                  name="tags_Bangla"
                  value={formData.tags_Bangla}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          </div>
        </form>

        <button
          className="bg-rose-800 text-white p-2 rounded-sm border border-black transform translate-y-4 mb-4 w-full"
          onClick={handleSubmit2}
        >
          Logout
        </button>
      </div>
    );
  } else {
    return <Login onLogin={login} />;
  }
};

export default AddArt;
