import React, { useState } from "react";
import { Link } from "react-router-dom";

const PetCard = ({ pet }) => {
  const [loaded, setLoaded] = useState(false);
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart?.find((item) => item._id === dummyPet?._id);
    if (exists) {
      alert("Pet already added to cart");
      return;
    }

    cart?.push({ ...dummyPet, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Pet added to cart");
  };

  return (
    <Link
      to={`/pet/${pet?._id}`}
      className='shadow-md rounded-md cursor-pointer overflow-hidden bg-white'
    >
      <figure className='overflow-hidden h-48'>
        <img
          src={pet?.image}
          alt={pet?.name}
          onLoad={() => setLoaded(true)}
          loading='lazy'
          decoding='async'
          className={`w-full h-full object-cover rounded-md hover:scale-105 transition-all ${
            loaded ? "blur-none scale-100" : "blur-md bg-black/20 scale-105"
          }`}
        />
      </figure>
      <div className='p-4'>
        <h1 className='text-3xl font-bold mb-3'>{pet?.name}</h1>
        <p className='text-gray-600 mb-1'>Species: {pet?.species}</p>
        <p className='text-gray-600 mb-1'>Breed: {pet?.breed}</p>
        <p className='text-gray-600 mb-1'>Age: {pet?.age} years</p>
        <p className='text-gray-600 mb-4'>Status: {pet?.status}</p>
      </div>
    </Link>
  );
};

export default PetCard;
