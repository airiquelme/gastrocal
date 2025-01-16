import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router"
import './index.css'

import Header from './components/Header'
import LogosContainer from './components/LogosContainer'
import Homepage from './routes/Homepage'
import Calculator from './routes/Calculator'
import NotFound from './routes/NotFound'

import prueba_calculadora from "./assets/data/prueba/form.json"
import prueba_defectos from "./assets/data/prueba/default.json"
import { calcular_adenocarcinoma2 } from './utils/calculadora_adenocarcinoma2'
import NewCalculator from './routes/NewCalculator'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/new-calculator" element={<NewCalculator calculator={prueba_calculadora} calculator_function={calcular_adenocarcinoma2} default_values={prueba_defectos} key={1} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <LogosContainer />
    </BrowserRouter>
  </StrictMode>,
)
