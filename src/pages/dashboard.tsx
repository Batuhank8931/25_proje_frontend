import '../app/globals.css'; // Ensure Tailwind CSS is imported
import Sidebar from './components/sidebar';
import Topbar from './components/topbar';
import Cards from './components/cards';
import Navbar from './components/navbar';
import Infocard from './components/infocard';

const Dashboard = () => {
  return (
    <div className='overflow-hidden bg-blue-50'>
      <Navbar />
      <div className="grid grid-cols-12 min-h-screen">
        <div className="col-span-2  md:col-span-3 ">
          <Sidebar />
          <Infocard />
        </div>
        <div className="col-span-10  md:col-span-9">
          <Topbar />
          <Cards />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
