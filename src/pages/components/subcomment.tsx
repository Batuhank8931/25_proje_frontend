import React, { useState, useRef } from 'react';

interface ButtonProps {
  isActive: boolean;
  text: string;
  onClick: () => void;
}

interface SubCommentProps {
  activeTab: string;
  setActiveTab: (tab: 'attachment' | 'subtask' | 'comment') => void;
}

const CustomButton: React.FC<ButtonProps> = ({ isActive, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-1/3 py-2 flex items-center justify-center border-b-2 ${isActive
        ? 'text-blue-600 font-bold border-blue-600'
        : 'text-gray-400 border-transparent'
        }`}
    >
      <svg
        width="14"
        height="16"
        viewBox="0 0 14 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <path
          d="M13.1017 7.26634L7.09133 13.2768C5.72449 14.6436 3.50842 14.6436 2.14158 13.2768C0.774746 11.9099 0.774747 9.69384 2.14158 8.327L8.15199 2.3166C9.06321 1.40537 10.5406 1.40537 11.4518 2.3166C12.363 3.22782 12.363 4.7052 11.4518 5.61643L5.67711 11.3911C5.2215 11.8467 4.48281 11.8467 4.0272 11.3911C3.57159 10.9355 3.57159 10.1968 4.0272 9.74122L9.0948 4.67362"
          stroke={isActive ? "#145389" : "#A0AEC0"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h1>{text}</h1>
    </button>
  );
};

const SubComment: React.FC<SubCommentProps> = ({ activeTab, setActiveTab }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log(event.target.files);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      console.log(event.dataTransfer.files);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex justify-around w-full border-b text-xs md:text-l">
        <CustomButton isActive={activeTab === 'attachment'} text="Attachment" onClick={() => setActiveTab('attachment')} />
        <CustomButton isActive={activeTab === 'subtask'} text="Sub Task" onClick={() => setActiveTab('subtask')} />
        <CustomButton isActive={activeTab === 'comment'} text="Comment" onClick={() => setActiveTab('comment')} />
      </div>
      <div className="flex-grow w-full md:p-4 p-1 text-xs md:text-l">
        {activeTab === 'attachment' && (
          <div className="flex flex-col items-center justify-center flex-grow">
            <div className="flex items-center justify-center w-16 h-16 sm:w-10 sm:h-10">
              <img src="/upload.png" alt="Upload Icon" className="w-10 h-10 sm:w-6 sm:h-6" />
            </div>
            <p className="text-blue-600 cursor-pointer sm:text-sm" onClick={handleUploadClick}>
              Click to upload
            </p>
            <p className="text-gray-400 sm:text-xs">
              or drag and drop
            </p>
            <p className="text-gray-400 text-sm sm:text-xs">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept=".svg,.png,.jpg,.gif"
            />
          </div>
        )}
        {activeTab === 'subtask' && (
          <div className='flex flex-row pb-2 justify-between border-b border-gray-400'>
            <div className=''>
              <div className='flex flex-column py-2'>
                <div>
                  <svg width="20" height="20" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12.5" cy="13" r="11.25" stroke="#8D99AE" strokeWidth="2.5" />
                    <circle cx="12.5" cy="13" r="7.5" fill="#8D99AE" />
                  </svg>
                </div>
                <div className='text-gray-600 px-3'>
                  Task Conent
                </div>
                <div className='text-gray-300'>
                  #1321354
                </div>
              </div>
              <div className='flex flex-column'>
                <div className='text-gray-300'>
                  <svg width="20" height="20" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.06177 6.76953H13.9444" stroke="#98A2B3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.9614 9.37305H10.9676" stroke="#98A2B3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.00305 9.37305H8.00923" stroke="#98A2B3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.03857 9.37305H5.04475" stroke="#98A2B3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.9614 11.9641H10.9676" stroke="#98A2B3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.00305 11.9641H8.00923" stroke="#98A2B3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.03857 11.9641H5.04475" stroke="#98A2B3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.6958 1.83325V4.02711" stroke="#98A2B3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.3103 1.83325V4.02711" stroke="#98A2B3" strokeLinecap="round" strokeLinejoin="round" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.8255 2.88599H5.18064C3.22285 2.88599 2 3.97661 2 5.98134V12.0144C2 14.0507 3.22285 15.1665 5.18064 15.1665H10.8193C12.7833 15.1665 14 14.0696 14 12.0649V5.98134C14.0062 3.97661 12.7895 2.88599 10.8255 2.88599Z" stroke="#98A2B3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className='text-gray-500 px-3 sm:text-xs'>01.01.1970 - 01.01.1970</div>
                <div>
                  <svg width="20" height="20" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.707107" y="5" width="6.07107" height="6.07107" transform="rotate(-45 0.707107 5)" stroke="#98A2B3" />
                    <rect x="0.707107" y="5" width="6.07107" height="6.07107" transform="rotate(-45 0.707107 5)" stroke="#98A2B3" />
                  </svg>

                </div>
                <div className='text-gray-300 px-3 sm:text-xs'>Milstone Name</div>
                <div>
                  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.6191 8.05667L13.2878 4.90133C13.3698 4.746 13.3644 4.55933 13.2738 4.40933C13.1838 4.25933 13.0211 4.16733 12.8458 4.16733H8.45711V3.26C8.45711 2.984 8.23311 2.76 7.95711 2.76H3.65442V2.5C3.65442 2.224 3.43042 2 3.15442 2C2.87842 2 2.65442 2.224 2.65442 2.5V14.5C2.65442 14.776 2.87842 15 3.15442 15C3.43042 15 3.65442 14.776 3.65442 14.5V10.578L7.45844 10.484V11.498C7.45844 11.6327 7.51311 11.762 7.60911 11.856C7.70511 11.95 7.81044 11.998 7.97044 11.998L12.8578 11.8787C13.0318 11.8747 13.1904 11.78 13.2778 11.6293C13.3651 11.4793 13.3684 11.294 13.2858 11.1413L11.6191 8.05667Z" fill="#C80B0B" />
                  </svg></div>
              </div>
            </div>
            <div className=''>
              <img
                src={"/batu.jpeg"}
                alt={"/batu.jpeg"}
                className="rounded-full w-16 h-16 object-cover sm:w-10 sm:h-10"
              />
            </div>
          </div>
        )}
        {activeTab === 'comment' && (
          <div>
            <div className="items-center md:p-4 p-1 grid grid-cols-12 ">
              <div className="relative mr-1 col-span-2 flex justify-center">
                <img
                  src={"/batu.jpeg"}
                  alt={"/batu.jpeg"}
                  className="rounded-full w-16 h-16 object-cover sm:w-10 sm:h-10"
                />
              </div>

              <div className='col-span-10'>
                <div className='flex flex-row'>
                  <div className="text-blue-900 font-bold pr-3">Batuhan Karakaya</div>
                  <div className="text-gray-500 sm:text-xs">2 mins ago</div>
                </div>
                <div className='text-black sm:text-xs'>Added a file to Marketing site redesign</div>
              </div>
            </div>
            <div className='text-gray-400 border border-gray-400 m-4 md:p-4 p-1 rounded-xl sm:text-xs sm:p-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nulla mollitia ratione veritatis nesciunt laudantium quod pariatur soluta aliquid, ex accusamus, eligendi veniam fugit modi eius quam voluptate officia dolorum?
            </div>
          </div>
        )}
      </div>
    </div>
  );

};

export default SubComment;
