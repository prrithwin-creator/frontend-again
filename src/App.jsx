import { Routes,Route } from "react-router"


import Login from "./pages/Login";
import Student from "./pages/Student";
import Registration from "./pages/Registration";
import Teacher from "./pages/Teacher";
import PDF from "./pages/PDF";
import Leave from "./pages/Leave";
import Result from "./pages/Result";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";






function App() {
  
  return (
    <>
      <Routes>
       <Route path="/" element={<Registration/>}/>
        <Route path="/login" element={<Login/>} />
        
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/student" element={<Student />} />
        <Route path="/pdf" element={<PDF />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/result" element={<Result />} />
        <Route path="/payment" element={<Payment />} />
         <Route path="/paymentsuccess" element={<PaymentSuccess/>} />
      </Routes>
    </>
  );
}

export default App

