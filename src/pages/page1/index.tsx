import { fetchList } from "@/service";
import { useEffect } from "react";

function Page1() {
  useEffect(() => {
    console.log('page1')
    fetchList().then((res: any) => {
      console.log(res)
    })
  }, [])


  return (
    <div>
      page1
    </div>
  )
}

export default Page1;