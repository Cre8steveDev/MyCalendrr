import ContainerWithMaxWidth from '@/components/common/ContainerWithMaxWidth';
import CreateandEditAppointment from '@/components/dashboard/CreateandEditAppointment';
import NavigationBar from '@/components/dashboard/NavigationBar';
import { useUser } from '@/hooks/useAppStore';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
/**
 * Dash Board Component
 * Here, the user can have settings for the dashboard
 * @returns
 */
const Dashboard = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  // Return user from Page if already authenticated
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (!user) {
      return navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  // Return Route layout and children element
  return (
    <ContainerWithMaxWidth
      className={`flex sm:flex-row flex-col gap-4 min-h-[calc(100dvh-100px)] `}
    >
      {/* Dashboard navigation  */}
      <NavigationBar setShowCreateModal={() => setShowCreateModal(true)} />

      {/* Render nested child routes */}
      <Outlet />

      {/* handle showing Create Appointment Modal  */}
      {showCreateModal && (
        <CreateandEditAppointment setModalVisibility={setShowCreateModal} />
      )}
    </ContainerWithMaxWidth>
  );
};

export default Dashboard;
