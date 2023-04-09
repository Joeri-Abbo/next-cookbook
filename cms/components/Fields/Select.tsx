import React from 'react';

interface option {
    value: string;
    label: string;
}

interface InputFieldProps {
    value: string;
    onChange: any;
    title: string;
    options?: option[];
}

const Select = ({value, onChange, title, options}: InputFieldProps) => {
    return (
        <label>
            {title}:
            <select
                value={value}
                onChange={onChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            >
                {options?.length && options?.map(
                    (option) => (
                        <option value={option.value}>{option.label}</option>
                    )
                )}
            </select>
        </label>
    );
};

export default Select;