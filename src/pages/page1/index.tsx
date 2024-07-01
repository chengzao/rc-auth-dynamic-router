import { fetchList } from "@/services/user";
import { useEffect, useState } from "react";

function Page1() {

  const [title, setTitle] = useState('')

  useEffect(() => {
    fetchList().then((res: any) => {
      console.log(res)
      setTitle(res.data.data)
    })
  }, [])


  return (
    <div>
      page1 - {title}
    </div>
  )
}

export default Page1;