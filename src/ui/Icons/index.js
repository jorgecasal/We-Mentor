import React from "react";

export const Edit = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <svg viewBox="0 0 456 469" {...props}>
    <g fill="#000" fillRule="nonzero">
      <path d="M335 246c0-7 6-12 13-12s13 5 13 12v178c0 18-15 32-32 32H32c-18 0-32-14-32-32V32C0 14 14 0 32 0h242c9 0 17 3 23 10l25 25c5 5 5 13 0 18s-13 5-18 0l-25-26c-2-1-3-2-5-2H32c-4 0-7 3-7 7v392c0 4 3 7 7 7h297c3 0 6-3 6-7V246z" />
      <path d="M422 17l37 36c13 13 13 34 0 46L201 358c-2 2-5 3-8 3l-78 15c-9 1-17-6-15-15l15-80c0-2 1-4 3-6L376 17c13-13 34-13 46 0zm-27 82L177 316l15 15 217-218-14-14zM166 341l-31-31-7 38 38-7zm-21-57l14 14L377 81l-15-15-217 218zM380 48l47 47 14-14c3-2 3-7 0-10l-37-37c-2-2-7-2-10 0l-14 14z" />
    </g>
  </svg>
);

export const Close = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <svg viewBox="0 0 100 125" {...props}>
    <path d="M62.146 49.999L92.364 19.78a2.965 2.965 0 000-4.195l-7.95-7.95a2.967 2.967 0 00-4.195 0L50 37.854 19.781 7.635a2.968 2.968 0 00-4.196 0l-7.95 7.95a2.965 2.965 0 000 4.195l30.219 30.219-30.218 30.22a2.963 2.963 0 000 4.195l7.949 7.95a2.966 2.966 0 004.196 0L50 62.146l30.218 30.218a2.965 2.965 0 004.195 0l7.95-7.95a2.965 2.965 0 000-4.195l-30.217-30.22z" />
  </svg>
);

export const Dots = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <svg {...props} viewBox="0 0 24 24">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

export default Edit;
