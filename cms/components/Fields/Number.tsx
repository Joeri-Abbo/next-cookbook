import React from 'react';

interface InputFieldProps {
    value: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    title: string;
}

const Number = ({value, onChange, title}: InputFieldProps) => {
    return (
        <label>
            {title}:
            <input
                type="number"
                value={value}
                onChange={onChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
        </label>
    );
};

export default Number;