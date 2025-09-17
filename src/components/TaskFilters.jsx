export default function TaskFilters({ activeFilter, onFilterChange }) {
  const baseButtonClasses =
    "flex-1 text-center  border-2  rounded-lg  px-4 pt-1 md:pt-2 md:pb-1 text-2xl md:text-3xl transition-all duration-300 ease-in-out active:scale-95";
  const inactiveButtonClasses = "bg-white border-black hover:bg-gray-200";
  const activeButtonClasses =
    "bg-active-filter text-white shadow border-transparent hover:bg-gray-800";

  return (
    <div className='mt-6 flex align-end justify-between gap-2'>
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
