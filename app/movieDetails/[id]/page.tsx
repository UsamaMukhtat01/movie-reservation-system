"use client";
import React, { useEffect, useState } from "react";
import { getMovieDetail } from "../../api";
import { Spin } from "antd";
import Image from "next/image";

// Define types for API response
interface ShowTime {
  date: string;
  time: string;
  capacity: number;
  reservedSeats: number;
}

interface MovieData {
  title: string;
  description: string;
  genres: string[];
  type: string;
  showTime: ShowTime[];
}

interface MovieResponse {
  success: boolean;
  data: MovieData;
  message?: string;
}

interface MoviesDetailsProps {
  params: {
    id: string;
  };
}

export default function MoviesDetails({ params }: MoviesDetailsProps) {
  const { id } = params;
  const [movie, setMovieDetail] = useState<MovieResponse | null>(null);

  useEffect(() => {
    const movieDetail = async () => {
      try {
        const result: MovieResponse = await getMovieDetail(id);
        setMovieDetail(result);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    movieDetail();
  }, [id]);

  if (!movie) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spin />
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="flex flex-col px-[70px] gap-3">
        <div className="flex flex-col">
          <Image
            className="w-full h-[80vh] object-cover"
            src="https://www.universalorlando.com/webdata/k2/en/us/files/Images/gds/uor-wwohp-logo-3-kids-clouds-key-art-hero-b.jpg"
            alt="Movie poster"
            width={1000}
            height={1000}
          />
        </div>
        <p className="text-4xl font-semibold">{movie.data.title}</p>
        <p className="border-b-2 mb-4">{movie.data.description}</p>

        <div className="grid grid-cols-2 gap-3">
          {movie.data.genres.map((genre, index) => (
            <div key={index} className="flex gap-4 border-b-2">
              <p className="font-semibold">Genres:</p>
              <p>{genre}</p>
            </div>
          ))}

          <div className="flex gap-4 border-b-2">
            <p className="font-semibold">Type:</p>
            <p>{movie.data.type}</p>
          </div>

          {movie.data.showTime.map((show, index) => (
            <div key={`date-${index}`} className="flex gap-4 border-b-2">
              <p className="font-semibold">Watch on:</p>
              <p>{new Date(show.date).toLocaleDateString()}</p>
            </div>
          ))}

          {movie.data.showTime.map((show, index) => (
            <div key={`time-${index}`} className="flex gap-4 border-b-2">
              <p className="font-semibold">Time:</p>
              <p>{show.time}</p>
            </div>
          ))}

          {movie.data.showTime.map((show, index) => (
            <div key={`capacity-${index}`} className="flex gap-4 border-b-2">
              <p className="font-semibold">Seat Capacity:</p>
              <p>{show.capacity}</p>
            </div>
          ))}

          {movie.data.showTime.map((show, index) => (
            <div key={`reserved-${index}`} className="flex gap-4 border-b-2">
              <p className="font-semibold">Reserved Seats:</p>
              <p>{show.reservedSeats}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
