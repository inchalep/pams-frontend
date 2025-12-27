import React, { useActionState, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { _post } from "../../utils/api";
import AdminRoute from '../../components/adminRoute';

const initialState = {
  name: "",
  species: "",
  breed: "",
  age: "",
  image: "",
  status: "AVAILABLE",
};

const PetForm = () => {
  const { id } = useParams(); 
  const [state, formAction, isPending] = useActionState(fn, initialState);
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [pet, setPet] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    image: "",
    status: "AVAILABLE",
  });

  useEffect(() => {
    if (isEditMode) {
      const existingPet = dummyPets.find((p) => p.id === id);
      if (existingPet) {
        setPet(existingPet);
      }
    }
  }, [id, isEditMode]);

  async function fn(previousState, formData) {
    try {
      const payload = {
        name: formData.get("name"),
        species: formData.get("species"),
        breed: formData.get("breed"),
        age: formData.get("age"),
        description: formData.get("description"),
        image: formData.get("image"),
        status: formData.get("status"),
      };

      const res = await _post(`/api/pets/addPet`, payload);
      console.log(res,'res:::')
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  }

  return (
    <div className='container mx-auto p-6 max-w-xl'>
      <h2 className='text-2xl font-bold mb-6'>
        {isEditMode ? "Edit Pet" : "Add Pet"}
      </h2>

      <form action={formAction} className='space-y-4'>
        <input
          type='text'
          name='name'
          placeholder='Pet Name'
          className='w-full border p-2 rounded'
          required
        />

        <input
          type='text'
          name='species'
          placeholder='Species (Dog/Cat)'
          className='w-full border p-2 rounded'
          required
        />

        <input
          type='text'
          name='breed'
          placeholder='Breed'
          className='w-full border p-2 rounded'
          required
        />

        <input
          type='number'
          name='age'
          placeholder='Age'
          className='w-full border p-2 rounded'
          required
        />

        <textarea
          name='description'
          placeholder='Enter description'
          className='w-full border p-2 rounded'
          required
        />

        <input
          type='text'
          name='image'
          placeholder='Image URL'
          className='w-full border p-2 rounded'
        />

        <select name='status' className='w-full border p-2 rounded'>
          <option value='AVAILABLE'>AVAILABLE</option>
          <option value='PENDING'>PENDING</option>
          <option value='ADOPTED'>ADOPTED</option>
        </select>

        <button
          type='submit'
          disabled={isPending}
          className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
        >
          {isEditMode ? "Update Pet" : "Add Pet"}
        </button>
      </form>
    </div>
  );
};

export default AdminRoute(PetForm);
