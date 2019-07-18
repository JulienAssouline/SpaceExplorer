import React, { useEffect, useRef} from "react"

function Background2(props) {

    const canvas = useRef(null);

    useEffect(() => {
      const context = canvas.current.getContext("2d");

      context.width = window.innerWidth
      context.height = 800


      var data = [];
      var len = 401
      for (var i = 0; i < len; i++) {
          data.push({
              x:  Math.random() * canvas.current.width,
              y: Math.random() * canvas.current.height,
              r: Math.random() * Math.random() * (2 - 0),
              color: 'hsl('+Math.random()*80+',100%,'+(70+Math.random()*70)+'%)',
          });
      }

      // function circleRadius(d, velocity) {

      //   let radius = (0 - velocity)

      //   let trueRadius;

      //   if (radius < 0) {
      //   trueRadius = (velocity - radius)
      //   } else if (Math.min(trueRadius, 1) === 1) {
      //    trueRadius = radius - velocity
      //   }
      //   else {
      //     trueRadius = radius
      //   }
      //   return Math.min(trueRadius, 1)
      // }

      function drawCircles(data, velocity) {

              context.save();
              context.fillStyle = "#2e4b4f";
              // #29313b
              context.fillRect(0, 0, document.body.clientWidth, 800);

              data.forEach((d,i) => {

               context.globalAlpha = 1

                context.strokeStyle = d.color

                context.shadowBlur = 3;
                context.shadowColor = d.color;

                      context.fillStyle = d.color
                      context.beginPath();
                      context.arc(d.x, d.y, d.r, 0, Math.PI * 2);
                      context.stroke();
                      context.fill()
                      context.restore();



                if (d.x > document.body.clientWidth) {
                  d.x = 0
                }

                d.x += 1.5

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


  }, [])

  return (
    <canvas ref={canvas} width={window.innerWidth} height={800} style = {{fill: "black"}}>
    </canvas>
  )


}

export default Background2