//  IMPORTS  //

// CSS
import './App.css';

// react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Context
import { CartProvider  } from './context/CartContext';
import { CategoriesProvider } from './context/CategoriesContext';
import { LogInProvider } from './context/LogInContext';
import { OrderProvider } from './context/OrderContext';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Productos from './pages/Productos';
import Producto from './pages/Producto';
import Categoria from './pages/Categoria';
import Contact from './pages/Contact';
import Us from './pages/Us';
import Cart from './pages/Cart';
import Purchase from './pages/Purchase';
import UserProfile from './pages/UserProfile';
import UserPurchases from './pages/UserPurchases';
import NewUser from './pages/NewUser';
import NotFound from './pages/NotFound';


//  APP  //
function App() {  
  return (
    <div className="App">
      <LogInProvider>
        <OrderProvider>
          <CategoriesProvider>
            <CartProvider>
              <BrowserRouter>
                <Navbar/>
                <Routes>  
                  <Route path='*' element={<NotFound/>}/>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/login' element={<Login/>}/>
                  <Route path='/products' element={<Productos/>}/>
                  <Route path='/products/:id' element={<Producto/>}/>
                  <Route path='/categories/:id' element={<Categoria/>}/>
                  <Route path='/user/new' element={<NewUser/>}/>
                  <Route path='/user/:id_user' element={<UserProfile/>}/>
                  <Route path='/user/:id_user/purchases' element={<UserPurchases/>}/>
                  <Route path='/cart' element={<Cart/>}/>
                  <Route path='/purchase' element={<Purchase/>}/>
                  <Route path='/us' element={<Us/>}/>
                  <Route path='/contact' element={<Contact/>}/>
                </Routes>
                <Footer/>
              </BrowserRouter>
            </CartProvider>
          </CategoriesProvider>
        </OrderProvider>
      </LogInProvider>
    </div>
  );
}

export default App;
