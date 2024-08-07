import React from 'react';

interface Activity {
	name: string;
	activity: string;
	time: string;
}

const activities: Activity[] = [
	{
		name: "Lana Steiner",
		activity: "Invited Alisa Hester to the team",
		time: "2 mins ago"
	},
	{
		name: "Demi Wilkinson",
		activity: "Invited Alisa Hester to the team",
		time: "2 mins ago"
	},
	{
		name: "Candice Wu",
		activity: "Commented in Marketing site redesign",
		time: "3 mins ago"
	},
	{
		name: "Candice Wu",
		activity: "Was added to Marketing site redesign",
		time: "3 hours ago"
	},
	{
		name: "Natali Craig",
		activity: "Added 3 labels to the project Marketing site redesign",
		time: "6 hours ago"
	},
	{
		name: "Natali Craig",
		activity: "Invited Lana Steiner to the team",
		time: "6 hours ago"
	},
	{
		name: "Orlando Diggs",
		activity: "Created 7 tasks in Marketing site redesign",
		time: "11 hours ago"
	}
];

const Activity: React.FC = () => {
	return (
		<div className="max-w-md mx-auto font-sans bg-blue-50 text-xs md:text-l">
			<div className="flex justify-between items-center p-4 bg-white">
				<h2 className="text-blue-800 font-bold text-xl">Activity</h2>
				<div className="flex space-x-4">
					<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M16.5 16.5L13.5834 13.5833M15.6667 8.58333C15.6667 12.4954 12.4954 15.6667 8.58333 15.6667C4.67132 15.6667 1.5 12.4954 1.5 8.58333C1.5 4.67132 4.67132 1.5 8.58333 1.5C12.4954 1.5 15.6667 4.67132 15.6667 8.58333Z" stroke="#98A2B3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					<svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4 6H14M1.5 1H16.5M6.5 11H11.5" stroke="#98A2B3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</div>
			</div>
			{activities.map((activity, index) => (
				<div key={index} className="items-center mb-6 md:p-4 p-1 grid grid-cols-12">
					<div className="relative mr-1 col-span-3 flex justify-center">
						<img
							src={"/batu.jpeg"}
							alt={activity.name}
							className="rounded-full w-16 h-16 object-cover"
						/>
						<span className="absolute bottom-0 right-4 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
					</div>

					<div className='col-span-9'>
						<div className='flex flex-row'>
							<div className="text-blue-900 font-bold pr-3">{activity.name}</div>
							<div className="text-gray-500">{activity.time}</div>
						</div>
						<div className='text-black'>{activity.activity}</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Activity;
