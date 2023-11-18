const inputContainerClass = (IsError: boolean) => ({
  "flex flex-col w-full px-5 gap-5 justify-center items-center text-base lg:text-xl": true,
  "gap-2": IsError
})

const inputClass = (IsError: boolean) => ({
  "w-full border-b-2 border-black p-2 text-lg outline-none focus:border-mint focus:border-b-2": true, 
  "border-red-600": IsError
})


export { inputContainerClass, inputClass }