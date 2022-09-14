import './display-section.css';
import DisplayItem from '../display-item/DisplayItem'
const DisplaySection = ({ output, fetchFavourites, favourites }) => {
    return(
        <div className='display-container'>
         {/* If the results does not equal undefined */}
         {(output?.results !== undefined) ? (
            <>
               {/* ...then determine if there are items to display or if there were no results to display */}
               {/* If the number of results does not equal 0... */}
               {(output.resultCount !== 0) ? (
                  <>
                  {/* ...then list the output items... */}
                  <div className='output-items align-center'>
                     {/* Map through the output and display each item */}
                     {output && output?.results.map((item) => (
                        // Component representing each item
                        <DisplayItem
                           item={item}
                           key = {
                              // If there is a 'trackId' then use 'trackId' as the key...
                              item.trackId ? item.trackId : (// ...else...
                                 // ...if there is an 'artistId' and a 'collectionId'...
                                 item.artistId && item.collectionId ? (// ...then...
                                    // ...add 'artistId' and 'collectionId' and use that as the key...
                                    Number(item.artistId) + Number(item.collectionId)
                                 ) : (// ...else...
                                    // ...if there is just an 'artistId' then use 'artistId' as the key, else use the 'collectionId' as the key
                                    item.artistId ? item.artistId : item.collectionId
                                 )
                              )
                           }
                           fetchFavourites={fetchFavourites}
                           favourites={favourites}
                        />
                     ))}
                  </div>
                  </>
               ) : (
                  <>
                  {/* ...else show error text */}
                  <div className='error-text align-center'>
                     Sorry, no results were found for your search.
                  </div>
                  </>
               )}
            </>
         ) : (
            <>
            {/* ...else show welcome text */}
            <div className='welcome-text align-center'>
               Please enter a search term above and click 'Search'.
            </div>
            </>
         )}
      </div>
   )
}

export default DisplaySection;