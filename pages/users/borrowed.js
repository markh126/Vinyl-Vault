/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getBorrowedRecord } from '../../api/borrowedData';
import AccordionRow from '../../components/BorrowAccordion';

export default function BorrowedDisplay() {
  const [borrowed, setBorrowed] = useState([]);
  const { user } = useAuth();

  const getBorrowed = () => {
    getBorrowedRecord(user.uid)
      .then(setBorrowed);
  };

  useEffect(() => {
    getBorrowed();
  }, []);

  return (
    <>
      <h3><em>Borrowed Records </em></h3>
      <Accordion>
        {borrowed.length > 0 ? (
          borrowed.map((borrow) => (
            <AccordionRow className="borrowedItemDesc" key={borrow.id} borrowedRecord={borrow} keyNumber={borrowed.indexOf(borrow)} onUpdate={getBorrowed} />
          ))
        ) : ("You haven't borrowed any records!")}
      </Accordion>
    </>
  );
}
