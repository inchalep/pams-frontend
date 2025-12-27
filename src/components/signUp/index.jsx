import React, { useActionState, useEffect } from "react";
import { _post } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signedUserData } from "../../store/slices/userSlice";
const initialState = {
  data: null,
  errors: null,
};
const Signup = () => {
  const [state, formAction, isPending] = useActionState(fn, initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.user);
  async function fn(previousState, formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const age = formData.get("age");

    const errors = validateForm({
      name,
      email,
      password,
      confirmPassword,
      age,
    });

    if (Object.keys(errors).length) {
      return {
        ...previousState,
        errors,
      };
    }
    try {
      const payload = {
        email,
        name,
        password,
        confirmPassword,
        age,
      };

      const res = await _post(`/api/user/signUp`, payload);
      if (res.data?.data) {
        dispatch(signedUserData(res.data?.data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message);
    }
  }

  const validateForm = ({ name, email, password, confirmPassword, age }) => {
    const errors = {};

    if (!name) {
      errors.name = "Name is required.";
    }
    if (!password) {
      errors.password = "Password is required.";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required.";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Confirm password is not match.";
    }
    if (!email) {
      errors.email = "Email is required.";
    }
    if (!age) {
      errors.age = "Age is required.";
    }
    return errors;
  };
  useEffect(() => {
    if (data?.token) {
      navigate("/");
    }
  }, [data]);
  return (
    <div className='min-h-screen flex items-center justify-center bg-amber-100'>
      <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
        <h2 className='text-3xl font-bold text-center text-orange-600'>
          Create Account 🐶
        </h2>
        <p className='text-center text-gray-500 mt-2'>
          Join us and help pets find a home
        </p>

        <form className='mt-6 space-y-4' action={formAction}>
          <div className='relative'>
            <label className='block text-gray-600 mb-1'>Full Name</label>
            <input
              type='text'
              name='name'
              placeholder='John Doe'
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
            />
            {state?.errors?.name ? (
              <span className='err absolute -bottom-4 left-2'>
                {state?.errors?.name}
              </span>
            ) : null}
          </div>

          <div className='relative'>
            <label className='block text-gray-600 mb-1'>Email</label>
            <input
              type='email'
              name='email'
              placeholder='you@example.com'
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
            />
            {state?.errors?.email ? (
              <span className='err absolute -bottom-4 left-2'>
                {state?.errors?.email}
              </span>
            ) : null}
          </div>

          <div className='relative'>
            <label className='block text-gray-600 mb-1'>Password</label>
            <input
              type='password'
              name='password'
              placeholder='********'
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
            />
            {state?.errors?.password ? (
              <span className='err absolute -bottom-4 left-2'>
                {state?.errors?.password}
              </span>
            ) : null}
          </div>

          <div className='relative'>
            <label className='block text-gray-600 mb-1'>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              placeholder='********'
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
            />
            {state?.errors?.confirmPassword ? (
              <span className='err absolute -bottom-4 left-2'>
                {state?.errors?.confirmPassword}
              </span>
            ) : null}
          </div>

          <div className='relative'>
            <label className='block text-gray-600 mb-1'> Age</label>
            <input
              type='number'
              name='age'
              placeholder='18'
              min={1}
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
            />
            {state?.errors?.age ? (
              <span className='err absolute -bottom-4 left-2'>
                {state?.errors?.age}
              </span>
            ) : null}
          </div>

          <button
            type='submit'
            className='w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition'
          >
            {isPending ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className='text-center text-sm text-gray-500 mt-4'>
          Already have an account?{" "}
          <a href='/login' className='text-orange-500 font-medium'>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
