import React from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';

export const TimeAgo = ({ timestamp }) => {
  let timeAgo = '';
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);

    timeAgo = `${timePeriod} ago`
  }

  return (
    <div title={timeAgo}>
      &nbsp; <i>{timeAgo}</i>
    </div>
  )
}