function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateContinuousXAxisData(count) {
  return Array.from({ length: count }, (_, i) => `类别${i + 1}`);
}

function generateRandomData(chartType) {
  const data = [];
  const xData = generateContinuousXAxisData(getRandomInt(5, 15)); // 生成5到15个连续的X轴数据点

  xData.forEach(xValue => {
    if (chartType === 'pie') {
      data.push({
        value: getRandomInt(10, 100),
        legend: xValue
      });
    } else {
      for (let j = 0; j < getRandomInt(1, 3); j++) { // 每个X轴数据点有1到3个组
        data.push({
          x: xValue,
          y: getRandomInt(10, 100),
          groupBy: `组${j + 1}`
        });
      }
    }
  });

  return data;
}

function mergeTrendChartData(data) {
  const mergedData = {};

  data.forEach(item => {
    const key = `${item.x}-${item.groupBy}`;
    if (!mergedData[key]) {
      mergedData[key] = { ...item };
    } else {
      mergedData[key].y += item.y;
    }
  });

  return Object.values(mergedData);
}

export function mockChartProps() {
  const chartTypes = ['line', 'column', 'area', 'pie'];
  const selectedType = chartTypes[getRandomInt(0, chartTypes.length - 1)];

  let data = generateRandomData(selectedType);

  if (selectedType !== 'pie') {
    data = mergeTrendChartData(data);
  }

  if (selectedType === 'pie') {
    return {
      type: selectedType,
      data,
      value: 'value',
      legend: 'legend'
    };
  } else {
    return {
      type: selectedType,
      data,
      x: 'x',
      y: 'y',
      groupBy: 'groupBy'
    };
  }
}
