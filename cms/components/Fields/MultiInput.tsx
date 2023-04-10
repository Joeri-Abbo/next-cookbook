import React from 'react';
import TrashSolid from "../../../public/icons/trash-solid.svg"
import PlusSolid from "../../../public/icons/plus-solid.svg"

interface InputFieldProps {
    onChangeInput: any;
    onRemoveInput: any;
    onAddInput: any;
    title: string;
    items: string[];
}

const Input = ({onChangeInput, title, items, onAddInput, onRemoveInput}: InputFieldProps) => {
    return (
        <div>
            <label>{title}:</label>
            {items.map((item: string, index: number) => (
                <div key={index} className="flex space-x-2">
                    <input
                        type="text"
                        value={item}
                        onChange={(e) => onChangeInput(index, e.target.value)}
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    />
                    {index > 0 && (
                        <button type="button" onClick={() => onRemoveInput(index)}>
                            <TrashSolid className={"w-4 h-4 hover:scale-125 transform-gpu fill-red-500"}/>

                        </button>
                    )}
                </div>
            ))}
            <button type="button" onClick={onAddInput}>
                <PlusSolid className={"w-4 h-4 hover:scale-125 transform-gpu fill-green-500"}/>

            </button>
        </div>
    );
};

export default Input;