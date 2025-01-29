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

// Calculadora Adenocarcinoma (biomarcador 2)
import form_adenocarcinoma_biomarcador_2 from "./assets/data/adenocarcinoma_biomarcador_2/form.json"
import default_values_adenocarcinoma_biomarcador_2 from "./assets/data/adenocarcinoma_biomarcador_2/default.json"
import { calculadora_biomarcador_2 } from './utils/calculadora_biomarcador_2'

// Calculadora Adenocarcinoma (modelo clínico)
import form_adenocarcinoma_modelo_clinico from "./assets/data/adenocarcinoma_modelo_clinico/form.json"
import default_values_adenocarcinoma_modelo_clinico from "./assets/data/adenocarcinoma_modelo_clinico/default.json"
import { calculadora_modelo_clinico } from './utils/calculadora_modelo_clinico'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/new-calculator" element={<NewCalculator calculator={prueba_calculadora} calculator_function={calcular_adenocarcinoma2} default_values={prueba_defectos} key={1} />} />
        <Route path="/calculadora-biomarcador-2" element={<NewCalculator calculator={form_adenocarcinoma_biomarcador_2} calculator_function={calculadora_biomarcador_2} default_values={default_values_adenocarcinoma_biomarcador_2} key={2} />} />
        <Route path="/calculadora-modelo-clinico" element={<NewCalculator calculator={form_adenocarcinoma_modelo_clinico} calculator_function={calculadora_modelo_clinico} default_values={default_values_adenocarcinoma_modelo_clinico} key={3} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <LogosContainer />
    </BrowserRouter>
  </StrictMode>,
)
