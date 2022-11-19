import React, { useEffect,useState } from "react";
import "./OurPartners.scss";
import { ApiGet } from "../../../Helpers/Api/ApiData";
import { toast } from "react-toastify";
import "react-multi-carousel/lib/styles.css";

export default function OurPartners() {
  const [getDataAll, setData] = useState([]);
  const [whyDeveloperData, setWhyDeveloperData] = useState({});

  useEffect(() =>{
    getWhyDeveloperData();
  },[])

  const getWhyDeveloperData = async () =>{
   await ApiGet(`aboutus/getAllAboutus?page=1&limit=10&type=homedeveloper`)
   .then((res) =>{
      setWhyDeveloperData(res?.data?.payload?.aboutus[0])
   })
   .catch((err) =>{
     toast.error(err?.responsive?.data?.message)
   })
  }

  const getallData = async (e) => {
    await ApiGet(`partners/getPartners`)
      .then((res) => {
        setData(res?.data?.payload?.partners);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.partners);
      });
  };


  useEffect(() => {
    getallData()
  }, [])


  return (
    <div>
      <section className="out-team-section-alignment">
        <div className="container">
          <div className="text-grid">
            <div className="text-grid-items">
              <h1>Our Trusted Partners</h1>
            </div>
            <div className="text-grid-items">
            </div>
          </div>
          <div className="our-trusted-partners-alignment-cus">
            <div className="round-grid">
              {getDataAll?.length > 0 && getDataAll?.map((data) => {
                return (
                  <div className="round-grid-items">
                    <div className="round-design">
                      <img src={data?.photo} alt="PartnersImage" />
                    </div>
                  </div>
                )
              })}
              </div>
          </div>
        </div>
      </section>
      <section className="why-section-home-bottom-align">
        <div className="container">
          <div className="why-title">
            <h3>{whyDeveloperData?.title}</h3>
          </div>
          <div className="devloper-grid">
            <div className="devloper-grid-items">
              <img src={whyDeveloperData?.photo} alt="BannerImage" />
            </div>
            <div className="devloper-grid-items">
              <p
              dangerouslySetInnerHTML={{
                __html: whyDeveloperData?.description,
              }}
              className=""
            />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
