import './Button.css';
import { memo, useState } from 'react';

function Button() {
  const [text, setText] = useState('Save');
  const clicked = () => {
    setText((t) => t + '!');
    console.log(text);
  };
  return (
    <button onClick={clicked} className="button accent">
      {text}
    </button>
  );
}

export default memo(Button);
