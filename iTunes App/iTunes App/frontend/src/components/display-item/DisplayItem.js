import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import './display-item.css'

const DisplayItem = ({ item, fetchFavourites, favourites }) => {
   const [addFavClicked, setAddFavClicked] = useState(false);
   const id = item.id;

   // API call to add new favourite
   const addItem = async () => {
      await fetch('/api/addToFavourites', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            id,
            favItem: item
         })
      });
      fetchFavourites();
   }

   // API call to remove selected favourite
   const removeItem = async () => {
      await fetch(`/api/removeFavourite/${id}`, {
         method: 'DELETE'
      });
      fetchFavourites();
   }

      // Function to handle add new favourite
   const handleAdd = (e) => {
      e.preventDefault();
      setAddFavClicked(true);
      addItem();
   }


      // Function to handle remove selected favourite
   const handleRemove = (e) => {
      e.preventDefault();
      setAddFavClicked(false);
      removeItem();
   }

   useEffect(() => {
      if (favourites && favourites !== undefined) {
         for (let i = 0; i < favourites.length; i++) {
            if (favourites[i].id === id) {
               setAddFavClicked(true);
            }
         }
      }
   }, [favourites, id])
   
   return (
      // Handle which screen to display dependant on whether we have data or not
      <div className='output-item mt-3'>
         <div className='img'>
            {item.artworkUrl100 ? (
               <img src={item.artworkUrl100} alt='media artwork' />
            ) : (
               <div className='img-text'>
                  No image
               </div>
            )}
         </div>
         <div className='item-info'>
            {!item.trackName ? (
               <div className='collection-name'>
                  <span>Name:</span> {item.collectionName}
               </div>
            ) : (
               <div className='track-name'>
                  <span>Name:</span> {item.trackName}
               </div>
            )}
            <div className='artist-name'>
               <span>Artist:</span> {item.artistName}
            </div>
            {item.kind ? (
               <div className='kind'>
                  <span>Type:</span> {item.kind}
               </div>
            ) : (
               <div className='wrapper-type'>
                  <span>Type:</span> {item.wrapperType}
               </div>
            )}
         </div>
         <div className='btns'>
            <div className='heart-btn'>
               {addFavClicked ? (
                  <button onClick={handleRemove}>
                     <FontAwesomeIcon icon={faSolidHeart} className='clicked' />
                  </button>
               ) : (
                  <button onClick={handleAdd}>
                     <FontAwesomeIcon icon={faSolidHeart} />
                  </button>
               )}
            </div>
         </div>
      </div>
   )
}

export default DisplayItem;