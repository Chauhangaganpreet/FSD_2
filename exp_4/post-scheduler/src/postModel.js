const postToEvent = (post) => ({
  id: post.id,
  title: post.title,
  start: post.scheduledDate,
  extendedProps: {
    platform: post.platform,
    status: post.status
  }
});

export default postToEvent;