import React from 'react'
import { Button, Form, FormControl, FormGroup, FormSelect } from 'react-bootstrap'
import './search.css';

// Create a function for searching
const Search = ({
    handleSubmit,
    term,
    handleTermChange,
    handleMediaChange
}) => {
    // Create an array to hold dropdown values for searching
    const mediaTypes = [
        { dropdownItem: 'All media', mediaType: 'all' },
        { dropdownItem: 'Movie', mediaType: 'movie' },
        { dropdownItem: 'Podcast', mediaType: 'podcast' },
        { dropdownItem: 'Music', mediaType: 'music' },
        { dropdownItem: 'Music video', mediaType: 'musicVideo' },
        { dropdownItem: 'Audio book', mediaType: 'audiobook' },
        { dropdownItem: 'Short film', mediaType: 'shortFilm' },
        { dropdownItem: 'TV show', mediaType: 'tvShow' },
        { dropdownItem: 'Software', mediaType: 'software' },
        { dropdownItem: 'Ebook', mediaType: 'ebook' }
    ];
    return (
        <div className='container'>
            <div className='row mt-4 full-width row d-flex justify-content-center'>
                <div className='col-lg-10'>
                    {/* Function to handle form submission */}
                    <Form onSubmit={handleSubmit} className='row'>
                        <div className='col-lg-5'>
                            <FormGroup className='full-width'>
                                <FormControl
                                    type='text'
                                    className='search-bar'
                                    placeholder='Type to search!'
                                    name='term'
                                    value={term}
                                    onChange={handleTermChange}
                                />
                            </FormGroup>
                        </div>
                        <div className='col-lg-5'>
                            <FormGroup className='form-group filter'>
                                <FormSelect onChange={handleMediaChange}>
                                    {/* Display dropdown items dynamically */}
                                    {mediaTypes && mediaTypes.map((media) => (
                                        <option key={media.dropdownItem} value={media.mediaType}>
                                            {media.dropdownItem}
                                        </option>
                                    ))}
                                </FormSelect>
                            </FormGroup>
                        </div>
                        <div className='col-lg-2'>
                            <Button className='btn btn-success' type='submit'><i className='fa fa-search'></i> Search  </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Search;
