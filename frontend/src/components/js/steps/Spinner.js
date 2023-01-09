import React from 'react';

function Spinner() {
  return (
    <div>
      <img
        src="..\loading.gif"
        style={{ width: '100%', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </div>
  );
};

export default Spinner;