"use client";

import React, { ChangeEvent, useState } from 'react';
import type { NextPage } from "next";
import "../../../styles/home.css";
import useAuth from "../../../hooks/useAuth";
import { Login } from "../../../components/login";

const AddWriting: NextPage = () => {
  const { isAuthenticated, login, logout } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    title_Bangla: "",
    subtitle: "",
    subtitle_Bangla: "",
    publisher: "",
    publisher_Bangla: "",
    link: "",
    writer: "",
    writer_Bangla: "",
    category: "", //Poem, Prose etc.
    type: "", //By QC or On QC etc.
    day: "",
    day_Bangla: "",
    month: "",
    month_Bangla: "",
    year: "",
    year_Bangla: "",
    imageUrl: "",
    imageAlt: "",
    text: "",
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
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      tags_Bangla: formData.tags_Bangla.split(",").map((tag) => tag.trim()),
    };

    try {
      const response = await fetch("/api/addWriting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        console.log(response);
        setFormData({
          title: "",
          title_Bangla: "",
          subtitle: "",
          subtitle_Bangla: "",
          publisher: "",
          publisher_Bangla: "",
          link: "",
          writer: "",
          writer_Bangla: "",
          category: "", //Poem, Prose etc.
          type: "", //By QC or On QC etc.
          day: "",
          day_Bangla: "",
          month: "",
          month_Bangla: "",
          year: "",
          year_Bangla: "",
          imageUrl: "",
          imageAlt: "",
          text: "",
          tags: "",
          tags_Bangla: "",
        });
        alert("Writing added successfully");
      } else {
        console.error("Failed to add Writing");
        alert("Failed to add Writing");
      }
    } catch (error) {
      console.error("Failed to submit the form", error);
      alert("Failed to submit the form");
    }
  };


  if (isAuthenticated) {
    return (
      <div style={{ padding: "20px" }} className='text-white'>
        {/* Header */}
        <h2 className="text-4xl font-bold custom-font border-b border-black lg:mb-2 mb-8 text-center">
          Add New Writings Manually
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-orange-100 lg:p-8 lg:pt-2 pt-4 p-4 rounded-xl drop-shadow-md lg:m-8 m-0 text-black"
        >
          <div className='flex flex-row lg:space-x-8 space-x-4'>
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
                  />
                </label>
              </div>
              <div className="py-2">
                <label>
                  Subtitle:
                  <textarea
                    className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="py-2">
                <label>
                  Subtitle (Bangla):
                  <textarea
                    className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                    name="subtitle_Bangla"
                    value={formData.subtitle_Bangla}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="py-2">
                <label>
                  Publisher:
                  <input
                    className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                    type="text"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="py-2">
                <label>
                  Publisher (Bangla):
                  <input
                    className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                    name="publisher_Bangla"
                    value={formData.publisher_Bangla}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="py-2">
                <label>
                  Text Link:
                  <input
                    className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="py-2">
                <label>
                  Writer:
                  <input
                    className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                    name="writer"
                    value={formData.writer}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="py-2">
                <label>
                  Writer (Bangla):
                  <input
                    className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                    name="writer_Bangla"
                    value={formData.writer_Bangla}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="py-2">
                <label>
                  Category (Poem, Prose, etc.):
                  <input
                    className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="py-2">
                <label>
                  Type (By QC, On QC, etc.):
                  <input
                    className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <div className="mx-2 w-1/2">
              <div className="py-2">
                <label>
                  Day:
                  <input
                    className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                    type="text"
                    name="day"
                    value={formData.day}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="py-2">
                <label>
                  Day (Bangla):
                  <input
                    className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                    type="text"
                    name="day_Bangla"
                    value={formData.day_Bangla}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="py-2">
                <label>
                  Month:
                  <input
                    className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                    type="text"
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="py-2">
                <label>
                  Month (Bangla):
                  <input
                    className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                    type="text"
                    name="month_Bangla"
                    value={formData.month_Bangla}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="py-2">
                <label>
                  Year:
                  <input
                    className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
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
                  />
                </label>
              </div>
              <div className="py-2">
                <label>
                  Image Description:
                  <input
                    className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                    type="text"
                    name="imageAlt"
                    value={formData.imageAlt}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="py-2">
                <label>
                  Writing Text:
                  <textarea
                    className="rounded-sm p-2 text-left w-full bg-orange-50 drop-shadow-sm"
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
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
                  />
                </label>
              </div>
            </div>
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
        </form>

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

export default AddWriting;
