import React, { useActionState, useEffect, useState } from "react";
import { _get } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { signedUserData } from "../../store/slices/userSlice";
import {useNavigate} from 'react-router-dom'
const initialState = {
  data: null,
  error: null,
  success: false,
};
const Login = () => {
  const [state, formAction, isPending] = useActionState(fn, initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {data} = useSelector((state)=>state.user)
  
  async function fn(previousState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const error = {};
    if (!email) {
      error["email"] = "Email is required.";
    }
    if (!password) {
      error["password"] = "Password is required.";
    }
    if (Object.keys(error).length) {
      return {
        ...previousState,
        error,
      };
    }
    try {
      const queryObj = {
        email: email,
        password: password,
      };
      const query = new URLSearchParams(queryObj);

      const res = await _get(`/api/user/login/?${query}`);
      if (res.data?.data) {
        localStorage.setItem('token',res.data?.data?.token)
        dispatch(signedUserData(res.data?.data));
      }
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  }

  useEffect(()=>{
    if(data?.token){
      navigate('/')
    }
  },[data])
  return (
    <div className='min-h-screen flex items-center justify-center bg-orange-100'>
      <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
        <h2 className='text-3xl font-bold text-center text-orange-600'>
          Pet Adoption Login 🐾
        </h2>
        <p className='text-center text-gray-500 mt-2'>
          Welcome back! Please login to your account
        </p>

        <form className='mt-6 space-y-4' action={formAction}>
          <div className='relative'>
            <label className='block text-gray-600 mb-1'>Email</label>
            <input
              name='email'
              placeholder='you@example.com'
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
            />
            {state?.error?.email ? (
              <span className='err absolute -bottom-4 left-2'>
                {state?.error?.email}
              </span>
            ) : null}
          </div>

          <div className='relative pb-3'>
            <label className='block text-gray-600 mb-1'>Password</label>
            <input
              type='password'
              name='password'
              placeholder='********'
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
            />
            {state?.error?.password ? (
              <span className='err absolute -bottom-1 left-2'>
                {state?.error?.password}
              </span>
            ) : null}
          </div>

          <button
            type='submit'
            className='w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition'
            disabled={isPending}
          >
            {isPending ? "Signing..." : "Login"}
          </button>
        </form>

        <p className='text-center text-sm text-gray-500 mt-4'>
          Don’t have an account?{" "}
          <a href='/signup' className='text-orange-500 font-medium'>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
