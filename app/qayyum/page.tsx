"use client";

import Image from "next/image";
import Link from "next/link";
import "../../styles/innerPage.css";
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

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isReady, setIsReady] = useState(false);

  const specificArtIdArray = [
    "5f84f014-cdbb-45fa-822f-8e803ce86e14",
    "7b676e6c-d861-4e3c-a556-bb8b5f0f981b",
    "f8e00d90-fa2a-425b-92a4-98759c82a7b9",
    "1b3b0b87-faf3-44e2-ae8a-5e1c51444e1a",
    "c6860657-8d4d-4389-a5c3-1e1ff3bb6abf",
    "da7494bb-5ada-4e0c-a6f1-84b374b1c0d3",
    "519f069e-86a8-4d78-9019-0008dc3e2e58",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 2500);

    const preloadImages = (arts: Art[]) => {
      const loadImage = (src: string) => new Promise((resolve, reject) => {
        const img = new window.Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
      // Map each art object to a loadImage promise
      const imagePromises = arts.map(art => loadImage(art.imageUrl));
      // Use Promise.all to wait for all images to be loaded
      return Promise.all(imagePromises);
    };

    const fetchData = async () => {
      try {
        const fetchPromises = specificArtIdArray.map(id =>
          fetch(`/api/getArt?id=${id}`).then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
        );
        const results = await Promise.all(fetchPromises);
        setArts(results);
        preloadImages(results);
      } catch (error) {
        console.error('Failed to fetch arts:', error);
        setError('Failed to load artworks. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => clearTimeout(timer);
  }, []);

  if (!isReady || isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen />;

  Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });

  return <main className="bg-[#000000] h-[100dvh] w-[100dvw] text-white p-8">
    <div className="h-full w-full flex flex-col items-center justify-center">
        <div>
          <h1 className="text-5xl text-center">Under Development</h1>
        </div>
    </div>
  </main>;
}
