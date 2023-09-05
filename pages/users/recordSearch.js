import Search from '../../components/SpotifyAlbumSearch';
import { useAuth } from '../../utils/context/authContext';

const RecordSearch = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Add a New Record</h2>
      <Search user={user} />
    </div>
  );
};

export default RecordSearch;
