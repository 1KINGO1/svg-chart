import {FC, memo, useMemo} from 'react';
import styles from './Chart.module.scss';
import ChartService from './Chart.service';
import {v4 as uuidv4} from 'uuid';


interface ChartStyle {
  lineStrokeColor?: string,
  dotColor?: string,
  axisColor?: string,
  paddingX?: string | number,
  paddingY?: string | number
}

interface ChartData {
  title?: string | number,
  value: string | number
}

interface IChart {
  width: number | string,
  height: number | string,
  data: ChartData[],
  style?: ChartStyle,
  onClick?: (value: string | number, title: string | number) => void
}

const Chart: FC<IChart> = ({
                             width,
                             height,
                             data,
                             style,
                             onClick = () => {
                             }
                           }) => {

  const chart = useMemo(() => new ChartService(
    {
      width: +width,
      height: +height,
      data,
      settings: {paddingX: style?.paddingX, paddingY: style?.paddingY}
    }
  ), [width, height, data, style?.paddingX, style?.paddingY]);

  return (
    <div className={styles.wrapper}>
      <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width={width} height={height}>

        {chart.getLines().map((line) => (
          <line key={uuidv4()}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={style?.lineStrokeColor || '#b4241b'}
                strokeWidth='3'
          />
        ))}

        {chart.getVerticalAxes().map((axis) => (
          <line key={uuidv4()}
                x1={axis.x}
                y1={style?.paddingY || 20}
                x2={axis.x}
                y2={style?.paddingY ? +height - +style?.paddingY : +height - 20}
                stroke={style?.axisColor || '#00000030'}
                strokeWidth='1'
          />
        ))}

        {chart.getCircles().map((circle) => (
          <circle className={styles.circle}
                  key={uuidv4()}
                  onClick={() => onClick(circle.value, circle.title)}
                  cx={circle.x}
                  cy={circle.y}
                  r='6'
                  stroke='transparent'
                  strokeWidth='30'
          />
        ))}

      </svg>
    </div>
  )
};

export default memo(Chart);
