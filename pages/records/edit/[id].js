import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleRecord } from '../../../api/recordData';
import RecordForm from '../../../components/RecordForm';

export default function EditProduct() {
  const [editRecord, setEditRecord] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleRecord(id).then(setEditRecord);
  }, [id]);

  return (
    <div>
      <h1>Edit Record</h1>
      <RecordForm obj={editRecord} />
    </div>
  );
}
