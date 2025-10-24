export default function Spinner({ size = "text-xl md:text-2xl" }) {
  return <i className={`fa-solid fa-spinner animate-spin ${size}`}></i>;
}
