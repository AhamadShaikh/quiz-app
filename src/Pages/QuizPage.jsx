import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar';
import Quiz from '../Components/Quiz';

const QuizPage = () => {
  const [data, setData] = useState([])

  console.log(data);
  const getFormData = async () => {
    try {
      let res = await axios.get(`https://quiz-api-2cgp.onrender.com/api/formdata`)
      setData(res?.data?.data)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getFormData()
  }, [])

  return (
    <div>
      <div>
        <Navbar />
      </div>
      {/* <div>
        {
          data?.map((ele) => (
            <Quiz />
          ))
        }
      </div> */}
    </div>
  );
};

export default QuizPage