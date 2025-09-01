"use client";
import React, { useEffect, useState } from "react";
import { Modal, notification, Spin } from "antd";
import Loader from "../components/Loader";
import { deleteMovie, getMovies } from "../api";
import Link from "next/link";
import Image from "next/image";

// Define the shape of a Movie
interface Movie {
  _id: string;
  title: string;
  description: string;
}

// Define the shape of User
interface User {
  role?: string;
  [key: string]: any; // fallback for other unknown props
}

export default function Movies() {
  // const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // state types
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [delLoading, setDelLoading] = useState<boolean>(false);
  const [movieId, setMovieId] = useState<string | null>(null);

  useEffect(() => {
    const allMovies = async () => {
      setIsLoading(true);
      try {
        const result = await getMovies();
        // Adjust according to your API response
        setMovies(result?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    allMovies();
  }, []);

  const handleDelete = async () => {
    try {
      if (!movieId) return;
      setDelLoading(true);
      const response = await deleteMovie(movieId);
      if (response?.success) {
        notification.success({
          message: "Success",
          description: response.message,
          duration: 3,
        });
        const result = await getMovies();
        setMovies(result?.data || []);
      } else {
        notification.error({
          message: "Failed",
          description: response.message,
          duration: 3,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDelLoading(false);
      setVisibleModal(false);
    }
  };

  const handleShowModal = (movieId: string) => {
    setVisibleModal(true);
    setMovieId(movieId);
  };

  const handleModalClose = () => {
    setVisibleModal(false);
    setMovieId(null);
  };

  return (
    <div>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Spin />
        </div>
      ) : (
        <div className="m-5 flex flex-col gap-5">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-3">
            Now Selling
          </h1>
          <div className="flex flex-col gap-5">
            {movies.map((movie, index) => (
              <div
                key={movie._id || index}
                className="flex flex-row w-[800px] border-t border-r border-b p-1 border-gray-200 rounded-lg "
              >
                <Link href={`/movieDetails/${movie._id}`}>
                  <Image
                    className="rounded-t-lg w-[200px]"
                    // src="/public/image.avif"
                    src="https://www.universalorlando.com/webdata/k2/en/us/files/Images/gds/uor-wwohp-logo-3-kids-clouds-key-art-hero-b.jpg"
                    alt=""
                    width={200}
                    height={50}
                  />
                </Link>
                <div className="p-5">
                  <Link href={`/movieDetails/${movie._id}`}>
                    <h5 className="inline-flex line-clamp-1 mb-2 text-2xl font-bold tracking-tight text-white">
                      {movie.title}
                    </h5>
                  </Link>
                  <p className="w-[500px] line-clamp-1 mb-3 font-normal text-gray-700 text-white">
                    {movie.description}
                  </p>
                  <Link
                    href={`/movieDetails/${movie._id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    More Details
                  </Link>
                </div>
                {user?.role === "Admin" && (
                  <div className="flex flex-col justify-between p-4">
                    <button
                      disabled
                      className="uppercase px-4 h-[40px] rounded-[4px] transition-transform transform active:scale-95 border border-[#FFBF00] font-sans font-semibold text-[14px] text-[#2C363F]"
                    >
                      update
                    </button>
                    <button
                      className="uppercase px-4 h-[40px] transition-transform transform active:scale-95 rounded-[4px] bg-[#EC0303] font-sans font-semibold text-[14px] text-white"
                      onClick={() => handleShowModal(movie._id)}
                    >
                      delete
                    </button>
                  </div>
                )}
                <Modal
                  open={visibleModal}
                  onCancel={handleModalClose}
                  centered={true}
                  footer={null}
                >
                  <div className="flex flex-col justify-center items-center p-10 gap-4">
                    <p className="text-4xl font-semibold">DELETE</p>
                    <p>Are you sure you want to delete this movie?</p>
                    <div className="grid gap-4 grid-cols-2 items-center w-[95%] my-2">
                      <button
                        onClick={handleModalClose}
                        className="h-[44px] rounded-[4px] transition-transform transform active:scale-95 border border-[#FFBF00] font-sans font-semibold text-[14px] text-[#2C363F]"
                      >
                        CANCEL
                      </button>

                      <button
                        onClick={handleDelete}
                        className="h-[44px] transition-transform transform active:scale-95 rounded-[4px] bg-[#EC0303] font-sans font-semibold text-[14px] text-white"
                      >
                        {delLoading ? <Loader /> : "CONFIRM"}
                      </button>
                    </div>
                  </div>
                </Modal>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
