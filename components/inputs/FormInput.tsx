import { type ComponentProps, forwardRef } from 'react';

// 기본 <input> 태그의 속성을 포함하고, label을 추가로 받도록 타입을 정의합니다.
type FormInputProps = ComponentProps<'input'> & {
  label: string;
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({ label, name, ...props }, ref) => {
  return (
    <div>
      <label htmlFor={name} className='mb-2 dark:text-gray-400 text-lg'>
        {label}
      </label>
      <input
        id={name}
        name={name}
        ref={ref}
        {...props} // type, placeholder, react-hook-form의 onBlur, onChange 등이 여기에 포함됩니다.
        className='border p-3 dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full'
      />
    </div>
  );
});

FormInput.displayName = 'FormInput';

export { FormInput };
