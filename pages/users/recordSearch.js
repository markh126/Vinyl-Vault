import Search from '../../components/SpotifyAlbumSearch';
import { useAuth } from '../../utils/context/authContext';

const RecordSearch = () => {
  const { user } = useAuth();
  return (
    <div>
      <Search user={user} />
    </div>
  );
};

export default RecordSearch;
