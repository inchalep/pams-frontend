import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import LoginAndSignup from "./pages/loginAndSignup";
import PetDetail from "./pages/petDetails";
import OrderList from "./pages/orderListing";
import PetForm from "./pages/managePet";
import AllOrders from "./pages/allOrders";
import Layout from './components/layout';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path='login' element={<LoginAndSignup />} />
          <Route path='signup' element={<LoginAndSignup />} />
          <Route path='pet/:id' element={<PetDetail />} />

          <Route path='orders' element={<OrderList />} />
          <Route path='allOrders' element={<AllOrders />} />
          <Route path='addPet' element={<PetForm />} />
          <Route path='editPet/:id' element={<PetForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
