const BlogElement = () => {
  const twTopicClass =
    "bg-gray-100 rounded p-4 flex items-center rounded-2xl cursor-pointer hover:bg-gray-200";
  const twH3 = "text-xl font-bold mb-2";
  return (
    <div id="blog-elem" className=" border-b-2 border-gray-100 pb-6 pt-4">
      <div className="flex h-12 w-full items-center space-x-4">
        <div className="h-full w-12 rounded-full bg-red-100"></div>
        <div>
          <div className="flex items-center space-x-2">
            <div className=" font-bold">Name</div>
            <div>.</div>
            <div className="text-xs">Apr. 20 2022</div>
          </div>
          <div className=" text-gray-500">founder of undertext</div>
        </div>
      </div>
      <div className="min-h-48 mt-4 flex w-full">
        <div className=" w-4/6">
          <h3 className={twH3}>
            8 Tipps um ein guter Design Hack macht einen besseren Jan was
            schreiben
          </h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus
            doloremque quos natus necessitatibus ea? Atque reprehenderit
            voluptatum sunt corrupti error at aperiam voluptate labore eos
            assumenda. Quis illo ex dolor?
          </p>
        </div>
        <div className=" ml-28 h-36 w-2/6 bg-red-400">hey</div>
      </div>
      <div className="mt-4 flex w-full space-x-2">
        <div className={twTopicClass}>UX Design</div>
        <div className={twTopicClass}>Coding</div>
      </div>
    </div>
  );
};

export default BlogElement;
