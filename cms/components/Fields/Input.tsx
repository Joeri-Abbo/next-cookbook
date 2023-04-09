import React from 'react';

interface InputFieldProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    title: string;
}

const Input = ({value, onChange, title}: InputFieldProps) => {
    return (
        <label>
            {title}:
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
        </label>
    );
};

export default Input;