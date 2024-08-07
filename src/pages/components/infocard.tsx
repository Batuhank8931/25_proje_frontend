import React, { useState, useEffect } from 'react';
import API_URLS from '../../config/apiConfig';
import apiClient from '../../utils/apiClient';

interface User {
	status: boolean;
	data: Data[];
}

interface Data {
	id: 107,
	fullName: string,
	email: string
}

const Infocard = () => {

	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const data = await apiClient(API_URLS.profile);
				setUsers(data.data);
				
			} catch (error) {
				setError('Failed to fetch boards');
			}
		};

		fetchUsers();

	}, []);

	return (
		<div className="flex bg-blue-50 h-2/6">
			<div className="py-4 flex flex-col justify-between bg-blue-900 w-16">
				<div>
					<div className="space-y-6 px-4 pb-0 ">
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
				<div className="flex flex-col items-center">
					<img src="/batu.jpeg" alt="Profile" className="w-10 h-10 rounded-full" />

				</div>
			</div>

			<div className="w-4/5 bg-white p-4 items-end justify-between hidden md:flex">
				<div>
					<h1 className="text-black text-sm">{users.fullName}</h1>
					<h1 className="text-gray-400 text-xs">{users.email}</h1>

				</div>
				<div className='p-4'>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M9.99996 18.3334C14.6023 18.3334 18.3333 14.6025 18.3333 10.0001C18.3333 5.39771 14.6023 1.66675 9.99996 1.66675C5.39759 1.66675 1.66663 5.39771 1.66663 10.0001C1.66663 14.6025 5.39759 18.3334 9.99996 18.3334Z" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
					</svg>

				</div>

			</div>
		</div>
	);
};

export default Infocard;
