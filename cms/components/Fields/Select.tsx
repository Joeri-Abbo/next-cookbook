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
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
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