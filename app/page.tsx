"use client";
import React, { useEffect, useState } from "react";
// import { getMovies } from "../api";
import { Spin } from "antd";
import Link from "next/link";
import { getMovies } from "./api";

export default function Home() {
  const [movies, setMovies] = useState([] as any);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // const getMovies = null as any; // Replace with actual import or implementation
    const allMovies = async () => {
      setIsLoading(true);
      try {
        const result = await getMovies();
        setMovies(result);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    // console.log(movies);
    allMovies();
    // setIsLoading(false);
  }, []);
  return (
    <div className="">
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Spin />
        </div>
      ) : (
        <>
          <div className="m-5 flex flex-col gap-5">
            <div>
              <h1 className="text-3xl lg:text-4xl font-semibold mb-3">
                Now Selling
              </h1>
              <div className="flex p-5 gap-5 flex-wrap border border-black rounded-lg">
                {movies?.data
                  ?.filter((movie : any) => movie.type !== "Coming Soon")
                  .map((movie : any, index : number) => (
                    <div
                      key={index}
                      className="w-[280px] justify-center border border-gray-200 rounded-lg shadow"
                    >
                      <Link href={`/movieDetails/${movie._id}`} id={movie._id}>
                        <img
                          className="rounded-t-lg"
                          src="/src/image/MRS.png"
                          alt=""
                        />
                      </Link>
                      <div className="p-5">
                        <Link href={`/movieDetails/${movie._id}`} id={movie._id}>
                          <h5 className="inline-flex mb-2 line-clamp-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {movie.title}
                          </h5>
                        </Link>
                        <p className="mb-3 line-clamp-2 font-normal text-gray-700 dark:text-gray-400">
                          {movie.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-semibold mb-3">
                Coming Soon
              </h1>
              <div className="flex p-5 gap-5 flex-wrap border border-black rounded-lg">
                {/* Here is a problem in the condition.So, next time i will fix this issue. */}
                {movies?.data
                  ?.filter((movie : any) => movie.type !== "Selling")
                  .map((movie : any, index : number) => (
                    <div
                      key={index}
                      className="w-[280px] justify-center border border-gray-200 rounded-lg shadow"
                    >
                      <Link href={`/movieDetails/${movie._id}`} id={movie._id}>
                        <img
                          className="rounded-t-lg"
                          src="/src/image/MRS.png"
                          alt=""
                        />
                      </Link>
                      <div className="p-5">
                        <Link href={`/movieDetails/${movie._id}`} id={movie._id}>
                          <h5 className="mb-2 line-clamp-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {movie.title}
                          </h5>
                        </Link>
                        <p className="mb-3 line-clamp-2 font-normal text-gray-700 dark:text-gray-400">
                          {movie.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
