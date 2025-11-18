// ThumbtackIcon.jsx
// Usage: import ThumbtackIcon from './ThumbtackIcon';
// Then use like: { node: <ThumbtackIcon />, title: "Thumbtack", href: "..." }

export const ThumbtackIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="9" fill="#009FD9" />
    <path d="M7.5 7.5h9v1.5h-3v7.5l-1.5 1.5-1.5-1.5V9h-3V7.5z" fill="white" />
  </svg>
)

export default ThumbtackIcon
