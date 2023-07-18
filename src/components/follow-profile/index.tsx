const FollowProfile = () => {
  return (
    <div className="mb-2 mt-2 flex w-full">
      <div className="mr-2 h-16 w-16 rounded-full bg-slate-600"></div>
      <div>
        <div className="font-bold">Christian Lindner</div>
        <div className="text-gray-500">Finanzberater bei Jan Enterprise</div>
      </div>
      <div className=" flex w-1/4 items-center justify-end">
        <button className=" cursor-pointer items-center rounded-xl border-2 border-gray-200 p-2 pl-6 pr-6 hover:border-gray-300">
          Follow
        </button>
      </div>
    </div>
  );
};

export default FollowProfile;
