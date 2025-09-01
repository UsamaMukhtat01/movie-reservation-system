"use client";
import React, { useEffect, useState } from "react";
import { getMovieDetail } from "../../api";
import Loader from "../../components/Loader";
import { Spin } from "antd";

export default function MoviesDetails({params} : any) {
//   const { id } = params;
  const id  = params.id;
  console.log("params", params)
  const [movie, setMovieDetail] = useState({} as any);

  useEffect(() => {
    const movieDetail = async () => {
      try {
        const result = await getMovieDetail(id);
        setMovieDetail(result);
      } catch (error) {}
    };
    movieDetail();
  }, [id]);
  return (
    <div className="">
      <div>
        <p>
          {movie ? (
            <div className="p-5">
              <div className="flex flex-col px-[70px] gap-3">
                <div className="flex flex-col">
                  {/* <img src={movie?.data?.} alt="" /> */}
                  <img
                    className="w-full h-[80vh] object-cover"
                    src="/src/image/MRS.png"
                    alt=""
                  />
                </div>
                <p className="text-4xl font-semibold">{movie?.data?.title}</p>
                <p className="border-b-2 mb-4">{movie?.data?.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {movie?.data?.genres.map((genres : any, index : any) => (
                    <div className="flex gap-4 border-b-2">
                      <p className="font-semibold">Genres:</p>
                      <p className="">{genres}</p>
                    </div>
                  ))}
                    <div className="flex gap-4 border-b-2">
                      <p className="font-semibold">Type:</p>
                      <p className="">{movie?.data?.type}</p>
                    </div>
                  
                  {movie?.data?.showTime.map((data : any, index : any) => (
                    <div className="flex gap-4 border-b-2">
                      <p className="font-semibold">Watch on:</p>
                      <p className="">
                        {new Date(data.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                  {movie?.data?.showTime.map((data : any, index : any) => (
                    <div className="flex gap-4 border-b-2">
                      <p className="font-semibold">Time:</p>
                      <p className="">{data.time}</p>
                    </div>
                  ))}
                  {movie?.data?.showTime.map((data : any, index : any) => (
                    <div className="flex gap-4 border-b-2">
                      <p className="font-semibold">Seat Capacity:</p>
                      <p className="">{data.capacity}</p>
                    </div>
                  ))}
                  {movie?.data?.showTime.map((data : any, index : any) => (
                    <div className="flex gap-4 border-b-2">
                      <p className="font-semibold">Reserved Seats:</p>
                      <p className="">{data.reservedSeats}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-screen flex justify-center items-center">
          <Spin />
        </div>
          )}
        </p>
      </div>
    </div>
  );
}
