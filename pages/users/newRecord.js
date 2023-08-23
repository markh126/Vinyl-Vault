import RecordForm from '../../components/RecordForm';
import { useAuth } from '../../utils/context/authContext';

const NewRecord = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Add a New Record</h2>
      <RecordForm user={user} />
    </div>
  );
};

export default NewRecord;
