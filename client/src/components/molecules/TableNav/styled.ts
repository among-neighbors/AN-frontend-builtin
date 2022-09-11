const defaultStyleOfTableNavButton = {
  whiteSpace: 'nowrap',
  height: '48px',
  width: '130px',
  borderRadius: '0',
};

const clickedStyleOfTableNavButton = {
  ...defaultStyleOfTableNavButton,
  fontWeight: 700,
  outline: 'solid 1px #f6be9a',
  fontSize: '18px',
  color: '#ED843C',
  zIndex: 1,
};

const nonClickedStyleOfTableNavButton = {
  ...defaultStyleOfTableNavButton,
  outline: 'solid 1px #BDBDBD',
  fontSize: '18px',
  color: '#808080',
};

export { clickedStyleOfTableNavButton, nonClickedStyleOfTableNavButton };
