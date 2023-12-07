import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateFormPage from '../Pages/CreateFormPage'
import QuizPage from '../Pages/QuizPage'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<CreateFormPage />} />
            <Route path={'/quiz'} element={<QuizPage />} />
        </Routes>
    )
}

export default AllRoutes