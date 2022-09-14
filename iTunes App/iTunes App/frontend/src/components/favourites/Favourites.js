import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft as faSolidChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
// Import components
import FavouriteItem from '../favourite-item/FavouriteItem';

// Import CSS
import './favourites.css'

const Favourites = ({ fetchFavourites, favourites }) => {
    return (
        <div className='content-area'>
            <div className='main-row'>
                <div className='back-btn'>
                    <Link to='/'>
                    <FontAwesomeIcon icon={faSolidChevronLeft} /> Back
                    </Link>
                </div>
                <div className='title'>
                    <h3>Favourites</h3>
                </div>
                <div className='placeholder'>
                </div>
            </div>
            <div className='favourites'>
                {/* If 'favourites' equals undefined... */}
                {(favourites === undefined) ? (// ...then display text saying that 'favourites' is empty...
                    <h3 className='empty'>
                        There are currently no favourites to display.
                    </h3>
                ) : (// ...else display a list of favourites
                    <div className='fav-items'>
                        {/* Map though 'favourites' and display  each item */}
                        {favourites && favourites.map((item) => (
                            // Component representing each item in 'favourites'
                            <FavouriteItem
                                item={item}
                                key={item.id}
                                fetchFavourites={fetchFavourites}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Favourites
