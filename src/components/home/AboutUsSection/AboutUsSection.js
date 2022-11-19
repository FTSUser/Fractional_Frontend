import React, { useEffect,useState } from "react";
import { ApiGet } from "../../../Helpers/Api/ApiData";
import { toast } from "react-toastify";
import "./AboutUsSection.scss";
export default function AboutUsSection() {

  const [dontJustWishData, setDontJustWishData] = useState({});

  useEffect(() =>{
    getDontJustWishData()
  },[])
  

  const getDontJustWishData = async () =>{
    await ApiGet(`aboutus/getAllAboutus?page=1&limit=10&type=homepage`)
    .then((res) =>{
       setDontJustWishData(res?.data?.payload?.aboutus[0])
    })
    .catch((err) =>{
      toast.error(err?.responsive?.data?.message)
    })
   }
  return (
    <div>
      <div className="about-section-alignment">
        <div className="container">
          <div className="grid">
            <div className="grid-items">
              <h1>{dontJustWishData?.title}</h1>
            </div>
            <div className="grid-items">
              <p
              dangerouslySetInnerHTML={{
                __html: dontJustWishData?.description,
              }}
              className=""
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
