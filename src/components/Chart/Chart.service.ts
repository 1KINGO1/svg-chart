interface ChartData {
  title?: string | number,
  value: string | number
}

interface ChartConstructor{
  width: number,
  height: number,
  data: ChartData[],
  settings?: {
    paddingX?: string | number,
    paddingY?: string | number
  }
}

class Chart {

  private readonly width: number;
  private readonly height: number;
  private readonly data: ChartData[];

  private readonly paddingX: number;
  private readonly paddingY: number;

  private readonly valueCoefficient: number;
  private readonly forOneLineX: number;

  constructor({width, height, data, settings}: ChartConstructor) {
    this.width = width;
    this.height = height;
    this.data = data;
    this.paddingX = settings?.paddingX ? +settings.paddingX : 20;
    this.paddingY = settings?.paddingY ? +settings.paddingY : 20;

    // Get max data value
    const dataMax = Math.max.apply(null, this.data.map(field => +field.value));

    // To save proportions we'll multiply all data values with valueCoefficient
    this.valueCoefficient = (+this.height - this.paddingY * 2) / dataMax;

    // Pixels on X axis for one line
    this.forOneLineX = (this.width - this.paddingX * 2) / (this.data.length);

  }

  getLines(): { x1: number, y1: number, x2: number, y2: number }[] {
    const lines: { x1: number, y1: number, x2: number, y2: number }[] = [];

    let lastLineX = this.paddingX;
    let lastLineY = +this.height - this.paddingY;

    this.data.forEach((field,  index) => {
      let yValue = this.height - (+field.value * this.valueCoefficient) - this.paddingY;
      lines.push({x1: lastLineX, y1: lastLineY, x2: lastLineX + this.forOneLineX, y2: yValue});
      lastLineX += this.forOneLineX
      lastLineY = yValue;
    });

    return lines;
  }

  getCircles(): { x: number, y: number, title: string | number, value: number | string }[] {
    let circles: { x: number, y: number, title: string | number, value: number | string }[] = new Array(this.data.length).fill(null);

    circles = circles.map((circle, index) => (
      {
        x: this.forOneLineX * (index + 1) + this.paddingX,
        y: this.height - +this.data[index].value * this.valueCoefficient - this.paddingY,
        title: this.data[index]?.title || this.data[index].value,
        value: this.data[index].value
      }
    ))

    return circles;
  }

  getVerticalAxes(): { x: number }[] {
    return new Array(Math.ceil((this.width - 2 * this.paddingX) / this.forOneLineX + 1))
      .fill(null)
      .map((axis, index) => ({x: this.paddingX + this.forOneLineX  * index}));
  }
}

export default Chart;