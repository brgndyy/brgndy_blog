import { profileContainer } from './profile.css';
import ProfileImage from './ProfileImage';
import ProfileInfo from './ProfileInfo';

export default function Profile() {
  return (
    <div className={profileContainer}>
      <ProfileImage />
      <ProfileInfo />
    </div>
  );
}
