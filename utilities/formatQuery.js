module.exports = (trend, startTime, endTime) => {
  let param = {
    q: trend
  };

  if (startTime) {
    param.start = startTime._d;
  }

  if (endTime) {
    param.end = endTime._d;
  }

  return param;
}