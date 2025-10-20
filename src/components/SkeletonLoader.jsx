import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonTaskItem = () => {
  return (
    <div className='w-full flex justify-between gap-4 border-2 rounded-lg p-4 '>
      <div className='flex items-center gap-4 min-w-0'>
        <Skeleton circle={true} width={32} height={32} />
        <Skeleton width={200} />
      </div>

      <div className='flex items-center gap-4 lg:gap-6'>
        <Skeleton width={40} height={40} />
        <Skeleton width={40} height={40} />
      </div>
    </div>
  );
};

const SkeletonTaskList = () => {
  return (
    <div className='my-4 flex flex-col gap-6'>
      <SkeletonTaskItem />
      <SkeletonTaskItem />
      <SkeletonTaskItem />
      <SkeletonTaskItem />
      <SkeletonTaskItem />
    </div>
  );
};

export default SkeletonTaskList;
