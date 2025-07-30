import Image from 'next/image';

interface SocialButtonProps {
  src: string;
  alt: string;
  onClick?: () => void;
  isDarkModeInvert?: boolean; // 다크모드일 때 색상 반전 여부
}

export function SocialButton({ src, alt, onClick, isDarkModeInvert = false }: SocialButtonProps) {
  const imageClassName = isDarkModeInvert ? 'filter dark:invert' : '';

  return (
    <button className='hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1'>
      <Image src={src} alt={alt} width={25} height={25} className={imageClassName} onClick={onClick} />
    </button>
  );
}
