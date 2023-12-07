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
      const lastElement = res?.data?.formData[res?.data?.formData.length - 1]
      setData(lastElement)
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
        <form>

          <div className='category'>

            <div>
                {
                  data?.categorize[0]?.items?.map((ele)=>(
                    <div key={ele.id}>{ele.content}</div>
                  ))
                }
            </div>

          </div>

        </form>
      </div> */}
    </div>
  );
};

export default QuizPage