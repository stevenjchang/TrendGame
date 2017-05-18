module.exports = (rawTimeline) => {
  let parsedTimeline = {};

  try {
    parsedTimeline = rawTimeline;
  } catch (error) {
    throw error;
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
