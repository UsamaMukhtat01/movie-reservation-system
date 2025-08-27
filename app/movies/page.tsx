"use client";
import React, { useEffect, useState } from "react";
import { Modal, notification, Spin } from "antd";
import Loader from "../components/Loader";
import { deletMovie, getMovies } from "../api";
import Link from "next/link";

export default function Movies() {
  const user = JSON.parse(localStorage.getItem("user") || "{}"); 
  const [movies, setMovies] = useState([] as any);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [movieId, setMovieId] = useState("" as any);

  useEffect(() => {
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

  const handleDelete = async () => {
    try {
      setDelLoading(true)
      const response = await deletMovie(movieId);
      if (response?.success) {
        notification.success({
          message: "Success",
          description: response.message,
          duration: 3,
        });
        const result = await getMovies();
        setMovies(result);
      } else {
        notification.error({
          message: "Failed",
          description: response.message,
          duration: 3,
        });
      }
    } catch (error) {
      console.log(error);
    }finally{
      setDelLoading(false);
      setVisibleModal(false)
    }
  };

  const handleShowModal = (movieId : any) => {
    setVisibleModal(true);
    setMovieId(movieId)
  };
  const handleModalClose = () => {
    setVisibleModal(false);
    setMovieId(null)
  };

  return (
    <div>
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
              <div className="flex flex-col gap-5">
                {movies?.data?.map((movies : any, index : any) => (
                  <div
                    key={index}
                    className="flex flex-row w-[800px] border-t border-r border-b p-1 border-gray-200 rounded-lg "
                  >
                    <Link href={`/movieDetails/${movies._id}`}>
                      <img
                        className="rounded-t-lg w-[200px]"
                        src="/src/image/MRS.png"
                        alt=""
                      />
                    </Link>
                    <div className="p-5">
                      <Link href={`/movieDetails/${movies._id}`}>
                        <h5 className="inline-flex line-clamp-1 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                          {movies.title}
                        </h5>
                      </Link>
                      <p className="w-[500px] line-clamp-1 mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {movies.description}
                      </p>
                      <Link href={`/movieDetails/${movies?._id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        More Details
                      </Link>
                    </div>
                    {user?.role === "Admin" && (

                    <div className="flex flex-col justify-between p-4">
                      <button disabled className="uppercase px-4 h-[40px] rounded-[4px] transition-transform transform active:scale-95 border border-[#FFBF00] font-sans font-semibold text-[14px] text-[#2C363F]">
                        {/* <EditOutlined
                          style={{ fontSize: "24px", color: "green" }}
                        /> */}
                        update
                      </button>
                      <button className="uppercase px-4 h-[40px] transition-transform transform active:scale-95 rounded-[4px] bg-[#EC0303] font-sans font-semibold text-[14px] text-white" onClick={()=>handleShowModal(movies?._id)}>
                        {/* <DeleteOutlined
                          style={{ fontSize: "24px", color: "red" }}
                        /> */}
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
          </div>
        </>
      )}
    </div>
  );
}
