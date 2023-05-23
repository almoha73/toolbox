
interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (e:any) => void;
    }


const Checkbox: React.FC<CheckboxProps> = ({label, checked, onChange})=> {

    return (
        <label
        htmlFor={label}
        className="flex items-center cursor-pointer "
        >
        <div className="mr-3 text-red-400 font-medium">
            {label}
        </div>
        <div className="relative">
            <input
            type="checkbox"
            id={label}
            className="hidden"
            checked={checked}
            onChange={onChange}
            />
            <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
            <div className="toggle__dot absolute w-4 h-4 bg-white rounded-full shadow inset-y-0 left-0"></div>
        </div>
        </label>
    )
    }

export default Checkbox;