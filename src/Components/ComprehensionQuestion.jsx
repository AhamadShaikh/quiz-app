import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import axios from 'axios';

const ComprehensionQuestion = () => {
    const [data, setData] = useState([]);
    const [widgets, setWidgets] = useState([]);
    const [points, setPoints] = useState(0)
    const [description, setDescription] = useState("")
    const [question, setQuestion, setCategory1] = useState("")
    const [media, setMedia] = useState("")
    const [options, setOptions] = useState([])
    const [passage, setPassage] = useState("")

    const getFormData = async () => {
        try {
            let res = await axios.get(`https://quiz-api-2cgp.onrender.com/api/formdata`);
            const lastElement = res?.data?.formData[res?.data?.formData.length - 1];
            setData(lastElement);
            console.log(lastElement);
            setPoints(lastElement.comprehension[0]?.comprehension_points)
            setQuestion(lastElement.comprehension[0]?.comprehension_questions)
            setMedia(lastElement.comprehension[0]?.comprehension_media)
            setDescription(lastElement.comprehension[0]?.comprehension_description)
            setOptions(lastElement.comprehension[0]?.comprehension_options)
            setPassage(lastElement.comprehension[0]?.comprehension_passage)
        } catch (error) {
            console.log(error);
        }
    };
    console.log(options);
    useEffect(() => {
        getFormData();
    }, []);


    return (
        <div className="bg-gray-100 p-8 border-2 border-black rounded">
            <div className='flex justify-around my-[10px]'>
                <h4 className="text-xl font-bold mb-4">Question 3</h4>
                <h4 className="text-xl font-bold mb-4">Comprehension</h4>
                <h4 className="text-xl font-bold mb-4">Points : {points}</h4>
            </div>
            <div>
                <p className='text-left mx-[45px]'>Media : {media}</p>
            </div>
            <div className='flex my-[10px] mx-[45px]'>
                <p className='font-bold'>description : {description}</p>
            </div>
            <div className='flex-col my-[10px] mx-[45px]'>
                <p className='font-bold'>Passage:</p>
                <p className=' border-2 border-gray text-left'>{passage}</p>
            </div>
            <div>
                <p className='font-bold'>Question</p>
            </div>
            <div
                className="page border-2 h-[100px] my-[30px] flex items-center justify-center"
            >
                {question}
            </div>
            <div>
                {
                    options?.map((ele, ind) => (
                        <div key={ind} className='flex mx-[45px] gap-2'>
                            <input type="radio" name='radio' />
                            <p>{ele}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ComprehensionQuestion;