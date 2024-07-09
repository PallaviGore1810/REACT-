
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import ContactList from "./Components/contact/ContactList/ContactList";
import AddContact from "./Components/contact/AddContact/AddContact";
import EditContact from "./Components/contact/EditContact/EditContact";
import ViewContact from "./Components/contact/ViewContact/ViewContact";
import './index.css'
import Spinner from "./Components/Spinner/Spinner";
import Homepage from "./Task/Component/Homepage";


function App() {
  return (
    <>
      {/* <Spinner/> */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to={'/contacts/list'} />} />
        <Route path="/contacts/list" element={<ContactList />} />
        <Route path="/contacts/add" element={<AddContact />} />
        <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        <Route path="/contacts/view/:contactId" element={<ViewContact />} />
      </Routes>
      {/* <Homepage/> */}
    </>
  );
}

export default App;
