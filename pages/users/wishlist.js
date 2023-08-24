/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';
import { getWishlistRecord } from '../../api/wishlistData';
import WishlistCard from '../../components/WishlistCard';

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
      <Head>
        <title>My Wishlist</title>
      </Head>
      <div id="userWishlistPage" className="userWishlist-page">
        <div className="userWishlist-desc-text">
          <h3><em>My Wishlist</em></h3>
          <div className="text-center my-4">
            <div id="wishlistCards" className="d-flex flex-wrap">
              {wishlist.map((wishRecord) => (
                <WishlistCard key={wishRecord.id} recordObj={wishRecord.record} onUpdate={getWishlist} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
