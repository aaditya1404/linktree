
const RadioTogglers = ({ options, defaultValue, onChange }) => {
    return (
        <div className="radio-togglers shadow ">
            {options.map(option => (
                <label
                    key={option}
                >
                    <input
                        type="radio"
                        name="bgType"
                        onClick={e => onChange(e.target.value)}
                        defaultChecked={defaultValue === option.value}
                        value={option.value}
                    />
                    <span>{option.label}</span>
                </label>
            ))}
        </div>
    )
}

export default RadioTogglers;
