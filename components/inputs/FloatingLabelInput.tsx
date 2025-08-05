import { type ComponentProps, forwardRef } from 'react';

// 기본 <input> 태그의 속성을 포함하고, label을 추가로 받도록 타입을 정의합니다.
type FloatingLabelInputProps = ComponentProps<'input'> & {
  label: string;
};

export default (props: FloatingLabelInputProps) => {
  return (
    <div className='relative'>
      <input
        className='peer p-4 block w-full border border-gray-400 rounded-lg sm:text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    not-placeholder-shown:pt-6
    not-placeholder-shown:pb-2
    autofill:pt-6
    autofill:pb-2'
        placeholder={''}
        {...props}
      />
      <label
        htmlFor={props.id}
        className='absolute top-0 start-0 p-4 h-full sm:text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-not-placeholder-shown:scale-90
      peer-not-placeholder-shown:translate-x-0.5
      peer-not-placeholder-shown:-translate-y-1.5
      peer-not-placeholder-shown:text-gray-500 dark:peer-not-placeholder-shown:text-neutral-500 dark:text-neutral-500'>
        {props.label}
      </label>
    </div>
  );
};
