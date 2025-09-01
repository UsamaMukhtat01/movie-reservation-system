"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { createMovie } from "../api";
import { notification, Select } from "antd";
import Loader from "../components/Loader";
import { useRouter } from "next/navigation";

const { Option } = Select;

// Types for the movie form
interface MovieFormData {
  title: string;
  description: string;
  genres: string;
  capacity: number;
  time: string;
  date: string;
}

interface ShowTime {
  date: string;
  time: string;
  capacity: number;
  reservedSeats: string | number;
}

interface CreateMovieResponse {
  success: boolean;
  message: string;
}

export default function CreateMovie() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<MovieFormData>({
    title: "",
    description: "",
    genres: "",
    capacity: 0,
    time: "",
    date: "",
  });
  const [movieType, setMovieType] = useState<string>("Selling");
  const navigate = useRouter();

  const showTime: ShowTime[] = [
    {
      date: formData.date,
      time: formData.time,
      capacity: formData.capacity,
      reservedSeats: "",
    },
  ];

  const requestBody = {
    title: formData.title,
    description: formData.description,
    genres: formData.genres.split(",").map((g) => g.trim()), // store as array
    showTime,
    type: movieType,
  };

  const handleAddMovie = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response: CreateMovieResponse = await createMovie(requestBody);
      setIsLoading(false);

      if (response.success) {
        notification.success({
          message: "Successful",
          description: response.message,
          duration: 3,
        });
        navigate.push("/movies");
      } else {
        notification.error({
          message: "Failed",
          description: response.message,
          duration: 3,
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      notification.error({
        message: "Failed",
        description: error.message || "Something went wrong",
        duration: 3,
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "capacity" ? Number(value) : value,
    }));
  };

  const handleMovieType = (value: string) => {
    setMovieType(value);
  };

  return (
    <div className="">
      <div className="w-[] px-20 pb-10">
        <h1 className="font-semibold text-4xl py-10">Add New Movie</h1>

        <form onSubmit={handleAddMovie} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Title */}
            <div className="flex justify-between items-center">
              <label>Title:</label>
              <input
                onChange={handleChange}
                name="title"
                type="text"
                className="w-[70%] border border-red-900 rounded-md p-2"
                placeholder="Title..."
                required
              />
            </div>

            {/* Genres */}
            <div className="flex justify-between items-center">
              <label>Genres:</label>
              <input
                onChange={handleChange}
                name="genres"
                className="w-[70%] border border-red-900 rounded-md p-2"
                placeholder="Genres (comma separated)..."
                required
              />
            </div>

            {/* Capacity */}
            <div className="flex justify-between items-center">
              <label>Seat Capacity:</label>
              <input
                onChange={handleChange}
                name="capacity"
                type="number"
                className="w-[70%] border border-red-900 rounded-md p-2"
                placeholder="10000"
                required
              />
            </div>

            {/* Time */}
            <div className="flex justify-between items-center">
              <label>Time to Show:</label>
              <input
                onChange={handleChange}
                name="time"
                className="w-[70%] border border-red-900 rounded-md p-2"
                placeholder="HH:mm"
                required
              />
            </div>

            {/* Date */}
            <div className="flex justify-between items-center">
              <label>Date:</label>
              <input
                name="date"
                onChange={handleChange}
                type="date"
                className="w-[70%] border border-red-900 rounded-md p-2"
                required
              />
            </div>

            {/* Type */}
            <div className="flex justify-between items-center">
              <label>Type:</label>
              <Select
                value={movieType}
                placeholder="Selling"
                onChange={handleMovieType}
                style={{ width: 200 }}
              >
                <Option value="Selling">Selling</Option>
                <Option value="Coming Soon">Coming Soon</Option>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="flex justify-between">
            <label>Description:</label>
            <textarea
              name="description"
              rows={4}
              className="lg:w-[85.5%] w-[70%] p-2 border border-red-900 rounded-md"
              placeholder="Description..."
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit */}
          <div className="">
            <button
              type="submit"
              className="hover:opacity-85 bg-gradient-to-bl from-[#296192] to-[#1d4d77] py-3 px-[150px] border border-gray-900 rounded-md text-white font-semibold"
            >
              {isLoading ? <Loader /> : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
