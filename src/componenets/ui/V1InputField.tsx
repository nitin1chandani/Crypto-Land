interface V1InputFieldProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}
export default function V1InputField({ placeholder, value, onChange, disabled }: V1InputFieldProps) {
  return (
    <input
      type="text"
      placeholder={disabled ? "Connect Wallet" : placeholder}
      className={`p-2 border border-purple-400 rounded-lg focus:outline-none ${disabled ? 'cursor-not-allowed' : ''}`}
      onChange={onChange}
      value={value}
      disabled={disabled}
    />
  );
}
