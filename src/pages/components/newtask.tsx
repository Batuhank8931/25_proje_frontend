import React, { useState, FormEvent } from 'react';
import apiClient from '../../utils/apiClient';
import API_URLS from '../../config/apiConfig';

interface NewTaskProps {
	onClose: () => void;
	flags: { id: number; name: string; color: string; priority: number }[];
	boardId: number | null;
}

const NewTask: React.FC<NewTaskProps> = ({ onClose, flags, boardId }) => {
	const [taskData, setTaskData] = useState({
		name: '',
		description: '',
		boardId: boardId || 1,
		flagId: 3,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setTaskData({
			...taskData,
			[name]: value,
		});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const taskDataToSend = {
			...taskData,
			flagId: Number(taskData.flagId),
			boardId,
		};

		console.log("Submitting task data:", taskDataToSend);

		try {
			const response = await apiClient(API_URLS.tasks, 'POST', taskDataToSend);
			console.log("Response from server:", response);

			alert("Task created successfully!");

			onClose();
		} catch (error) {
			console.error('Error creating task:', error);
		}
	};



	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg shadow-lg p-6 relative md:h-[90%] md:w-[80%] h-[50%] w-full">
				<button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
					&times;
				</button>
				<div className="text-center">
					<h2 className="text-2xl font-bold mb-4 text-gray-500">New Task</h2>
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							name="name"
							placeholder="Task Name"
							value={taskData.name}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded mb-4 text-gray-500"
							required
						/>
						<textarea
							name="description"
							placeholder="Task Description"
							value={taskData.description}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded mb-4 text-gray-500"
							required
						></textarea>
						<select
							name="flagId"
							value={taskData.flagId}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded mb-4 text-gray-500"
							required
						>
							{flags.map((flag) => (
								<option key={flag.id} value={flag.id}>
									{flag.name}
								</option>
							))}
						</select>
						<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default NewTask;
