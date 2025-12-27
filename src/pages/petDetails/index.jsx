import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { _post } from "../../utils/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const PetDetail = () => {
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((state) => state.user?.data);
  const { data, isLoading, fetch } = useFetch();
  const [isRequesting, setIsRequesting] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      fetch(`/api/pets/getPet/${id}`);
    }
  }, [id]);

  const adoptRequest = async () => {
    try {
      if (user?.token) {
        setIsRequesting(true);
        const res = await _post("/api/adopt/adoptRequest", {
          user: user?.id,
          pet: id,
        });
        setIsRequesting(false);
        if (
          res?.data?.message === "Pet is not available for adopt right now."
        ) {
          toast.error("Pet is not available for adopt right now.");
          return;
        }
        navigate("/orders");
      }else{
        navigate("/login");
      }

    } catch (error) {
      setIsRequesting(false);
      let errMsg = error?.response?.data?.message ?? "Something went wrong;";
      if (error?.response?.statusText == "Unauthorized") {
        errMsg = "Unauthorized, please login to adopt a pet";
      }
      toast.error(errMsg);
    }
  };

  return (
    <div className='p-6 min-h-screen'>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className='grid md:grid-cols-2 gap-8'>
          <img
            src={data?.image}
            alt={data?.name}
            className={`w-full h-96 object-cover rounded ${
              loaded ? "blur-none scale-100" : "blur-md bg-black/20 scale-105"
            }`}
            onLoad={() => setLoaded(true)}
            loading='lazy'
            decoding='async'
          />

          <div>
            <h1 className='text-3xl font-bold mb-3'>{data?.name}</h1>
            <p className='text-gray-600 mb-1'>Species: {data?.species}</p>
            <p className='text-gray-600 mb-1'>Breed: {data?.breed}</p>
            <p className='text-gray-600 mb-1'>Age: {data?.age} years</p>
            <p className='text-gray-600 mb-4'>
              Status:{" "}
              {data?.status !== "AVAILABLE" ? "NOT AVAILABLE" : data?.status}
            </p>

            <p className='mb-6'>{data?.description}</p>

            <button
              onClick={adoptRequest}
              disabled={data?.status !== "AVAILABLE" || isRequesting}
              className={`px-6 py-2 cursor-pointer rounded text-white ${
                data?.status === "AVAILABLE"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isRequesting ? "Requesting..." : "Request to Adopt"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetDetail;
