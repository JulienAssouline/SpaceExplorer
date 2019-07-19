import React, {useState} from "react"
import NavBar from "./NavBar"
import { useQuery } from 'react-apollo-hooks';
import {GET_MY_BOOKINGS} from "../gql/queries"
import Pagination from "./Pagination"

function Home(props) {

  const {data, error, loading} = useQuery(GET_MY_BOOKINGS)


  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 2

  if (loading) {
      return <div>Loading...</div>;
    };
    if (error) {
      return <div>Error! {error.message}</div>;
    };



    data.getUserBookings.sort((a, b) => b.launch_year - a.launch_year);

    console.log(data)


    const indexOfLastCards = currentPage * cardsPerPage
    const indexOfFirstCards = indexOfLastCards - cardsPerPage

    const paginatedData = data.getUserBookings.filter((d,i) => {
      console.log("last card", indexOfLastCards)
      console.log("first card", indexOfFirstCards)
      return i < indexOfLastCards && indexOfFirstCards <= i
    })

    console.log(paginatedData)

    const number_of_pages = [];

     for (let i = 1; i <= Math.ceil(data.getUserBookings.length / cardsPerPage); i++) {
       number_of_pages.push(i);
     }

   const max_pages = Math.max.apply(null, number_of_pages)
   const min_pages = Math.min.apply(null, number_of_pages)

  function handleCurrentPageClick(e) {
    setCurrentPage(Number(e.target.innerHTML))
   }

  function handleNextClick(e, max) {
   if (currentPage !== max) {
     setCurrentPage(currentPage + 1)
   }
  }

  function handleBackClick(e, min) {
     if (currentPage !== min) {
       setCurrentPage(currentPage - 1)
     }
  }

  function handleEndClick(e, max) {
   setCurrentPage(max)
  }

  function handleStartClick(e, min) {
   setCurrentPage(min)
  }



  return (
    <div className = "get-started">
    <NavBar data = {props} />
    <div className = "user-bookings-page">
      {
        paginatedData.map((d,i) =>
          <div className = "home-form-details">
            <div className = "image-title-container">
              <h3 className = "details-headers"> {d.mission_name} </h3>
              <img className ="image-details" src={d.mission_patch_small} alt = "logo" width="10%" height="10%"/>
              <h3 className = "details-headers"> {d.launch_year} </h3>
            </div>
            <div className = "launch-details-container">
              <h2 className = "mission-headers"> {`${d.rocket_name} Rocket`} </h2>
              <p className = "rocket-type-text"> {`Rocket type: ${d.rocket_type}`} </p>
              <p className = "site-name-text"> {`Location: ${d.site_name}`} </p>
              <p className = "details-text"> {`Details: ${d.details}`} </p>
            </div>
          </div>
          )
      }
      </div>
      <Pagination
            maxmin = {{max: max_pages, min: min_pages}}
            handleBackClick = {handleBackClick}
            handleNextClick = {handleNextClick}
            currentPage = {currentPage}
            pages = {number_of_pages}
            handleCurrentPageClick = {handleCurrentPageClick}
            handleEndClick ={handleEndClick}
            handleStartClick = {handleStartClick}
           />
    </div>
  )
}

export default Home