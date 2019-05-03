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
            r: Math.random() * (2 - 0),
        });
    }

    var random_array = [];
    var len_random = 30

    for (var i = 0; i < len_random; i++) {
        random_array.push(Math.floor(Math.random() * Math.floor(400)));
    }

    function reduceCircleRadius(d, velocity) {
      let radius = (d.r - velocity)
      let radius2 = (radius - radius)

      // console.log(radius - radius + radius2)
      radius = radius < 0 ? (0) : radius
      return radius
    }

    function increaseCircleRadis(d, velocity) {


      let radius = (d.r + velocity)
      radius = radius < 0 ? radius : 0
      return radius
    }

    function drawCircles(data, velocity) {

      context.save();
      context.fillStyle = "black";
      context.fillRect(0, 0, document.body.clientWidth, document.body.clientHeight);


      data.forEach((d,i) => {

       context.globalAlpha = 1

        context.strokeStyle = "white"

       if (random_array.includes(i)) {
              context.fillStyle = "white"
              context.beginPath();
              context.arc(d.x, d.y, reduceCircleRadius(d, velocity), 0, Math.PI * 2);
              context.stroke();
              context.fill()
              context.restore();
      } else {
        context.fillStyle = "white"
        context.beginPath();
        context.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        context.stroke();
        context.fill()
        context.restore();
      }

        // let radius = (d.r - velocity)

        // radius = radius < 0 ? 0 : radius




      })
      // setTimeout(drawCircles, step)

    }


    let velocity = 0.5

    drawCircles(data, velocity)


    setInterval(function(){
      drawCircles(data, velocity);
      if (velocity > 3) {
        velocity = -velocity
      }
      velocity += 0.5
      console.log(velocity)
    }, 200);




  })

  return (
    <canvas ref={canvas} width={window.innerWidth} height={window.innerHeight} style = {{fill: "black"}}>
      <LandingPage />
    </canvas>
  )
}

export default Background