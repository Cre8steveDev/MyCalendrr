/**
 * User Customization Settings
 * @returns JSX Element outlet
 */

import { useEffect, useState } from 'react';
import Separator from '../common/Separator';
import fetchProfileData from '@/lib/fetchProfileData';
import { useToken } from '@/hooks/useAppStore';
import LoadingComponent from '../common/LoadingComponent';
import SettingsForm from './SettingsForm';
import { ProfileUser } from '@/types';

const Settings = () => {
  const token = useToken();
  const [profile, setProfile] = useState<ProfileUser>();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  // Fetch Profile Data For Editing
  useEffect(() => {
    fetchProfileData(token!).then((data) => {
      setProfile(data as ProfileUser);
      setLoading(false);
      console.log('PROFILE DATA RECEIVED: ', data);
    });
  }, [token, reload]);

  if (loading) return <LoadingComponent message="Loading Profile Data..." />;

  if (!profile)
    return (
      <div>
        <h1>Unable to Load Profile Data.</h1>
      </div>
    );

  // Return JSX
  return (
    <section className="p-8 font-poppins">
      {/* Page Header */}
      <div className="">
        <h2 className="text-4xl font-semibold text-slate-600">
          Profile Settings
        </h2>
        <p className="text-slate-400">You can update your account details.</p>
      </div>

      <Separator />
      <SettingsForm user={profile} setReload={setReload} />
    </section>
  );
};

export default Settings;
