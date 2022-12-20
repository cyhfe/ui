import React, { useEffect, useState } from 'react';
import { useAsync } from './';

const request = (state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      !!state ? resolve('Submitted successfully 🙌') : reject('Oh no there was an error 😞');
    }, 1000);
  });
};

const Example = () => {
  const { isLoading, data, error, run } = useAsync();

  const [state, setState] = useState(true);

  useEffect(() => {
    run(request(state));
  }, [state, run]);

  const renderContent = () => {
    if (isLoading) {
      return <div>loading...</div>;
    }
    if (error) {
      return <div>{JSON.stringify(error)}</div>;
    }
    if (data) return <div>{JSON.stringify(data)}</div>;
  };
  return (
    <div>
      <div>
        <button onClick={() => setState(true)}>load success</button>
        <button onClick={() => setState(false)}>load fail</button>
      </div>
      {renderContent()}
    </div>
  );
};

export default Example;
