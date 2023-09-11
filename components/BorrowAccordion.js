/* eslint-disable react/forbid-prop-types */
import { Accordion, Button, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { deleteBorrowedRecord } from '../api/borrowedData';

export default function AccordionRow({ borrowedRecord, onUpdate, keyNumber }) {
  const { user } = useAuth();
  const returnRecord = () => {
    if (window.confirm(`Return ${borrowedRecord.record.name} to ${borrowedRecord.record.user.first_name}?`)) {
      deleteBorrowedRecord(borrowedRecord.record.id, user.uid).then(() => onUpdate());
    }
  };

  return (
    <Accordion.Item eventKey={keyNumber}>
      <Accordion.Header className="borrowedRecordContainer">
        <Image className="borrow-img" src={borrowedRecord.record.record_image_url} />
        <div className="borrow-head">{borrowedRecord.record.name}</div>
      </Accordion.Header>
      <Accordion.Body>
        <div className="borrowDateContainer">
          <p>
            {borrowedRecord.record.artist} <br />
          </p>
          <p className="borrowDate">{borrowedRecord.record.release_date}</p>
        </div>
        <div className="returnBtnContainer">
          <Button className="returnBtn" variant="dark" onClick={returnRecord}>Return</Button>
        </div>
      </Accordion.Body>
      {console.warn(borrowedRecord)}
    </Accordion.Item>
  );
}

AccordionRow.propTypes = {
  borrowedRecord: PropTypes.shape({
    user: PropTypes.object,
    record: PropTypes.object,
    id: PropTypes.number,
    album: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  keyNumber: PropTypes.number.isRequired,
};
