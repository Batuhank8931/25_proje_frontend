import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import apiClient from '../../utils/apiClient';
import API_URLS from '../../config/apiConfig';
import Activity from './activity';
import SubComment from './subcomment';
import EditTask from './edittaks';

interface TaskDetailProps {
	task: {
		id: number;
		name: string;
		description: string | null;
		startDate: string | null;
		endDate: string | null;
		flagId: number;
		code: number;
		boardId: number; 
	};
	onClose: () => void;
}

interface Flag {
	id: number;
	name: string;
	color: string;
	priority: number;
}

interface Task {
	id: number;
	name: string;
	description: string | null;
	code: number;
	boardId: number; 
	flagId: number;
  }
  
  

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onClose }) => {
	const router = useRouter();
	const [flags, setFlags] = useState<Flag[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
	const [activeTab, setActiveTab] = useState<'attachment' | 'subtask' | 'comment'>('attachment');

	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	useEffect(() => {
		const fetchFlags = async () => {
			try {
				const data = await apiClient(API_URLS.flags);
				setFlags(data.data);
			} catch (error) {
				setError('Failed to fetch flags');
			}
		};

		fetchFlags();
	}, []);

	const getFlagColor = (flagId: number) => {
		const flag = flags.find(f => f.id === flagId);
		return flag ? flag.color : '#000';
	};

	const handleEditTaskOpen = () => {
		setIsEditTaskOpen(true);
	};

	const handleEditTaskClose = () => {
		setIsEditTaskOpen(false);
	};

	const handleDeleteTask = async () => {
		const isConfirmed = window.confirm("Are you sure you want to delete this task?");
		if (!isConfirmed) {
			return; 
		}

		try {
			const response = await apiClient(API_URLS.updateTask(task.code.toString()), 'DELETE');
			console.log('Response from server:', response);
			onClose(); 
			router.push('/dashboard'); 
		} catch (error) {
			console.error('Error deleting task:', error);
		}
	};


	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg shadow-lg p-6 relative md:h-[90%] md:w-[80%] h-[95%] w-full">

				<button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
					&times;
				</button>
				<div className="grid grid-cols-12 h-full">
					<div className="col-span-12  md:col-span-8 h-full pr-2 flex flex-col">
						<div className="flex items-center justify-end mb-4">
							<div className="flex flex-column text-sm text-gray-600 border border-gray-300 p-2 rounded-lg">
								<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M9.99996 18.3334C14.6023 18.3334 18.3333 14.6025 18.3333 10.0001C18.3333 5.39771 14.6023 1.66675 9.99996 1.66675C5.39759 1.66675 1.66663 5.39771 1.66663 10.0001C1.66663 14.6025 5.39759 18.3334 9.99996 18.3334Z" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
								<span className='px-2'>{new Date(task.startDate || "").toLocaleDateString()} - {new Date(task.endDate || "").toLocaleDateString()}</span>
							</div>
							<div className="relative inline-block text-left">
								<button
									className="text-black bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
									onClick={toggleDropdown}
								>
									Edit
									<svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
									</svg>
								</button>

								{dropdownOpen && (
									<div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
										<button
											onClick={handleEditTaskOpen}
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
										>
											Update
										</button>
										<button
											onClick={handleDeleteTask}
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
										>
											Delete
										</button>
									</div>
								)}
							</div>
						</div>
						<div className='flex flex-column items-center my-4 w-8/12'>
							<svg width="25" height="25" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="12.5" cy="13" r="11.25" stroke="#8D99AE" strokeWidth="2.5" />
								<circle cx="12.5" cy="13" r="7.5" fill="#8D99AE" />
							</svg>

							<h3 className="text-xl font-semibold text-gray-500 ml-2">{task.description}</h3>
						</div>

						<div className="flex justify-between items-center mb-4">
							<div className="text-sm text-gray-400 flex flex-column">
								<div className='pr-2'>
									ID: #{task.id}
								</div>
								<button
									className='hover:bg-gray-100 hover:rounded-lg'
									onClick={() => {
										navigator.clipboard.writeText(task.id.toString());
										alert(`Task ID ${task.id} has been copied to clipboard`);
									}}
								>
									<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd" clipRule="evenodd" d="M2.23679 2.30337C2.71882 1.78555 3.40197 1.5 4.1964 1.5H8.04616C8.7469 1.5 9.36163 1.71993 9.82923 2.12994C10.2953 2.53859 10.5839 3.10846 10.6842 3.75541C10.7265 4.02829 10.5396 4.28381 10.2667 4.32611C9.99376 4.36841 9.7383 4.18149 9.69596 3.90861C9.6267 3.46193 9.43676 3.11579 9.16996 2.88184C8.9047 2.64926 8.53223 2.5 8.04616 2.5H4.1964C3.65062 2.5 3.24272 2.69041 2.96874 2.98473C2.6911 3.28299 2.51428 3.72815 2.51428 4.29665V7.92247C2.51428 8.4404 2.66168 8.8566 2.89771 9.15047C3.13052 9.44027 3.47213 9.6404 3.92401 9.6964C4.19806 9.7304 4.39266 9.98013 4.35868 10.2541C4.32469 10.5282 4.07498 10.7228 3.80094 10.6888C3.10482 10.6025 2.52234 10.28 2.11805 9.77667C1.71699 9.27733 1.51428 8.6296 1.51428 7.92247V4.29665C1.51428 3.52042 1.75842 2.81726 2.23679 2.30337Z" fill="#98A2B3" />
										<path fillRule="evenodd" clipRule="evenodd" d="M5.99596 6.08821C6.47812 5.57106 7.16126 5.2865 7.95553 5.2865H11.804C12.6001 5.2865 13.2836 5.57083 13.7655 6.08848C14.2437 6.60209 14.4861 7.30471 14.4861 8.07991V11.7058C14.4861 12.481 14.2437 13.1836 13.7654 13.6972C13.2834 14.2149 12.5998 14.4992 11.8033 14.4992H7.95553C7.1594 14.4992 6.47592 14.2148 5.99401 13.6972C5.51587 13.1836 5.27344 12.481 5.27344 11.7058V8.07991C5.27344 7.30397 5.51742 6.60147 5.99596 6.08821ZM6.7274 6.77017C6.45008 7.06757 6.27344 7.51171 6.27344 8.07991V11.7058C6.27344 12.2746 6.44937 12.7187 6.72593 13.0158C6.99873 13.3088 7.40633 13.4992 7.95553 13.4992H11.8033C12.3529 13.4992 12.7607 13.3088 13.0335 13.0158C13.3102 12.7187 13.4861 12.2746 13.4861 11.7058V8.07991C13.4861 7.51104 13.3102 7.06697 13.0336 6.76984C12.7608 6.47683 12.3532 6.2865 11.804 6.2865H7.95553C7.40893 6.2865 7.00106 6.4766 6.7274 6.77017Z" fill="#98A2B3" />
									</svg>

								</button>
							</div>
						</div>
						<div className="flex items-center justify-between mb-4 w-full md:w-7/12">
							<div className="text-sm text-gray-600">
								<div className="flex items-center">
									<span className="pb-4">Task Status</span>
								</div>
								<div className='w-8 h-8'>
									<span className="text-black ml-1 ">Open</span>
								</div>
							</div>
							<div className="text-sm text-gray-600">
								<div className="flex items-center">
									<span className="pb-4">Assignment</span>
								</div>
								<div className='flex flex-column'>
									<div className="flex -space-x-2 overflow-hidden">
										<img src="/batu.jpeg" alt="Profile" className="w-8 h-8 rounded-full border-2 border-white" />
										<img src="/dilara.jpeg" alt="Profile" className="w-8 h-8 rounded-full border-2 border-white" />
										<span className="w-8 h-8 rounded-full border-2 border-white text-gray-500 text-sm bg-gray-200 flex items-center justify-center">+5</span>
									</div>
									<button className='hover:bg-gray-400 hover:rounded-lg'>
										<svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M1 17C1 8.16344 8.16344 1 17 1C25.8366 1 33 8.16344 33 17C33 25.8366 25.8366 33 17 33C8.16344 33 1 25.8366 1 17Z" fill="white" />
											<path d="M1 17C1 8.16344 8.16344 1 17 1C25.8366 1 33 8.16344 33 17C33 25.8366 25.8366 33 17 33C8.16344 33 1 25.8366 1 17Z" stroke="#D0D5DD" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 3" />
											<path d="M17 12.3334V21.6667M12.3334 17H21.6667" stroke="#98A2B3" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</button>
								</div>
							</div>
							<div className="text-sm text-gray-600">
								<div className="flex items-center">
									<span className="pb-4">Priority</span>
								</div>
								<div className="flex items-center w-8 h-8">
									<svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd" clipRule="evenodd" d="M11.6191 8.05667L13.2878 4.90133C13.3698 4.746 13.3644 4.55933 13.2738 4.40933C13.1838 4.25933 13.0211 4.16733 12.8458 4.16733H8.45711V3.26C8.45711 2.984 8.23311 2.76 7.95711 2.76H3.65442V2.5C3.65442 2.224 3.43042 2 3.15442 2C2.87842 2 2.65442 2.224 2.65442 2.5V14.5C2.65442 14.776 2.87842 15 3.15442 15C3.43042 15 3.65442 14.776 3.65442 14.5V10.578L7.45844 10.484V11.498C7.45844 11.6327 7.51311 11.762 7.60911 11.856C7.70511 11.95 7.81044 11.998 7.97044 11.998L12.8578 11.8787C13.0318 11.8747 13.1904 11.78 13.2778 11.6293C13.3651 11.4793 13.3684 11.294 13.2858 11.1413L11.6191 8.05667Z" fill={getFlagColor(task.flagId)} />
									</svg>
								</div>
							</div>
						</div>
						<div className="text-gray-600 mb-4">
							<h4 className="text-sm font-medium mb-2">Description</h4>
							<p>{task.description || 'No description available'}</p>
						</div>

						<div className="flex-grow flex">
							<SubComment activeTab={activeTab} setActiveTab={setActiveTab} />
						</div>
					</div>

					<div className="md:col-span-4 overflow-y-auto h-full col-span-12">
						<Activity/>
					</div>
				</div>
			</div>
			{isEditTaskOpen && (
				<EditTask
					task={task}
					onClose={handleEditTaskClose}
					flags={flags}
				/>
			)}
		</div>
	);
};

export default TaskDetail;
