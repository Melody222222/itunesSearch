import React, { useState } from 'react'
import Header from '../header/Header';
import Search from '../search/Search';
import DisplaySection from '../display-section/DisplaySection';
import './landing.css';

const Landing = ({ fetchFavourites, favourites }) => {
    const [searchTerm, setTerm] = useState('');// useState to save the search term
    const [mediaType, setMedia] = useState('all');// useState to save the media type
    const [output, setOutput] = useState({});// useState to save the search results
    // Function to fetch the search results
    const fetchOutput = async () => {
        // Make the API call by sending the search term and media type to the backend using key and value pairs
        const result = await fetch(`/api/search?searchTerm=${searchTerm}&mediaType=${mediaType}`);
        const data = await result.json();// Change the result into json format
        setOutput(data.response);// Save the fetched data in 'output' variable
    }

    // Function to handle the search submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // If there is no value within the term input...
        if (searchTerm === '') {// then alert the user to enter a search term before clicking Search...
            alert(`Please enter a term before clicking the search button`);
        } else {// else make the API call by running 'fetchOutput()'
            fetchOutput();
        }
    }

    // Function to handle the search term change
    const handleTermChange = (e) => {
        setTerm(e.target.value);// Get the value from the input and save it in 'searchTerm' variable
    }

    // Function to handle the media type change
    const handleMediaChange = (e) => {
        setMedia(e.target.value);// Get value from the input and save it in 'mediaType' variable
    }

    return (
        <div className="content-area">
            <Header></Header>
            <Search
                handleSubmit={handleSubmit}
                term={searchTerm}
                handleTermChange={handleTermChange}
                handleMediaChange={handleMediaChange}></Search>
            <DisplaySection
                output={output}
                fetchFavourites={fetchFavourites}
                favourites={favourites}></DisplaySection>
        </div>
    )
}

export default Landing;
