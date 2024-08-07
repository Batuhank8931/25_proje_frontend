import React, { useState, FormEvent } from 'react';
import apiClient from '../../utils/apiClient';
import API_URLS from '../../config/apiConfig';

interface EditTaskProps {
	task: {
		id: number;
		name: string;
		description: string | null;
		code: number;
		boardId: number;
		flagId: number;
	};
	onClose: () => void;
	flags: { id: number; name: string; color: string; priority: number }[];
}

const EditTask: React.FC<EditTaskProps> = ({ task, onClose, flags }) => {
	const [taskData, setTaskData] = useState({
		name: task.name,
		description: task.description,
		boardId: task.boardId, 
		flagId: task.flagId,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setTaskData(prevData => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const isConfirmed = window.confirm("Are you sure you want to update this task?");
		if (!isConfirmed) {
			return; 
		}

		console.log('Submitting task data:', taskData);
		console.log('Task ID:', task.code);

		try {
			const response = await apiClient(API_URLS.updateTask(task.code.toString()), 'PUT', taskData);
			console.log('Response from server:', response);
			onClose();
		} catch (error) {
			console.error('Error updating task:', error);
		}
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="bg-black bg-opacity-50 absolute inset-0"></div>
			<div className="bg-white rounded-lg shadow-lg p-6 relative w-96">
				<button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
					&times;
				</button>
				<h2 className="text-xl font-bold mb-4 text-gray-500">Edit Task</h2>
				<form onSubmit={handleSubmit}>
					<label className="block mb-2 text-gray-500">Task Name</label>
					<input
						type="text"
						name="name"
						value={taskData.name}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded mb-4 text-gray-500"
					/>

					<label className="block mb-2 text-gray-500">Description</label>
					<textarea
						name="description"
						value={taskData.description || ''}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded mb-4 text-gray-500"
					/>

					<label className="block mb-2 text-gray-500">Priority</label>
					<select
						name="flagId"
						value={taskData.flagId}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded mb-4 text-gray-500"
					>
						{flags.map(flag => (
							<option key={flag.id} value={flag.id}>
								{flag.name}
							</option>
						))}
					</select>

					<button
						type="submit"
						className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
					>
						Save Changes
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditTask;

