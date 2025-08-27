"use client";
import React, { useState } from "react";
import { createMovie } from "../api";
import { DatePicker, notification, Select } from "antd";
import Loader from "../components/Loader";
import { useRouter } from "next/navigation";


export default function CreateMovie() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false as boolean);
  const [formData, setFormData] = useState("" as any);
  const [date, setDate] = useState(null);
  const [movieType, setMovieType] = useState("Selling" as string);
  const navigate = useRouter()
  const { Option } = Select;

  // console.log(formData);
  // console.log(movieType);

  const showTime = [
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
    genres: formData.genres,
    showTime: showTime,
    type: movieType,
  };

  const handleAddMovie = async (e : any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await createMovie(requestBody);
      setIsLoading(false);
      if (response.success) {
        notification.success({
          message: "Successful",
          description: response.message,
          duration: 3,
        });
        navigate.push("/movies")
      }else{
        notification.error({
          message: "Failed",
          description: response.message,
          duration: 3,
        });
      }
      // console.log(response.message);

    } catch (error) {
      setIsLoading(false);
      notification.error({
        message: "Failed",
        description: error as string,
        duration: 3,
      });
    }
  };

  const handleChange = (e : any) => {
    const { name, value } = e.target;
    setFormData((prev : any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const errorMessage = () => {
    console.log("required field");
  };

  const handleMovieType = (value : any)=>{
    setMovieType(value)
  }

  return (
    // <div className="bg-gradient-to-br from-slate-500 via-sky-200 to-green-200">
    <div className="">
      <div className="w-[] px-20 pb-10" >
        <h1 className="font-semibold text-4xl py-10">Add New Movie</h1>
      <form
        onSubmit={handleAddMovie}
        className="flex flex-col gap-5"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="flex flex-rox justify-between items-center">
          <label htmlFor="" className="">
            Title:
          </label>
          <input
            onChange={handleChange}
            name="title"
            type="text"
            className="w-[70%] border border-red-900 rounded-md p-2 "
            placeholder="Title..."
            required
          />
        </div>
        <div className="flex flex-rox justify-between items-center">
          <label htmlFor="" className="">
            Genres:
          </label>
          <input
            onChange={handleChange}
            name="genres"
            className="w-[70%] border border-red-900 rounded-md p-2"
            placeholder="Genres..."
            required
          ></input>
        </div>
        <div className="flex flex-rox justify-between items-center">
          <label htmlFor="" className="">
            Seat Capacity:
          </label>
          <input
            onChange={handleChange}
            name="capacity"
            type="number"
            className="w-[70%] border border-red-900 rounded-md p-2"
            placeholder="10,000"
            required
          />
        </div>
        <div className="flex flex-rox justify-between items-center">
          <label htmlFor="" className="">
            Time to Show:
          </label>
          <input
            onChange={handleChange}
            name="time"
            className="w-[70%] border border-red-900 rounded-md p-2"
            placeholder="Time..."
            required
          />
        </div>
        <div className="flex flex-rox justify-between items-center">
          <label htmlFor="" className="">
            Date:
          </label>
          {/* <DatePicker value={formData?.showTime?.date || null} name='date' 
            onChange={(date) => {
              const formattedDate = date ? format("DD/MM/YYYY") : null;
              setDate(formattedDate)
          }}
            className='w-[300px] border border-red-900 rounded-md p-2'></DatePicker> */}
          <input
            name="date"
            onChange={handleChange}
            type="date"
            className="w-[70%] border border-red-900 rounded-md p-2"
            required
          />
        </div>
        <div className="flex flex-rox justify-between items-center">
          <label htmlFor="" className="">
            Type:
          </label>
          <Select
          className="selecter"
            placeholder="Selling"
            onChange={handleMovieType}
            style={{ width: 200, }}
            >
            <Option value="Selling">Selling</Option>
            <Option value="Coming Soon">Coming Soon</Option>
          </Select>
        </div>

        {/* <div className='flex flex-rox justify-between items-center'>
            <label htmlFor="" className=''>Image:</label>
            <div className=''>
            <input type="file" accept='image/*' className='w-fit'/>
            </div>
        </div> */}
        </div>
        <div className="flex flex-rox justify-between">
          <label htmlFor="" className="">
            Description:
          </label>
          {/* <input type="text" className='w-[300px] border border-red-900 rounded-md p-2 ' placeholder='Description...' /> */}
          <textarea
            name="description"
            id=""
            rows={4}
            className="lg:w-[85.5%] w-[70%] p-2 border border-red-900 rounded-md"
            placeholder="Description..."
            onChange={handleChange}
            required
          ></textarea>
        </div>
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
