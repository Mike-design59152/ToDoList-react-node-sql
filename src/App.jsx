import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import HomePage from '../page/HomePage';
import AjoutTache from '../page/ajoutTache';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AjoutUtilisateur from '../page/ajoutUtilisateur';
import ModifierTache from '../page/modifierTache';




function App() {

  return <>
  <BrowserRouter>
  <Routes>
  <Route path='/' element={<HomePage></HomePage>}></Route>
  <Route path='/ajout' element={<AjoutTache></AjoutTache>}></Route>
  <Route path='/add' element={<AjoutUtilisateur></AjoutUtilisateur>}></Route>
  <Route path='/modifier/:id' element={<ModifierTache></ModifierTache>}></Route>

  </Routes>
  <ToastContainer
position="haut-droite"
autoFermer={5000}
hideProgressBar={false}
le plus récentOnTop={false}
fermerOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
thème="lumière"
/>
  
  
  
  </BrowserRouter>
  
  </>
}

export default App;