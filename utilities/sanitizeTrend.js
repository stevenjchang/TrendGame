module.exports = (rawTimeline) => {
  let parsedTimeline = {};
  // parse the rawTimeline if it comes in as 
  if (typeof rawTimeline === 'string') {
    parsedTimeline = JSON.parse(rawTimeline);
  } else {
    try {
      parsedTimeline = rawTimeline;
    } catch (error) {
      throw error;
    }
  }


  return parsedTimeline.default.timelineData.map((point) => {
    return {
      date: parseInt(point.time),
      formattedTime: point.formattedTime,
      formattedAxisTime: point.formattedAxisTime,
      popularity: point.value[0]
    };
  });
};
