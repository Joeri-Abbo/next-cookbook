import React from 'react';

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
                            Remove
                        </button>
                    )}
                </div>
            ))}
            <button type="button" onClick={onAddInput}>
                +
            </button>
        </div>
    );
};

export default Input;