import React from 'react';
import PropTypes from 'prop-types';

const MapMarker = (props) => (
  <svg
    height="18px"
    onClick={props.onClick}
    viewBox="0 0 64 80"
    version="1.1"
    width="18px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fill="none"
      fillRule="evenodd"
      stroke="none"
      strokeWidth="1"
    >
      <path
        d="M32.17195,80 C18.0161136,68.0609267 7.96721735,54.7275933 2.02526132,40 C-6.88767271,17.90861 15.5223936,0 32.17195,0 C48.8215063,0 70.1829921,17.90861 62.3186386,40 C57.0757362,54.7275933 47.02684,68.0609267 32.17195,80 Z M32,47 C40.836556,47 48,39.836556 48,31 C48,22.163444 40.836556,15 32,15 C23.163444,15 16,22.163444 16,31 C16,39.836556 23.163444,47 32,47 Z"
        fill="#0074D9"
      ></path>
    </g>
  </svg>
);

MapMarker.propTypes = {
  onClick: PropTypes.func
};

export default MapMarker;