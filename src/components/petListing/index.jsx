import React, { useEffect, useRef, useState } from "react";
import PetCard from "../petCard";
import { _get } from "../../utils/api";
import useFetch from "../../hooks/useFetch";

const PetListing = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const { data, isLoading, error, fetch } = useFetch();

  const listRef = useRef();
  useEffect(() => {
    fetch("/api/pets/getAllPets",{
      params:{
        search,
        sort
      }
    });
  }, [search, sort]);

  const handleInput =(e)=>{
    setTimeout(()=>{
      setSearch(e.target.value)
    },800)
  }

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Pets Available for Adoption</h2>

      {/* Search & Sort */}
      <div className='flex flex-col md:flex-row gap-4 mb-6 items-center'>
        <div className='relative mx-auto text-gray-600 w-full'>
          <input
            className='w-full border border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
            type='search'
            name='search'
            placeholder='Search'
            onChange={handleInput}
          />
          <span className='absolute right-0 top-0 mt-3 mr-4'>
            <svg
              className='text-gray-600 h-4 w-4 fill-current'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              version='1.1'
              id='Capa_1'
              x='0px'
              y='0px'
              viewBox='0 0 56.966 56.966'
              xmlSpace='preserve'
              width='512px'
              height='512px'
            >
              <path d='M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z' />
            </svg>
          </span>
        </div>

        <select
          className='w-full border border-gray-300 bg-white h-10 px-2 rounded-lg text-sm focus:outline-none md:w-1/4'
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value='asc'>Age: Low to High</option>
          <option value='desc'>Age: High to Low</option>
        </select>
      </div>

      {/* Listing */}
      {isLoading ? (
        <p>Loading pets...</p>
      ) : data?.list?.length === 0 ? (
        <p>No pets found.</p>
      ) : (
        <div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-5'
          ref={listRef}
        >
          {data?.list?.map((pet) => (
            <PetCard pet={pet} key={pet._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PetListing;
