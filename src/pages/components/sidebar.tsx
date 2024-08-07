import React, { useState } from 'react';

const projects: { [key: string]: { [key: string]: string } } = {
  "Proje İsim 1": {
    "Overview": "3",
    "Notifications": "4",
    "Analytics": "7",
    "Reports": "2"
  },
  "Proje İsim 2": {
    "Overview": "5",
    "Notifications": "7",
    "Analytics": "1",
    "Reports": "3"
  },
  "Proje İsim 3": {
    "Overview": "6",
    "Notifications": "3",
    "Analytics": "2",
    "Reports": "8"
  },
  "Proje İsim 4": {
    "Overview": "2",
    "Notifications": "4",
    "Analytics": "3",
    "Reports": "1"
  }
};

const colors = [
  '#F04438', '#0000FF', '#FFFF00', '#800080', '#00FF00',
  '#FF00FF', '#00FFFF', '#FFA500', '#FFC0CB', '#A52A2A'
];

const DropdownContent = ({ content }: { content: { [key: string]: string } }) => {
  return (
    <div className="space-y-4 text-sm transition-all duration-300 ease-in-out">
      {Object.entries(content).map(([key, value]) => (
        <div key={key} className="flex justify-between items-center text-gray-500 py-2 my-3 ml-3">
          <span>{key}</span>
          <span className="text-xs text-gray-600 bg-gray-100 border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center">{value}</span>
        </div>
      ))}
    </div>
  );
};

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleToggle = (projectName: string) => {
    setOpenDropdown(openDropdown === projectName ? null : projectName);
  };

  return (
    <div className="flex bg-blue-50 h-4/6">
      <div className="py-5 flex flex-col justify-between bg-blue-900 w-16">
        <div className="space-y-6 p-4  ">
          <div className="flex justify-center items-center">
            <button className="p-2 rounded-lg hover:bg-blue-950">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.7952 17.5001C8.38281 18.0187 9.15468 18.3334 10.0001 18.3334C10.8454 18.3334 11.6173 18.0187 12.2049 17.5001M15.0001 6.66675C15.0001 5.34067 14.4733 4.0689 13.5356 3.13121C12.5979 2.19353 11.3261 1.66675 10.0001 1.66675C8.67397 1.66675 7.4022 2.19353 6.46452 3.13121C5.52684 4.0689 5.00006 5.34067 5.00006 6.66675C5.00006 9.2419 4.35045 11.005 3.62478 12.1713C3.01266 13.155 2.7066 13.6468 2.71783 13.784C2.73025 13.936 2.76244 13.9939 2.88487 14.0847C2.99544 14.1667 3.49388 14.1667 4.49077 14.1667H15.5093C16.5062 14.1667 17.0047 14.1667 17.1152 14.0847C17.2377 13.9939 17.2699 13.936 17.2823 13.784C17.2935 13.6468 16.9875 13.155 16.3753 12.1713C15.6497 11.005 15.0001 9.2419 15.0001 6.66675Z" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="flex justify-center items-center">
            <button className="p-2 rounded-lg hover:bg-blue-950">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.7952 17.5001C8.38281 18.0187 9.15468 18.3334 10.0001 18.3334C10.8454 18.3334 11.6173 18.0187 12.2049 17.5001M15.0001 6.66675C15.0001 5.34067 14.4733 4.0689 13.5356 3.13121C12.5979 2.19353 11.3261 1.66675 10.0001 1.66675C8.67397 1.66675 7.4022 2.19353 6.46452 3.13121C5.52684 4.0689 5.00006 5.34067 5.00006 6.66675C5.00006 9.2419 4.35045 11.005 3.62478 12.1713C3.01266 13.155 2.7066 13.6468 2.71783 13.784C2.73025 13.936 2.76244 13.9939 2.88487 14.0847C2.99544 14.1667 3.49388 14.1667 4.49077 14.1667H15.5093C16.5062 14.1667 17.0047 14.1667 17.1152 14.0847C17.2377 13.9939 17.2699 13.936 17.2823 13.784C17.2935 13.6468 16.9875 13.155 16.3753 12.1713C15.6497 11.005 15.0001 9.2419 15.0001 6.66675Z" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="flex justify-center items-center">
            <button className="p-2 rounded-lg hover:bg-blue-950">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.7952 17.5001C8.38281 18.0187 9.15468 18.3334 10.0001 18.3334C10.8454 18.3334 11.6173 18.0187 12.2049 17.5001M15.0001 6.66675C15.0001 5.34067 14.4733 4.0689 13.5356 3.13121C12.5979 2.19353 11.3261 1.66675 10.0001 1.66675C8.67397 1.66675 7.4022 2.19353 6.46452 3.13121C5.52684 4.0689 5.00006 5.34067 5.00006 6.66675C5.00006 9.2419 4.35045 11.005 3.62478 12.1713C3.01266 13.155 2.7066 13.6468 2.71783 13.784C2.73025 13.936 2.76244 13.9939 2.88487 14.0847C2.99544 14.1667 3.49388 14.1667 4.49077 14.1667H15.5093C16.5062 14.1667 17.0047 14.1667 17.1152 14.0847C17.2377 13.9939 17.2699 13.936 17.2823 13.784C17.2935 13.6468 16.9875 13.155 16.3753 12.1713C15.6497 11.005 15.0001 9.2419 15.0001 6.66675Z" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="flex justify-center items-center">
            <button className="p-2 rounded-lg hover:bg-blue-950">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.7952 17.5001C8.38281 18.0187 9.15468 18.3334 10.0001 18.3334C10.8454 18.3334 11.6173 18.0187 12.2049 17.5001M15.0001 6.66675C15.0001 5.34067 14.4733 4.0689 13.5356 3.13121C12.5979 2.19353 11.3261 1.66675 10.0001 1.66675C8.67397 1.66675 7.4022 2.19353 6.46452 3.13121C5.52684 4.0689 5.00006 5.34067 5.00006 6.66675C5.00006 9.2419 4.35045 11.005 3.62478 12.1713C3.01266 13.155 2.7066 13.6468 2.71783 13.784C2.73025 13.936 2.76244 13.9939 2.88487 14.0847C2.99544 14.1667 3.49388 14.1667 4.49077 14.1667H15.5093C16.5062 14.1667 17.0047 14.1667 17.1152 14.0847C17.2377 13.9939 17.2699 13.936 17.2823 13.784C17.2935 13.6468 16.9875 13.155 16.3753 12.1713C15.6497 11.005 15.0001 9.2419 15.0001 6.66675Z" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="w-4/5 bg-white p-6 hidden md:block">
        <h1 className='text-black py-3'>Projeler</h1>
        <div className="space-y-2">
          {Object.keys(projects).map((projectName, index) => (
            <div key={projectName}>
              <button
                className={`w-full px-4 py-2 transition-colors duration-300 hover:bg-blue-100 hover:text-blue-900 hover:font-bold hover:rounded-lg ${openDropdown === projectName ? 'bg-blue-100 text-blue-900 font-bold rounded-lg' : ''
                  }`}
                onClick={() => handleToggle(projectName)}
              >
                <div className="flex items-center justify-between">
                  <div className='flex items-center'>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="4" cy="4" r="4" fill={colors[index % colors.length]} />
                    </svg>
                    <div className="text-blue-900 mx-2">{projectName}</div>
                  </div>
                  <div className="text-gray-500">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdown === projectName ? 'max-h-screen' : 'max-h-0'}`}>
                {openDropdown === projectName && <DropdownContent content={projects[projectName]} />}
              </div>
            </div>
          ))}
          <button className='flex flex-column py-3 pr-3 hover:bg-blue-100 hover:text-blue-900 hover:font-bold hover:rounded-lg'>
            <div className='pr-4'>
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 17V7M7 17V1M1 17V11" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-gray-400">Proje Oluştur</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
