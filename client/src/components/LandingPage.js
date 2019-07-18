import React, {useState} from "react"
import { useQuery } from 'react-apollo-hooks';
// import ACTIONS from "../module/actions"
// import { connect } from "react-redux"
import {GET_ALL_LAUNCHES} from "../gql/queries"
import NavBar from "./NavBar"
import Pagination from "./Pagination"


  // const mapStateToProps = state => ({
  //   userEmail: state.userEmail,
  //   username: state.username
  // })

  // const mapDispatchToProps = dispatch => ({
  //   textInputChange: data => dispatch(ACTIONS.textInputChange(data))
  // })

function LandingPage(props) {

  const {data, error, loading} = useQuery(GET_ALL_LAUNCHES)

  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 9

  if (loading) {
      return <div>Loading...</div>;
    };
    if (error) {
      return <div>Error! {error.message}</div>;
    };

    data.getAllLaunches.sort((a, b) => b.launch_year - a.launch_year);

    console.log(data)


    const indexOfLastCards = currentPage * cardsPerPage
    const indexOfFirstCards = indexOfLastCards - cardsPerPage

    const paginatedData = data.getAllLaunches.filter((d,i) => {
      return i <= indexOfLastCards && indexOfFirstCards < i
    })

    const number_of_pages = [];

     for (let i = 1; i <= Math.ceil(data.getAllLaunches.length / cardsPerPage); i++) {
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
    <div className = "landing-page">
    <NavBar data = {props}  />
    <div id = "height-container">
    <h1 className = "header"> Available Trips </h1>
      <div id = "landing-page-container" className = "landing-page-container">
         {
          paginatedData.map((d,i) =>
               <div onClick = {() => {
                 props.history.push("/launch-details"+d.flight_number)
               }}
               key = {i}
               className = "all-launches"
               >
               <img className ="image" src={d.mission_patch_small} alt = "logo" width="10%" height="10%"/>
                   <h2 className = "mission_name"> {d.mission_name} </h2>
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
      </div>
  )
}

// export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
export default LandingPage