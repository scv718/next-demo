import Link from 'next/link';

interface StyledLinkProps {
  href: string;
  children: React.ReactNode;
}

export function StyledLink({ href, children }: StyledLinkProps) {
  return (
    <Link href={href} className='group text-blue-400 transition-all duration-100 ease-in-out'>
      <span className='cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out'>
        {children}
      </span>
    </Link>
  );
}
