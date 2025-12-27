import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AdminRoute from "../../components/adminRoute";

const AllOrders = () => {
  const { data, isLoading, error, fetch } = useFetch();
  useEffect(() => {
    fetchAllRequest();
  }, []);

  const fetchAllRequest = async () => {
    fetch("/api/adopt/usersAdoptRequest", {
      params: {
        page: 1,
        limit: 10,
        all: true,
      },
    });
  };

  const withdrawRequest = (id, status, user) => {
    fetch(`/api/adopt/updateStatus/${id}/?status=${status}&user=${user}`);
    fetchAllRequest();
  };

  return (
    <div className='container mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-6'>All Orders</h2>

      <div className='overflow-x-auto'>
        {isLoading ? (
          "Loading..."
        ) : (
          <table className='w-full border border-gray-300'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='border p-2'>Pet</th>
                <th className='border p-2'>User</th>
                <th className='border p-2'>Breed</th>
                <th className='border p-2'>Age</th>
                <th className='border p-2'>Status</th>
                <th className='border p-2'>Action</th>
              </tr>
            </thead>

            <tbody>
              {data?.list?.map((order) => (
                <tr key={order._id} className='text-center'>
                  <td className='border p-2'>
                    <Link to={`/pet/${order.pet}`} className='underline'>
                      {order?.petDetails[0]?.name}
                    </Link>
                  </td>
                  <td className='border p-2'>{order?.user?.[0]?.name}</td>
                  <td className='border p-2'>{order?.petDetails[0]?.breed}</td>
                  <td className='border p-2'>{order?.petDetails[0]?.age}</td>
                  <td className='border p-2 font-semibold'>{order?.status}</td>
                  <td className='border p-2 space-x-2'>
                    <button
                      onClick={() =>
                        withdrawRequest(
                          order?.pet,
                          "APPROVE",
                          order?.user?.[0]?._id
                        )
                      }
                      className='bg-green-600 text-white px-3 py-1 rounded disabled:bg-gray-400'
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        withdrawRequest(
                          order?.pet,
                          "REJECT",
                          order?.user?.[0]?._id
                        )
                      }
                      className='bg-red-600 text-white px-3 py-1 rounded disabled:bg-gray-400'
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminRoute(AllOrders);
