const inputContainerClass = (IsError: boolean) => ({
  "flex flex-col w-full px-5 gap-5 justify-center items-center": true,
  "gap-2": IsError
})

const inputClass = (IsError: boolean) => ({
  "w-full rounded-xl bg-gray-200 p-2 lg:p-5 text-lg": true, 
  "border border-red-600": IsError
})


export { inputContainerClass, inputClass }