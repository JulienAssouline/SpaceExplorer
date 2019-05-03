import React, { useState, useEffect, useLayoutEffect, useRef} from "react"
import LandingPage from "./LandingPage"


function Background(props) {
  const canvas = useRef(null);

  useLayoutEffect(() => {
    const context = canvas.current.getContext("2d");


    var data = [];
    var len = 401
    for (var i = 0; i < len; i++) {
        data.push({
            x:  Math.random() * canvas.current.width,
            y: Math.random() * canvas.current.height,
            r: Math.floor(Math.random() * Math.floor(3))
        });
    }


    function drawCircles(data) {



      const body = document.querySelector("body")

      console.log(body.clientHeight)

      context.save();
      context.fillStyle = "black";
      context.fillRect(0, 0, document.body.clientWidth, document.body.clientHeight);

      console.log(data)


      let opacity = 0;

      const duration = 1000; // ms
      const step = 1000; // ms


      data.forEach(d => {

       opacity += (step / duration);

       context.globalAlpha = 1

        context.strokeStyle = "white"

        // context.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight)


        context.fillStyle = "white"
        context.beginPath();
        context.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        context.stroke();
        context.fill()
        context.restore();


      })
      // setTimeout(drawCircles, step)

    }



    drawCircles(data)

    // setInterval(function(){
    //   drawCircles(data);
    //   // console.log(incr++)
    // }, 1000);




  })

  return (
    <canvas ref={canvas} width={window.innerWidth} height={window.innerHeight} style = {{fill: "black"}}>
      <LandingPage />
    </canvas>
  )
}

export default Background