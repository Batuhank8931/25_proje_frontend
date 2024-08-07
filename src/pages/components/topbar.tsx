import { useState } from 'react';
import '../../app/globals.css'; 

const Topbar: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
    if (window.innerWidth < 768) {
      setIsDropdownOpen(false); 
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const buttonClasses = (buttonName: string) =>
    `px-4 py-2 bg-white border border-gray-300 hover:bg-gray-100 transition-colors duration-300 ${
      activeButton === buttonName ? 'text-blue-800 font-bold' : 'text-gray-800'
    }`;

  return (
    <div className="flex flex-col items-start pl-8 py-4 bg-blue-50 pt-11 pr-5 w-full">
      <div className="flex items-center justify-between flex-wrap w-full">
        <div>
          <h1 className="text-2xl font-bold text-blue-800 truncate">Frontend Case</h1>
        </div>
        <div>
          <button className="text-blue-800 ml-auto">
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.66675 2.83333C1.66675 2.36662 1.66675 2.13327 1.75758 1.95501C1.83747 1.79821 1.96495 1.67072 2.12176 1.59083C2.30002 1.5 2.53337 1.5 3.00008 1.5H17.0001C17.4668 1.5 17.7001 1.5 17.8784 1.59083C18.0352 1.67072 18.1627 1.79821 18.2426 1.95501C18.3334 2.13327 18.3334 2.36662 18.3334 2.83333V3.39116C18.3334 3.61516 18.3334 3.72716 18.306 3.8313C18.2818 3.92359 18.2419 4.01103 18.188 4.0898C18.1272 4.17869 18.0426 4.25204 17.8733 4.39875L12.5435 9.01792C12.3742 9.16462 12.2896 9.23797 12.2288 9.32687C12.175 9.40564 12.135 9.49308 12.1108 9.58536C12.0834 9.68951 12.0834 9.80151 12.0834 10.0255V14.382C12.0834 14.5449 12.0834 14.6264 12.0571 14.6969C12.0339 14.7591 11.9961 14.8149 11.947 14.8596C11.8913 14.9102 11.8157 14.9404 11.6643 15.001L8.83101 16.1343C8.52472 16.2568 8.37158 16.3181 8.24864 16.2925C8.14114 16.2702 8.04679 16.2063 7.98612 16.1148C7.91675 16.0101 7.91675 15.8452 7.91675 15.5153V10.0255C7.91675 9.80151 7.91675 9.68951 7.88938 9.58536C7.86512 9.49308 7.82519 9.40564 7.77134 9.32687C7.71056 9.23797 7.62593 9.16462 7.45666 9.01792L2.12684 4.39875C1.95757 4.25204 1.87293 4.17869 1.81216 4.0898C1.7583 4.01103 1.71838 3.92359 1.69412 3.8313C1.66675 3.72716 1.66675 3.61516 1.66675 3.39116V2.83333Z"
                stroke="#98A2B3"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="hidden md:flex mt-4">
        <button
          className={`${buttonClasses('Boards')} rounded-l-lg`}
          onClick={() => handleButtonClick('Boards')}
        >
          Boards
        </button>
        <button
          className={buttonClasses('List')}
          onClick={() => handleButtonClick('List')}
        >
          List
        </button>
        <button
          className={buttonClasses('Other1')}
          onClick={() => handleButtonClick('Other1')}
        >
          Other
        </button>
        <button
          className={buttonClasses('Other2')}
          onClick={() => handleButtonClick('Other2')}
        >
          Other
        </button>
        <button
          className={buttonClasses('Other3')}
          onClick={() => handleButtonClick('Other3')}
        >
          Other
        </button>
        <button
          className={buttonClasses('Other4')}
          onClick={() => handleButtonClick('Other4')}
        >
          Other
        </button>
        <button
          className={`${buttonClasses('Other5')} rounded-r-lg`}
          onClick={() => handleButtonClick('Other5')}
        >
          Other
        </button>
      </div>

      <div className="md:hidden mt-4 relative">
        <button
          className="bg-white text-black px-4 py-2 rounded-lg border border-gray-400"
          style={{width:"350%"}}
          onClick={toggleDropdown}
        >
          Menu
        </button>
        {isDropdownOpen && (
          <div className="absolute left-0 w-full bg-white border border-gray-200 rounded-lg mt-2">
            <button
              className={`${buttonClasses('Boards')} w-full text-left px-4 py-2`}
              style={{width:"350%"}}
              onClick={() => handleButtonClick('Boards')}
            >
              Boards
            </button>
            <button
              className={`${buttonClasses('List')} w-full text-left px-4 py-2`}
              style={{width:"350%"}}
              onClick={() => handleButtonClick('List')}
            >
              List
            </button>
            <button
              className={`${buttonClasses('Other1')} w-full text-left px-4 py-2`}
              style={{width:"350%"}}
              onClick={() => handleButtonClick('Other1')}
            >
              Other
            </button>
            <button
              className={`${buttonClasses('Other2')} w-full text-left px-4 py-2`}
              style={{width:"350%"}}
              onClick={() => handleButtonClick('Other2')}
            >
              Other
            </button>
            <button
              className={`${buttonClasses('Other3')} w-full text-left px-4 py-2`}
              style={{width:"350%"}}
              onClick={() => handleButtonClick('Other3')}
            >
              Other
            </button>
            <button
              className={`${buttonClasses('Other4')} w-full text-left px-4 py-2`}
              style={{width:"350%"}}
              onClick={() => handleButtonClick('Other4')}
            >
              Other
            </button>
            <button
              className={`${buttonClasses('Other5')} w-full text-left px-4 py-2`}
              style={{width:"350%"}}
              onClick={() => handleButtonClick('Other5')}
            >
              Other
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
