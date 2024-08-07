import '../../app/globals.css'; 
import { useEffect, useState } from 'react';
import API_URLS from '../../config/apiConfig';
import apiClient from '../../utils/apiClient';
import {
	DragDropContext,
	Draggable,
	Droppable,
	DropResult
} from 'react-beautiful-dnd';
import TaskDetail from './task_detail'; 
import NewTask from './newtask';

interface TaskDetailProps {
	task: {
		id: number;
		code: number; 
		name: string;
		description: string | null;
		startDate: string | null;
		endDate: string | null;
		flagId: number;
	};
	onClose: () => void;
}

interface Task {
	id: number;
	createdUserId: number;
	name: string;
	description: string | null;
	code: number;
	boardId: number;
	flagId: number;
	order: number;
	startDate: string | null;
	endDate: string | null;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	deletedUserId: number | null;
}

interface Board {
	id: number;
	name: string;
	openAction: boolean;
	completeAction: boolean;
	order: number;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	tasks: Task[];
}

interface Flag {
	id: number;
	name: string;
	color: string;
	priority: number;
}

const Cards = () => {
	const [boards, setBoards] = useState<Board[]>([]);
	const [flags, setFlags] = useState<Flag[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null); 
	const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
	const [currentBoardId, setCurrentBoardId] = useState<number | null>(null);

	useEffect(() => {
		const fetchBoards = async () => {
			try {
				const data = await apiClient(API_URLS.boards);
				setBoards(data.data);
			} catch (error) {
				setError('Failed to fetch boards');
			}
		};

		const fetchFlags = async () => {
			try {
				const data = await apiClient(API_URLS.flags);
				setFlags(data.data);
			} catch (error) {
				setError('Failed to fetch flags');
			}
		};

		fetchBoards();
		fetchFlags();
	}, []);

	const handleNewTaskOpen = (boardId: number) => {
		setCurrentBoardId(boardId);
		setIsNewTaskOpen(true);
	};

	const handleNewTaskClose = () => {
		setIsNewTaskOpen(false);
		setCurrentBoardId(null);
	};

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const { source, destination } = result;

		const sourceBoardIndex = boards.findIndex(board => board.id === parseInt(source.droppableId));
		const destinationBoardIndex = boards.findIndex(board => board.id === parseInt(destination.droppableId));

		const sourceBoard = boards[sourceBoardIndex];
		const destinationBoard = boards[destinationBoardIndex];

		const [movedTask] = sourceBoard.tasks.splice(source.index, 1);

		if (sourceBoard.id === destinationBoard.id) {
			sourceBoard.tasks.splice(destination.index, 0, movedTask);
		} else {
			destinationBoard.tasks.splice(destination.index, 0, movedTask);
			movedTask.boardId = destinationBoard.id;
		}

		setBoards([...boards]);
	};

	const getFlagColor = (flagId: number) => {
		const flag = flags.find(f => f.id === flagId);
		return flag ? flag.color : '#000';
	};

	if (error) {
		return <div className="flex items-center justify-center min-h-screen bg-gray-100">{error}</div>;
	}

	return (
		<div className="flex flex-col items-center justify-start min-h-screen bg-blue-50 w-full">
			<DragDropContext onDragEnd={handleDragEnd}>
				<div className="flex space-x-4 overflow-x-auto mt-6 mx-1 w-full px-3 md:px-10">
					{boards.map((board) => (
						<Droppable key={board.id} droppableId={`${board.id}`}>
							{(provided) => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									className="bg-white shadow-md w-80 flex-shrink-0 rounded-xl border border-gray-300"
								>
									<div className="flex items-center border-b border-b-gray-300 w-full">
										<div className='flex justify-between items-center m-4 w-80'>
											<div className="flex items-center">
												<h2 className="text-xl text-blue-800 mr-2 uppercase">{board.name}</h2>
												<span className="text-sm text-blue-600 bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center">{board.tasks.length}</span>
											</div>
											<div className="flex items-center space-x-2">
												<button className="text-gray-500 hover:text-gray-700" onClick={() => handleNewTaskOpen(board.id)}>
													<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M6 12H18" stroke="#98A2B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
														<path d="M12 6V18" stroke="#98A2B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												</button>

												{isNewTaskOpen && currentBoardId === board.id && (
													<NewTask onClose={handleNewTaskClose} flags={flags} boardId={currentBoardId} />
												)}
												{error && <div className="text-red-500">{error}</div>}
												<button className="text-gray-500 hover:text-gray-700">
													<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path fillRule="evenodd" clipRule="evenodd" d="M10.0002 0.75C15.1082 0.75 19.2502 4.891 19.2502 10C19.2502 15.108 15.1082 19.25 10.0002 19.25C4.89124 19.25 0.750244 15.108 0.750244 10C0.750244 4.892 4.89224 0.75 10.0002 0.75Z" stroke="#98A2B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
														<path d="M13.9395 10.0129H13.9485" stroke="#98A2B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
														<path d="M9.93042 10.0129H9.93942" stroke="#98A2B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
														<path d="M5.92139 10.0129H5.93039" stroke="#98A2B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												</button>
											</div>
										</div>
									</div>

									<div className="space-y-1 m-1">
										{board.tasks.map((task, index) => (
											<Draggable key={task.id} draggableId={`${task.id}`} index={index}>
												{(provided) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														className="bg-white p-4 shadow-md border border-gray-200 rounded-xl  hover:bg-blue-100 hover:text-blue-900 hover:font-bold hover:rounded-lg"
													>
														<div className="flex justify-between items-start text-orange-500  hover:bg-blue-500 hover:text-blue-100 hover:rounded-lg ">
															<button className=" " onClick={() => setSelectedTask(task)}>
																<h3 className="text-md font-semibold ">{task.name}</h3>
															</button>
															<div className="flex -space-x-2 overflow-hidden">
																<img src="/batu.jpeg" alt="Profile" className="w-8 h-8 rounded-full border-2 border-white" />
																<img src="/dilara.jpeg" alt="Profile" className="w-8 h-8 rounded-full border-2 border-white" />
																<span className="w-8 h-8 rounded-full border-2 border-white text-gray-500 text-sm bg-gray-200 flex items-center justify-center">+5</span>
															</div>
														</div>
														{task.description && <p className="text-sm text-gray-700 mt-2">{task.description}</p>}
														<div className="mt-2 text-xs text-gray-500 flex flex-col justify-between items-start">
															<div className="flex items-start my-3">
																<div className="me-2">
																	<svg width="16" height="16" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
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
																<span>{new Date(task.createdAt).toLocaleDateString()} - {new Date(task.updatedAt).toLocaleDateString()}</span>
															</div>
															<div className="flex items-start my-3">
																<div className="me-2">
																	<svg width="16" height="16" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<rect x="0.707107" y="5.5" width="6.07107" height="6.07107" transform="rotate(-45 0.707107 5.5)" stroke="#98A2B3" />
																		<rect x="0.707107" y="5.5" width="6.07107" height="6.07107" transform="rotate(-45 0.707107 5.5)" stroke="#98A2B3" />
																	</svg>
																</div>
																<span>Milestone Name</span>
																<div className="mx-3">
																	<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path fillRule="evenodd" clipRule="evenodd" d="M11.6191 8.05667L13.2878 4.90133C13.3698 4.746 13.3644 4.55933 13.2738 4.40933C13.1838 4.25933 13.0211 4.16733 12.8458 4.16733H8.45711V3.26C8.45711 2.984 8.23311 2.76 7.95711 2.76H3.65442V2.5C3.65442 2.224 3.43042 2 3.15442 2C2.87842 2 2.65442 2.224 2.65442 2.5V14.5C2.65442 14.776 2.87842 15 3.15442 15C3.43042 15 3.65442 14.776 3.65442 14.5V10.578L7.45844 10.484V11.498C7.45844 11.6327 7.51311 11.762 7.60911 11.856C7.70511 11.95 7.81044 11.998 7.97044 11.998L12.8578 11.8787C13.0318 11.8747 13.1904 11.78 13.2778 11.6293C13.3651 11.4793 13.3684 11.294 13.2858 11.1413L11.6191 8.05667Z" fill={getFlagColor(task.flagId)} />
																	</svg>
																</div>
															</div>
														</div>
													</div>
												)}
											</Draggable>

										))}
										{provided.placeholder}
										{board.tasks.length === 0 && (
											<div className="relative flex items-center justify-center h-96">
												<div className="group relative flex items-center justify-center h-96 w-full">
													<img src="/notask.PNG" alt="notask" className="w-60" />
													<button className="absolute hidden group-hover:block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
														onClick={() => handleNewTaskOpen(board.id)}>
														New Task
													</button>
												</div>
											</div>
										)}
									</div>
								</div>
							)}
						</Droppable>
					))}
				</div>
			</DragDropContext>
			{selectedTask && <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} />}
		</div>
	);
};

export default Cards;
