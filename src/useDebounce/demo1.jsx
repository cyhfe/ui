import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useDebounce, debounce } from '.';

async function sleep(delay) {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

function Example() {
  const [text, setText] = useState('');

  const debouncedTextChange = useDebounce((nextText) => {
    setText(nextText);
  }, 1000);

  const handleInputChange = (e) => {
    debouncedTextChange(e.target.value);
  };

  return (
    <div>
      <input type="text" onInput={(e) => handleInputChange(e)} />
      <div>input: {text}</div>
    </div>
  );
}

export default Example;
