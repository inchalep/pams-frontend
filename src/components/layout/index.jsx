import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  const user = useSelector((state) => state.user?.data);
  const userInitails = useMemo(() => {
    const name = user?.name?.split(" ");
    if (name?.length) {
      return name[0]?.[0] + name[1]?.[0];
    }
    return "";
  }, [user]);
  return (
    <div className='bg-orange-100 min-h-screen'>
      <nav className='flex justify-between px-14 py-4'>
        <h2>Pet Management</h2>
        <div className='flex gap-x-2 items-center'>
          <Link className='text-sm hover:underline capitalize' to={"/"}>
            Home
          </Link>
          {user ? (
            <>
              <Link className='text-sm hover:underline capitalize' to={"/orders"}>
                orders
              </Link>
              <Link className='text-sm hover:underline capitalize' to={"/addPet"}>
                addPet
              </Link>{" "}
              <Link className='text-sm hover:underline capitalize' to={"/editPet/test"}>
                EditPet
              </Link>
              <Link className='text-sm hover:underline capitalize' to={"/allOrders"}>
                All Request
              </Link>
            </>
          ) : null}
          <Link className='text-sm hover:underline capitalize' to={"/login"}>
            Login
          </Link>
          {userInitails ? (
            <span className='text-sm h-8 w-8 ml-4 rounded-full border border-gray-200 bg-white uppercase flex justify-center items-center'>
              {userInitails}
            </span>
          ) : null}
        </div>
      </nav>
      <div className='py-4 px-32'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
