export default function TaskFilters({ activeFilter, onFilterChange }) {
  const baseButtonClasses =
    "flex-1 text-center  border-2  rounded-lg  px-4 pt-1 md:pt-2 md:pb-1 lg:p-0 text-2xl md:text-3xl transition-all duration-300 ease-in-out active:scale-95 capitalize";
  const inactiveButtonClasses =
    "bg-white border-black hover:bg-gray-200 lg:hover:bg-transparent lg:border-none lg:hover:text-blue-500";
  const activeButtonClasses =
    "bg-active-filter lg:bg-transparent text-white lg:text-blue-500 lg:underline lg:decoration-blue-500 lg:underline-offset-1 shadow border-transparent hover:bg-gray-800 lg:hover:bg-transparent";

  return (
    <div className='mt-6 lg:mt-0 flex items-end lg:items-center justify-between gap-4'>
      <button
        className={`${baseButtonClasses} ${
          activeFilter === "all" ? activeButtonClasses : inactiveButtonClasses
        }`}
        onClick={() => onFilterChange("all")}>
        all
      </button>
      <button
        className={`${baseButtonClasses} ${
          activeFilter === "active"
            ? activeButtonClasses
            : inactiveButtonClasses
        }`}
        onClick={() => onFilterChange("active")}>
        active
      </button>
      <button
        className={`${baseButtonClasses} ${
          activeFilter === "completed"
            ? activeButtonClasses
            : inactiveButtonClasses
        }`}
        onClick={() => onFilterChange("completed")}>
        completed
      </button>
    </div>
  );
}
