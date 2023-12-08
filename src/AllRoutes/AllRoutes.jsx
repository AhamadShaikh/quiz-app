import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateFormPage from '../Pages/CreateFormPage'
import QuizPage from '../Pages/QuizPage'
import SubmittedPage from '../Pages/SubmittedPage'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<CreateFormPage />} />
            <Route path={'/quiz'} element={<QuizPage />} />
            <Route path={'/submit'} element={<SubmittedPage />} />
        </Routes>
    )
}

export default AllRoutes