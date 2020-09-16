import React from 'react';

const Error = (props) => {
  console.log('e', props);
  if (props.error === 'No Matches')
    return <div>Sorry, that didn't match anything.</div>;
  return (
    <div className="error">
      There was a problem fetching the data: <br />
      <pre>{props.error}</pre>
    </div>
  );
};

export default Error;
