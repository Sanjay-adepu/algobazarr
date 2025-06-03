import Product from "./Product/ProductCard.jsx";
import {Routes,Route} from "react-router-dom";
import Blog from "./Pages/Blog/BlogCard.jsx";
import About from "./Pages/About/AboutUs.jsx";
import "./App.css";
import Faq from "./Pages/Faq/FAQ.jsx";
import Contact from "./Pages/Contact/ContactUs.jsx";
import Term from "./Pages/Terms/TermsAndConditions.jsx";
import Policy from "./Pages/Privacy/PrivacyPolicy.jsx";
import Category from "./Category/CategoryCard.jsx";
import EmptyCart from "./Cart/Cart.jsx";
import Login from "./Login/LogoComponent.jsx";
import Search from "./Search/Search.jsx";
import AccountPage from "./Login/AccountPage.jsx";
import Addform from "./Login/AdressForm.jsx";
import AddressList from "./Login/AddressList.jsx";
import Home from "./Home/Home.jsx";
import Order from "./Order/OrderList.jsx";
const App=()=>{
  return(
    <div className="app">
      <Routes>
     <Route path="/product" element={<Product/>}/>
    <Route path="/" element={<Home/>}/>  

 <Route path="/product/:id" element={<Product />} />
     <Route path="/order" element={<Order/>}/>     
   <Route path="/my-address" element={<AddressList/>}/>
 <Route path="/address" element={<Addform/>}/>     
        
    <Route path="/account" element={<AccountPage/>}/>
   <Route path="/login" element={<Login/>}/>
     <Route path="/cart" element={<EmptyCart/>}/>
     <Route path="/blog" element={<Blog/>}/>
   <Route path="/category" element={<Category/>}/>
   <Route path="/contact" element={<Contact/>}/>      
   <Route path="/terms" element={<Term/>}/>    
 <Route path="/policy" element={<Policy/>}/>    
  <Route path="/faq" element={<Faq/>}/> 
    <Route path="/about" element={<About/>}/>  
 <Route path="/search" element={<Search/>}
    />
    
    
      </Routes>
    
      
    </div>
    
    )
}
export default App;