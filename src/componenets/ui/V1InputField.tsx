interface V1InputFieldProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function V1InputField({ placeholder, value, onChange }: V1InputFieldProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="p-2 border border-purple-400 rounded-lg focus:outline-none"
      onChange={onChange}
      value={value}
    />
  );
}
