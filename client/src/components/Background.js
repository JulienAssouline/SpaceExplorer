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
            r: (Math.random()+Math.random()+Math.random()+Math.random()) / 4,
            color: 'hsl('+Math.random()*80+',100%,'+(70+Math.random()*70)+'%)',
        });
    }


// let random_array = [];
//       var len_random = 30
//       for (var i = 0; i < len_random; i++) {
//           random_array.push(Math.floor(Math.random() * Math.floor(400)));
//       }
//       console.log(random_array)

        let random_array = Array.from({length: 30}, () => Math.floor(Math.random() * Math.floor(400)));



    function circleRadius(d, velocity) {

      let radius = (0 - velocity)

      let trueRadius;

      if (radius < 0) {
      trueRadius = (velocity - radius)
      } else if (Math.min(trueRadius, 1) === 1) {
       trueRadius = radius - velocity
      }
      else {
        trueRadius = radius
      }
      return Math.min(trueRadius, 1)
    }

    function drawCircles(data, velocity) {

      context.save();
      context.fillStyle = "black";
      // #29313b
      context.fillRect(0, 0, document.body.clientWidth, document.body.clientHeight);

      console.log(data)


         //    let random_array = [];
         //  var len_random = 30
         // setTimeout(function(){

         //  for (var i = 0; i < len_random; i++) {
         //      random_array.push(Math.floor(Math.random() * Math.floor(400)));
         //  }

         // }, 3000);

        //  setTimeout(function(){

        // random_array = Array.from({length: 30}, () => Math.floor(Math.random() * Math.floor(400)));
        // console.log(random_array)
        //  }, 7000);



      data.forEach((d,i) => {

       context.globalAlpha = 1

        context.strokeStyle = d.color

        context.shadowBlur = 3;
        context.shadowColor = d.color;

        // if(d.x < canvas.width) {
        //   d.x += 0.35;
        // } else {
        //  d.x = 0;
        // }





       if (random_array.includes(i)) {
              context.fillStyle = d.color
              context.beginPath();
              context.arc(d.x, d.y, circleRadius(d, velocity), 0, Math.PI * 2);
              context.stroke();
              context.fill()
              context.restore();
      } else {
        context.fillStyle = d.color
        context.beginPath();
        context.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        context.stroke();
        context.fill()
        context.restore();
      }


      })

    }


    let velocity = 0.3

    drawCircles(data, velocity)


    setInterval(function(){
      drawCircles(data, velocity);
      if (velocity > 4) {
        velocity = -velocity
      }
      velocity += 0.3
    }, 100);




  })

  return (
    <canvas ref={canvas} width={window.innerWidth} height={1000} style = {{fill: "black"}}>
      <LandingPage />
    </canvas>
  )
}

export default Background