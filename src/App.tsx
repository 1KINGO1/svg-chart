import React from 'react';
import Chart from './components/Chart/Chart';

const chartData = [
  {
    // If title isn't defined => title = value
    value: 10,
  },
  {
    value: 100,
  },
  {
    value: 49,
  },
  {
    value: 123,
  },
  {
    value: 10,
  },
  {
    value: 150,
  },
  {
    value: 29,
  },
]

function App() {

  const clickHandler = (value: string | number, title: string | number) => {
    console.log(`${title} - ${value}`);
  }

  return (
    <div className="App">
      <Chart width={1000} height={500} data={chartData} onClick={clickHandler}/>
    </div>
  );
}

export default App;
