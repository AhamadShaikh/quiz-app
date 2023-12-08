import React, { useState } from 'react';
import Catagorize from '../Components/Catagorize';
import Items from '../Components/Items';
import ComprehensionOptions from '../Components/ComprehensionOptions';
import ClozeOptions from '../Components/ClozeOptions';
import BelongsTo from '../Components/BelongsTo';
import axios from 'axios';
import Navbar from '../Components/Navbar';

const initialState = {
    categorize: [
        {
            categorize_points: 0,
            categorize_description: "",
            categorize_media: "",
            category: [],
            items: [],
            belongsTo: []
        },
    ],
    cloze: [
        {
            cloze_points: 0,
            cloze_preview: "",
            cloze_question: "",
            cloze_media: "",
            cloze_options: [],
        },
    ],
    comprehension: [
        {
            comprehension_points: 0,
            comprehension_description: "",
            comprehension_passage: "",
            comprehension_media: "",
            comprehension_questions: [],
            comprehension_options: []
        },
    ],
};

const CreateFormPage = () => {
    const [formData, setFormData] = useState(initialState);

    const [categorizePoints, setCategorizePoints] = useState("");

    const [clozePoints, setClozePoints] = useState("");

    const [categorizeDescription, setCategorizeDescription] = useState(initialState.categorize.categorize_description);

    const [clozeQuestion, setClozeQuestion] = useState(initialState.cloze_question);

    const [comprehensionPassage, setComprehensionPassage] = useState("");
    const [comprehensionQuestion, setComprehensionQuestion] = useState("");
    const [comprehensionPoints, setComprehensionPoints] = useState(initialState.comprehension.comprehension_points)
    const [categorizeMedia, setCategorizeMedia] = useState("")
    const [clozeMedia, setClozeMedia] = useState("")
    const [comprhensionMedia, setComprehensionMedia] = useState("")

    const [comprehensionDescription, setComprehensionDescription] = useState("")

    const [category, setCategory] = useState([{ id: 1, content: '' }, { id: 2, content: '' }]);
    const [items, setItems] = useState([{ id: 1, content: '' }, { id: 2, content: '' }]);
    const [belongsTo, setBelongsTo] = useState([{ id: 1, content: '' }, { id: 2, content: '' }]);
    const [clozeOptions, setClozeOptions] = useState([{ id: 1, content: '' }, { id: 2, content: '' }]);

    const [comprehensionOptions, setComprehensionOptions] = useState([{ id: 1, content: '' }, { id: 2, content: '' }, { id: 3, content: '' }, { id: 4, content: '' }]);

    const handleInputCategoryChange = (id, value) => {
        setCategory((prevItems) =>
            prevItems.map((item) => (item.id === id ? { ...item, content: value } : item))
        );
    };

    const handleInputItemsChange = (id, value) => {
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === id ? { ...item, content: value } : item))
        );
    };

    const handleInputBelongsToChange = (id, value) => {
        setBelongsTo((prevItems) =>
            prevItems.map((item) => (item.id === id ? { ...item, content: value } : item))
        );
    };

    const handleOptionsChange = (id, value) => {
        setClozeOptions((prevItems) =>
            prevItems.map((item) => (item.id === id ? { ...item, content: value } : item))
        );
    };

    const handleInputComprehensionChange = (id, value) => {
        setComprehensionOptions((prevItems) =>
            prevItems.map((item) => (item.id === id ? { ...item, content: value } : item))
        );
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const grid = 8;

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedItems = reorder(category, result.source.index, result.destination.index);

        console.log({ reorderedItems });
        setCategory(reorderedItems);
    };

    const onDragEnd2 = (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedItems = reorder(items, result.source.index, result.destination.index);

        console.log({ reorderedItems });
        setItems(reorderedItems);
    };


    const onDragEnd3 = (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedItems = reorder(belongsTo, result.source.index, result.destination.index);

        console.log({ reorderedItems });
        setBelongsTo(reorderedItems);
    };

    const onDragEnd4 = (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedItems = reorder(clozeOptions, result.source.index, result.destination.index);

        console.log({ reorderedItems });
        setClozeOptions(reorderedItems);
    };


    const onDragEnd5 = (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedItems = reorder(comprehensionOptions, result.source.index, result.destination.index);

        console.log({ reorderedItems });
        setComprehensionOptions(reorderedItems);
    }


    const [removedParts, setRemovedParts] = useState([""]);
    console.log(removedParts);

    const handleRemovePart = (part) => {
        setRemovedParts((prevRemovedParts) => [...prevRemovedParts, part]);
        setClozeOptions((prevOptions) =>
            prevOptions.map((item) =>
                item.content === part ? { ...item, content: `_${"_".repeat(3)}` } : item
            )
        );
    };
    console.log(clozeOptions);

    const createClozePreview = () => {
        const questionParts = clozeQuestion?.split(' ');

        const clozePreview = questionParts?.map((part, index) => (
            <span key={index}>
                {category.find((item) => item.content === part) ? (
                    <span
                        style={{ background: 'lightyellow' }}
                        contentEditable={false}
                        onClick={() => removedParts(part)}
                    >
                        {"_".repeat(4)}&nbsp;
                    </span>
                ) : (
                    `${part} `
                )}
            </span>
        ));

        return clozePreview;
    };





    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const catArr = category.map((item) => item.content);

        let itemsArr = []
        for (let i = 0; i < items.length; i++) {
            itemsArr.push(items[i].content)
        }

        let belongsToArr = []
        for (let i = 0; i < belongsTo.length; i++) {
            belongsToArr.push(belongsTo[i].content)
        }

        const clozeOp = clozeOptions.map((item) => item.content);
        const ComprehensionOp = comprehensionOptions.map((item) => item.content);


        const data = {
            categorize: [
                {
                    categorize_points: Number(categorizePoints),
                    categorize_description: categorizeDescription,
                    categorize_media: categorizeMedia,
                    category: catArr,
                    items: itemsArr,
                    belongsTo: belongsTo
                },
            ],
            cloze: [
                {
                    cloze_points: Number(clozePoints),
                    cloze_preview: "none",
                    cloze_question: clozeQuestion,
                    cloze_media: clozeMedia,
                    cloze_options: clozeOp,
                },
            ],
            comprehension: [
                {
                    comprehension_points: Number(comprehensionPoints),
                    comprehension_description: comprehensionDescription,
                    comprehension_passage: comprehensionPassage,
                    comprehension_media: comprhensionMedia,
                    comprehension_questions: comprehensionQuestion,
                    comprehension_options: ComprehensionOp,
                },
            ],
        };

        console.log(data);
        await axios.post('https://quiz-api-2cgp.onrender.com/api/create', data)
            .then(response => alert("Quiz Created Successfully"))
            .catch(error => alert("Somthing went wrong"));

    };





    return (
        <div>
            <div className='fixed w-full'>
                <Navbar />
            </div>
            <div>
                <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md border-2 border-gray-300 ">
                    <form onSubmit={handleFormSubmit} className="space-y-4 w-[full]">
                        <div className="categorized w-[full] shadow-xl p-4">
                            <div className='flex justify-between items-center mb-4'>
                                <div>
                                    <label htmlFor="screen" className="block text-lg font-semibold text-blue-600 mb-2">Screen 1</label>
                                </div>
                                <div className="mb-4 flex items-center gap-1">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-2">points</label>
                                    <input
                                        type="text"
                                        name="categorize_points"
                                        value={formData.categorize.categorize_points}
                                        onChange={(e) => setCategorizePoints(e.target.value)}
                                        className="input-field border-2 border-blue-400 rounded-md w-[50px] py-2 px-3"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-2">Description</label>
                                <input
                                    type="text"
                                    name="categorize_description"
                                    value={formData.categorize.categorize_description}
                                    onChange={(e) => setCategorizeDescription(e.target.value)}
                                    className="input-field border-2 border-blue-400 rounded-md w-full py-2 px-3"
                                />
                            </div>
                            <div className="mb-4 flex items-center gap-1">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-2">Media :</label>
                                <input
                                    type="text"
                                    name="categorize_points"
                                    value={formData.categorize.categorize_media}
                                    onChange={(e) => setCategorizeMedia(e.target.value)}
                                    className="input-field border-2 border-blue-400 rounded-md w-[150px] py-2 px-3"
                                />
                            </div>
                            <Catagorize handleInputCategoryChange={handleInputCategoryChange} onDragEnd={onDragEnd} item={category} />
                            <div className='flex justify-between'>
                                <Items handleInputItemsChange={handleInputItemsChange} onDragEnd={onDragEnd2} item={items} />
                                <BelongsTo handleInputBelongsToChange={handleInputBelongsToChange} onDragEnd={onDragEnd3} item={belongsTo} />
                            </div>
                        </div>

                        {/* Cloze ------------------------------------------------------*/}
                        <div className="categorized shadow-xl p-4">
                            <div className='flex justify-between items-center mb-4'>
                                <div>
                                    <label htmlFor="screen" className="block text-lg font-semibold text-blue-600 mb-2">Screen 2
                                    </label>
                                </div>
                                <div className="mb-4 flex items-center gap-1">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-2">points</label>
                                    <input
                                        type="text"
                                        name="cloze_points"
                                        value={clozePoints}
                                        onChange={(e) => setClozePoints(e.target.value)}
                                        className="input-field border-2 border-blue-400 rounded-md w-[50px] py-2 px-3"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-2">Preview</label>
                                <div className='input-field border-2 border-blue-400 rounded h-[30px] px-[10px] text-left'>
                                    {createClozePreview()}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-2">Sentence</label>
                                <input
                                    type="text"
                                    name="cloze_question"
                                    value={clozeQuestion}
                                    onChange={(e) => setClozeQuestion(e.target.value)}
                                    className="input-field border-2 border-blue-400 rounded-md w-full py-2 px-3"
                                />
                            </div>
                            <div className="mb-4 flex items-center gap-1">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-2">Media :</label>
                                <input
                                    type="text"
                                    name="categorize_points"
                                    value={formData.cloze.cloze_media}
                                    onChange={(e) => setClozeMedia(e.target.value)}
                                    className="input-field border-2 border-blue-400 rounded-md w-[150px] py-2 px-3"
                                />
                            </div>
                            <ClozeOptions handleOptionsChange={handleOptionsChange} onDragEnd={onDragEnd4} item={clozeOptions} />
                        </div>





                        {/* comprehension */}




                        <div className="categorized w-[full] shadow-xl p-4">
                            <div className='flex justify-between items-center mb-4'>
                                <div>
                                    <label htmlFor="screen" className="block text-lg font-semibold text-blue-600 mb-2">Screen 3</label>
                                </div>
                                <div className="mb-4 flex items-center gap-1">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-2">points</label>
                                    <input
                                        type="text"
                                        name="categorize_points"
                                        value={formData.comprehension.comprehension_points}
                                        onChange={(e) => setComprehensionPoints(e.target.value)}
                                        className="input-field border-2 border-blue-400 rounded-md w-[50px] py-2 px-3"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-2">Description</label>
                                <input
                                    type="text"
                                    name="categorize_description"
                                    value={formData.comprehension.comprehension_description}
                                    onChange={(e) => setComprehensionDescription(e.target.value)}
                                    className="input-field border-2 border-blue-400 rounded-md w-full py-2 px-3"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-2">Passage</label>
                                <input
                                    type="text"
                                    name="categorize_description"
                                    value={formData.comprehension.comprehension_passage}
                                    onChange={(e) => setComprehensionPassage(e.target.value)}
                                    className="input-field border-2 border-blue-400 rounded-md w-full py-2 px-3"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-2">Question</label>
                                <input
                                    type="text"
                                    name="categorize_description"
                                    value={formData.comprehension.comprehension_questions}
                                    onChange={(e) => setComprehensionQuestion(e.target.value)}
                                    className="input-field border-2 border-blue-400 rounded-md w-full py-2 px-3"
                                />
                            </div>
                            <div className="mb-4 flex items-center gap-1">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-2">Media :</label>
                                <input
                                    type="text"
                                    name="categorize_points"
                                    value={formData.comprehension.comprehension_media}
                                    onChange={(e) => setComprehensionMedia(e.target.value)}
                                    className="input-field border-2 border-blue-400 rounded-md w-[150px] py-2 px-3"
                                />
                            </div>
                            <ComprehensionOptions handleInputComprehensionChange={handleInputComprehensionChange} onDragEnd={onDragEnd5} item={comprehensionOptions} />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                        >
                            Create Quiz
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default CreateFormPage;