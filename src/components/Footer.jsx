export function Footer() {
  return (
    <> 
    {/* Make a Static Function*/}
      <div className=" bg-[#515b69]">

        <div className="flex flex-col justify-between py-[48px] px-[12px]">

          <div className="flex justify-center gap-[70px] flex-wrap">

            <div className="flex flex-col mb-[20px]">
              <div className="text-white text-[26px] font-bold">About Us</div>
              <div className="text-[#c5c5c5] text-[16px] mt-[20px] hover:text-[#f5f5f5] cursor-pointer">Who we are</div>
              <div className="text-[#c5c5c5] text-[16px] mt-[20px] hover:text-[#f5f5f5] cursor-pointer">Purpose</div>
              <div className="text-[#c5c5c5] text-[16px] mt-[20px] hover:text-[#f5f5f5] cursor-pointer">Commitment</div>
              <div className="text-[#c5c5c5] text-[16px] mt-[20px] hover:text-[#f5f5f5] cursor-pointer">FAQ</div>
            </div>

            <div className="flex flex-col mb-[20px]">
              <div className="text-white text-[26px] font-bold">Course</div>
              <div className="text-[#c5c5c5] text-[16px] mt-[20px] hover:text-[#f5f5f5] cursor-pointer">Physics</div>
              <div className="text-[#c5c5c5] text-[16px] mt-[20px] hover:text-[#f5f5f5] cursor-pointer">Biology</div>
              <div className="text-[#c5c5c5] text-[16px] mt-[20px] hover:text-[#f5f5f5] cursor-pointer">Chemistry</div>
              <div className="text-[#c5c5c5] text-[16px] mt-[20px] hover:text-[#f5f5f5] cursor-pointer">IT</div>
              <div className="text-[#c5c5c5] text-[16px] mt-[20px] hover:text-[#f5f5f5] cursor-pointer">Mathematics</div>
            </div>

            <div className="flex flex-col mb-[20px]">
              <div className="text-white text-[26px] font-bold">Social Media</div>
              <div className="text-[#c5c5c5] text-[16px] mt-[20px] hover:text-[#f5f5f5] cursor-pointer">Youtube</div>
              <div className="text-[#c5c5c5] text-[16px] mt-[20px] hover:text-[#f5f5f5] cursor-pointer">Twitter</div>
            </div>

          </div>

          <div className="mt-[50px] pt-[20px] border-t-[1px] border-t-[#ffffff1a]">
            <div className="text-center text-white text-[0.9rem]">© Copyright 2024-2025 FastMindJunction. All Rights Reserved.</div>
          </div>

        </div>

      </div>
    </>
  )
}