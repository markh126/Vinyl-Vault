/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import AccordionRowWishlist from '../../components/WishlistAccordion';
import { getWishlistRecord } from '../../api/wishlistData';

export default function WishlistDisplay() {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();

  const getWishlist = () => {
    getWishlistRecord(user.uid)
      .then(setWishlist);
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <>
      <h3 style={{ fontFamily: 'Ysabeau Office' }}><em>Wishlist</em></h3>
      <Accordion>
        {wishlist.length > 0 ? (
          wishlist.map((wish) => (
            <AccordionRowWishlist className="wishlistItemDesc" key={wish.id} wishlistRecord={wish} keyNumber={wishlist.indexOf(wish)} onUpdate={getWishlist} />
          ))
        ) : ("You haven't added any records to your wishlist!")}
      </Accordion>
    </>
  );
}
