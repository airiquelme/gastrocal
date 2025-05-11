import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router"
import './index.css'

import Header from './components/Header'
import LogosContainer from './components/LogosContainer'
import Homepage from './routes/Homepage'
import Calculator from './routes/Calculator'
import NotFound from './routes/NotFound'
import PDFViewPage from './routes/PDFViewPage'

import prueba_calculadora from "./assets/data/prueba/form.json"
import prueba_defectos from "./assets/data/prueba/default.json"
import { calcular_adenocarcinoma2 } from './utils/calculadora_adenocarcinoma2'
import NewCalculator from './routes/NewCalculator'

// Calculadora Adenocarcinoma (biomarcador 2)
import form_adenocarcinoma_biomarcador_1 from "./assets/data/adenocarcinoma_biomarcador_1/form.json"
import default_values_adenocarcinoma_biomarcador_1 from "./assets/data/adenocarcinoma_biomarcador_1/default.json"
import { calculadora_biomarcador_1 } from './utils/calculadora_biomarcador_1'

// Calculadora Adenocarcinoma (biomarcador 2)
import form_adenocarcinoma_biomarcador_2 from "./assets/data/adenocarcinoma_biomarcador_2/form.json"
import default_values_adenocarcinoma_biomarcador_2 from "./assets/data/adenocarcinoma_biomarcador_2/default.json"
import { calculadora_biomarcador_2 } from './utils/calculadora_biomarcador_2'

// Calculadora Adenocarcinoma (modelo clínico)
import form_adenocarcinoma_modelo_clinico from "./assets/data/adenocarcinoma_modelo_clinico/form.json"
import default_values_adenocarcinoma_modelo_clinico from "./assets/data/adenocarcinoma_modelo_clinico/default.json"
import { calculadora_modelo_clinico } from './utils/calculadora_modelo_clinico'

// Calculadora Molina
import form_molina from "./assets/data/molina/form.json"
import default_values_molina from "./assets/data/molina/default.json"
import { calculadora_molina } from './utils/calculadora_molina'

import pdf_test from "./assets/docs/test.pdf"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/*<Route path="/calculator" element={<Calculator />} />
        <Route path="/new-calculator" element={<NewCalculator calculator={prueba_calculadora} calculator_function={calcular_adenocarcinoma2} default_values={prueba_defectos} key={1} />} />
        <Route path="/calculadora-biomarcador-2" element={<NewCalculator calculator={form_adenocarcinoma_biomarcador_2} calculator_function={calculadora_biomarcador_2} default_values={default_values_adenocarcinoma_biomarcador_2} key={2} />} />
        <Route path="/calculadora-modelo-clinico" element={<NewCalculator calculator={form_adenocarcinoma_modelo_clinico} calculator_function={calculadora_modelo_clinico} default_values={default_values_adenocarcinoma_modelo_clinico} key={3} />} />
        <Route path="/calculadora-biomarcador-1" element={<NewCalculator calculator={form_adenocarcinoma_biomarcador_1} calculator_function={calculadora_biomarcador_1} default_values={default_values_adenocarcinoma_biomarcador_1} key={4} />} />
        */}
        <Route path="/pdf" element={<PDFViewPage title={"Prueba de PDF"} document={pdf_test} key={5} />} />
        <Route path="/calculadora-cancer-gastrico" element={<NewCalculator calculator={form_molina} calculator_function={calculadora_molina} default_values={default_values_molina} key={6} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <LogosContainer />
    </BrowserRouter>
  </StrictMode>,
)
