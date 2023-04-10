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
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
            />
        </label>
    );
};

export default Input;