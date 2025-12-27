import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signedUserData } from '../../store/slices/userSlice';
import PetListing from '../../components/petListing';

const Home = () => {

  const state = useSelector((state)=>state.user);
  console.log(state)
  return (
    <PetListing/>
  )
}

export default Home