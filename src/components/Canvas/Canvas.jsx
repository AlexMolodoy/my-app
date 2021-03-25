import React, { useRef, useEffect } from 'react'
import * as TYPES from 'prop-types';

Canvas.propTypes = {
  currentResultNITColor: TYPES.string,
  currentResultNIT: TYPES.number,
  currentResultNITNeed: TYPES.number,
  currentResultPredictionColor: TYPES.string,
  currentResultPrediction: TYPES.number,
  currentResultPredictionNeed: TYPES.number,
};

Canvas.defaultProps = {
  currentResultNITColor: 'black',
  currentResultNIT: 0,
  currentResultNITNeed: 0,
  currentResultPredictionColor: 'black',
  currentResultPrediction: 0,
  currentResultPredictionNeed: 0,
};

export default function Canvas (props) {
  const {
    currentResultNIT,
    currentResultNITNeed,
    currentResultPrediction,
    currentResultPredictionNeed,
    currentResultNITColor,
    currentResultPredictionColor,
  } = props;

  const currentResultNITProc = currentResultNIT * 100 / currentResultNITNeed;
  const currentResultPredictionProc = currentResultPrediction * 100 / currentResultPredictionNeed;

  const canvasRef = useRef(null)

  const draw = (ctx, currentResultProc, radius, width, color) => {

    const startAngle = Math.PI / 2;
    const finishAngleCurrentResult = startAngle + ( 3 * Math.PI / 2 ) / 100 * currentResultProc;
    const finishAngleNeedResult = 2 * Math.PI;
    const xCentr = 75;
    const yCentr = 75;

    ctx.lineWidth = width;
    ctx.strokeStyle = 'lightgrey';
    ctx.beginPath()
    ctx.arc(xCentr, yCentr, radius, startAngle, finishAngleNeedResult)
    ctx.stroke();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.beginPath()
    ctx.arc(xCentr, yCentr, radius, startAngle, finishAngleCurrentResult)
    ctx.stroke();
  }

  // const write = (ctx,text, x, y, fontWeight) => {
  //   ctx.font = fontWeight + 'px Roboto';
  //   ctx.fillText(text, x, y + 7.5);
  // }

  useEffect(() => {
    const canvas = canvasRef.current

    console.log(canvasRef.current.clientHeight);
    const context = canvas.getContext('2d')

    draw(context, currentResultNITProc, 50, 20, currentResultNITColor)
    draw(context, currentResultPredictionProc, 70, 4, currentResultPredictionColor)
    // write(context, Math.floor(currentResultNITProc) + '%', 85, 75, 20)
    // write(context, Math.floor(currentResultPredictionProc) + '%', 160, 65, 10)

    // write(context, 'НИТ', 110, 90, 10)
    // write(context, currentResultNIT + ' / ' + currentResultNITNeed, 110, 105, 15)
    // write(context, 'ПРОГНОЗ', 110, 120, 10)
    // write(context, currentResultPrediction + ' / ' + currentResultPredictionNeed, 110, 140, 15)
  })

  return (
    <div>
      <div className='roundPicture'>
        <canvas
          ref={canvasRef}
          current_result_nit={currentResultNIT}
          current_result_nit_need={currentResultNITNeed}
          current_result_prediction={currentResultPrediction}
          current_result_prediction_need={currentResultPredictionNeed}
          current_result_nit_color={currentResultNITColor}
          current_result_prediction_color={currentResultPredictionColor}
          height={150}
          width={150}
        />
      </div>
      <section className='NIT'>
        <span className='NIT-quant percent-text'>{Math.floor(currentResultNITProc)}</span>
        <span className='NIT-percent percent-text'>%</span>
      </section>
      <section className='prediction'>
        <span className='prediction-quant percent-text'>{Math.floor(currentResultPredictionProc)}</span>
        <span className='prediction-percent percent-ext'>%</span>
      </section>
      <article className='description'>
        <section className='description-NIT'>
          <span className='NIT-text'>НИТ</span>
          <section className=''>
            <span className='NIT-number'>{currentResultNIT}</span>
            <span className='NIT-number NIT-number--need'> / </span>
            <span className='NIT-number NIT-number--need'>{currentResultNITNeed}</span>
        </section>
        </section>
        <section className='description-prediction'>
          <span className='prediction-text'>ПРОГНОЗ</span>
          <section className=''>
            <span className='prediction-number'>{currentResultPrediction}</span>
            <span className='prediction-number prediction-number--need'> / </span>
            <span className='prediction-number prediction-number--need'>{currentResultPredictionNeed}</span>
          </section>
        </section>
      </article>
    </div>
  )
}