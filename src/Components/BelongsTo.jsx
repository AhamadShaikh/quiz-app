import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



const BelongsTo = ({ handleInputBelongsToChange, onDragEnd, item }) => {

    let grid = 8

    return (
        <div className="main_content text-left">
            <label>Belongs To</label>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="category">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                                background: snapshot.isDraggingOver ? 'lightblue' : 'white',
                                padding: grid,
                                width: 230,
                            }}
                        >
                            {item.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            className="card"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                userSelect: 'none',
                                                padding: 8,
                                                margin: '0 0 8px 0',
                                                background: snapshot.isDragging ? 'lightgreen' : 'skyblue',
                                                border: '1px solid #ddd',
                                                borderRadius: '4px',
                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                                ...provided.draggableProps.style,
                                            }}
                                        >
                                            <input
                                                type="text"
                                                className="card input-field"
                                                value={item.content}
                                                onChange={(e) => handleInputBelongsToChange(item.id, e.target.value)}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default BelongsTo;