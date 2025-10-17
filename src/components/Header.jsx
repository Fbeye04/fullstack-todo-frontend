import { useTheme } from "../context/ThemeContext.jsx";

export default function Header() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <header className='flex justify-between items-center pt-10 px-8 md:pt-20 md:px-16'>
      <h1 className='uppercase text-black dark:text-white font-bold text-4xl md:text-5xl'>
        todo
      </h1>
      <div className='cursor-pointer' onClick={toggleDarkMode}>
        {isDarkMode ? (
          <i className='fa-solid fa-sun text-4xl md:text-5xl text-white'></i>
        ) : (
          <i className='fa-solid fa-moon text-4xl md:text-5xl'></i>
        )}
      </div>
    </header>
  );
}
