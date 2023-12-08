import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import axios from 'axios';

const Quiz = () => {
  const [data, setData] = useState([]);
  const [categorize, setCategorize] = useState([]);
  const [firstBox, setFirstBox] = useState("");
  const [secondBox, setSecondBox] = useState("");
  const [widgets, setWidgets] = useState([]);
  const [points, setPoints] = useState(0)
  const [description, setDescription] = useState("")
  const [category1, setCategory1] = useState("")
  const [category2, setCategory2] = useState("")
  const [media, setMedia] = useState("")

  const getFormData = async () => {
    try {
      let res = await axios.get(`https://quiz-api-2cgp.onrender.com/api/formdata`);
      const lastElement = res?.data?.formData[res?.data?.formData.length - 1];
      setData(lastElement);
      console.log(lastElement);
      setCategorize(lastElement.categorize);
      setFirstBox(lastElement.categorize[0]?.items[0]);
      setSecondBox(lastElement.categorize[0]?.items[1]);
      setPoints(lastElement.categorize[0]?.categorize_points)
      setCategory1(lastElement.categorize[0]?.category[0])
      setCategory2(lastElement.categorize[0]?.category[1])
      setDescription(lastElement.categorize[0]?.categorize_description)
      setMedia(lastElement.categorize[0]?.categorize_media)
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnDrag = (e, widgetType) => {
    e.dataTransfer.setData("widgetType", widgetType);
  };

  const handleOnDrop = (e) => {
    const widgetType = e.dataTransfer.getData("widgetType");
    setWidgets([...widgets, widgetType]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    getFormData();
  }, []);


  return (
    <div className="bg-gray-100 p-8 border-2 border-black rounded">
      <div className='flex justify-around my-[10px]'>
        <h4 className="text-xl font-bold mb-4">Question 1</h4>
        <h4 className="text-xl font-bold mb-4">Categorize</h4>
        <h4 className="text-xl font-bold mb-4">Points : {points}</h4>
      </div>
      <div>
        <p className='text-left mx-[45px]'>Media : {media}</p>
      </div>
      <div className='flex my-[10px] mx-[45px]'>
        <p className='font-bold'>description : {description}</p>
      </div>
      <div className="flex space-x-4 mb-4 justify-center">
        <div
          className="widget bg-blue-500 text-white p-4 rounded-md shadow-md cursor-pointer"
          draggable
          onDragStart={(e) => handleOnDrag(e, firstBox)}
        >
          {firstBox}
        </div>
        <div
          className="widget bg-green-500 text-white p-4 rounded-md shadow-md cursor-pointer"
          draggable
          onDragStart={(e) => handleOnDrag(e, secondBox)}
        >
          {secondBox}
        </div>
      </div>
      <div
        className="page border-2 h-[100px] my-[50px] flex items-center justify-center"
        onDrop={handleOnDrop}
        onDragOver={handleDragOver}
      >
        {widgets.map((ele, ind) => (
          <div
            key={ind}
            className={`dropped-widgets bg-${ind % 2 === 0 ? 'purple' : 'yellow'} text-white p-2 m-2 rounded-md shadow-md bg-green-500`}
          >
            {ele}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;