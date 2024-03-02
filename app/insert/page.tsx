"use client";

import { useState } from "react";
import type { NextPage } from "next";
import "../../styles/home.css";
import useAuth from "../../hooks/useAuth";
import { Login } from "../../components/login";

const AddArt: NextPage = () => {
  const { isAuthenticated, login, logout } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    title_Bangla: "",
    artist: "",
    year: "",
    year_Bangla: "",
    imageUrl: "",
    description: "",
    width: "",
    height: "",
    medium: "",
    medium_Bangla: "",
    type: "",
    publication: "",
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
        console.log(response);
        alert("Artwork added successfully");
        setFormData({
          title: "",
          title_Bangla: "",
          artist: "",
          year: "",
          year_Bangla: "",
          imageUrl: "",
          description: "",
          width: "",
          height: "",
          medium: "",
          medium_Bangla: "",
          type: "",
          publication: "",
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
        <h2 className="text-4xl font-bold custom-font border-b border-black lg:mb-2 mb-8 text-center">
          Add New Artwork
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-row bg-orange-100 lg:p-8 lg:pt-2 pt-4 p-4 rounded-xl drop-shadow-md lg:space-x-8 space-x-4 lg:m-8 m-0"
        >
          <div className="mx-2 w-1/2">
            <div className="py-2">
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
            <div className="py-2">
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
            <div className="py-2">
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
            <div className="py-2">
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
            <div className="py-2">
              <label>
                Year (Bangla):
                <input
                  className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                  type="text"
                  name="year_Bangla"
                  value={formData.year_Bangla}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="py-2">
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
            <div className="py-2">
              <label>
                Description (Bangla):
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
            <div className="py-2">
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
            <div className="py-2">
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
            <div className="py-2">
              <label>
                Medium:
                <input
                  className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                  type="text"
                  name="medium"
                  value={formData.medium}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="py-2">
              <label>
                Medium (Bangla):
                <input
                  className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                  type="text"
                  name="medium_Bangla"
                  value={formData.medium_Bangla}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="py-2">
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
            <div className="py-2">
              <label>
                Publication (Bangla):
                <input
                  className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                  type="text"
                  name="publication"
                  value={formData.publication}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="py-2">
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
            <div className="py-2">
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
