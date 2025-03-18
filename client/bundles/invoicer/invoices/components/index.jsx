import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as style from './index.module.css';

const InvoicesIndex = (props) => {
  debugger
  const [name, setName] = useState(props.name);

  return (
    <div>
      <h3>Hello, {name}!</h3>
      <hr />
      <form>
        <label className={style.bright} htmlFor="name">
          Say hello to:
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </form>
    </div>
  );
};

InvoicesIndex.propTypes = {
  users: PropTypes.string.isRequired, // this is passed from the Rails view
};

export default InvoicesIndex;
