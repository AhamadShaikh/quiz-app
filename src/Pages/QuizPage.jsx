import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar';
import Quiz from '../Components/Quiz';
import ClozeQuestion from '../Components/ClozeQuestion';
import ComprehensionQuestion from '../Components/ComprehensionQuestion';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const [data, setData] = useState([])
  const [categorize, setCategorize] = useState([])
  const navigate = useNavigate()

  // console.log(data);

  const getFormData = async () => {
    try {
      let res = await axios.get(`https://quiz-api-2cgp.onrender.com/api/formdata`)
      const lastElement = res?.data?.formData[res?.data?.formData.length - 1]
      setData(lastElement)
      setCategorize(lastElement.categorize)
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmitClick = (e) => {
    e.preventDefault()
    navigate("/submit")
  }

  useEffect(() => {
    getFormData()
  }, [])

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className='max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md border-2 border-white-300 '>
        <form className='flex-col gap-2 '>
          <div className='widget text-black rounded-md shadow-md cursor-pointer border-solid-black my-[10px]'>
            <Quiz />
          </div>
          <div className='my-[10px]'>
            <ClozeQuestion />
          </div>
          <div className='my-[10px]'>
            <ComprehensionQuestion />
          </div>
          <div className='my-[10px]'>
            <button onClick={handleSubmitClick}
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default QuizPage;