import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import FontAwesome from 'react-fontawesome'
import {
    StyledSearchBar, 
    StyledSearchBarContent
} from '../styles/StyledSearchBar'

const SearchBar = ({ callback }) =>{
    const [state, setState] = useState('')
    const timeOut = useRef(null);

    const doSearch = event => {
        //console.log(event.target.value);
        const {value} = event.target;
       

    //If you want a value that you want to mutate and keep between renders

    //Lets make sure that no instant value is rendered - we will wait half a second
        clearTimeout(timeOut.current)
        setState(value);
        timeOut.current = setTimeout(() =>{
            callback(value)
        }, 500);
    }
    //Controlled component - state value and the input value always be in synch
    return (
    <StyledSearchBar>
        <StyledSearchBarContent>
            <FontAwesome className="fa-search" name="search" size="2x"/>
            <input 
            type="text"
            placeholder="Search Movie"
            onChange={doSearch}
            value={state}/>
        </StyledSearchBarContent>
    </StyledSearchBar>
    )

}
// Always Check the Types of your props
SearchBar.propTypes ={
    callback: PropTypes.func
}
export default SearchBar