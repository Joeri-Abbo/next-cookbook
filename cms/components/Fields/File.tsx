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
            <img src={value.startsWith("http") ? value : process.env.COOKBOOK_URL + value}
                 alt={title}
                 className="mb-4 h-48 w-full object-cover"/>

            <input onChange={onChange} type="file" accept="image/*"
                   title={title}/>
        </label>
    );
};

export default Input;