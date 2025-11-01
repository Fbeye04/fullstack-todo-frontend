import TaskFilters from "../features/Tasks/TaskFilters";

export default function Footer({
  itemsLeft,
  onOpenConfirmModal,
  activeFilter,
  onFilterChange,
}) {
  return (
    <footer className='flex justify-between items-center gap-6 shadow-inner py-8 px-8 md:px-16 lg:px-8 lg:py-6'>
      <p className='text-2xl text-black dark:text-white'>
        {itemsLeft} items left
      </p>

      <div className='hidden lg:block'>
        <TaskFilters
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
        />
      </div>

      <button
        type='button'
        onClick={onOpenConfirmModal}
        className='bg-secondary-button text-white text-2xl py-2 px-3 rounded-lg border border-secondary-border hover:bg-white hover:text-secondary-button hover:border-secondary-border transition-all duration-300 ease-in-out shadow active:scale-95 active:shadow-sm'>
        Clear Done
      </button>
    </footer>
  );
}
