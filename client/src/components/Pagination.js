import React from "react"

function Pagination(props) {

  return (
    <div className = "pagination-conatiner">
      <p onClick = {(e) => props.handleStartClick(e, props.maxmin.min)} className = "start"> {"<<"} </p>
      <p onClick = {(e) => props.handleBackClick(e, props.maxmin.min)} className = "back"> {"<"} </p>
      {
        props.pages.map((d,i) =>
          <div key = {i} onClick = { (e) => props.handleCurrentPageClick(e)} className = {props.currentPage === d ? "page-container active" : "page-container"}>
            {d}
          </div>
          )
      }
      <p onClick = {(e) => props.handleNextClick(e, props.maxmin.max)} className = "next"> {">"} </p>
      <p onClick = {(e) => props.handleEndClick(e, props.maxmin.max)} className = "end"> {">>"} </p>
    </div>
  )
}

export default Pagination