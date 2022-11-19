import React, { useEffect, useState } from "react";
import "./PrivacyPolicy.scss";
import { ApiGet } from "../../Helpers/Api/ApiData";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import useSWR from 'swr';



export default function PrivacyPolicy() {
  
  const [knowMoreDataOne, setKnowMoreDataOne] = useState({});
  const [knowMoreData, setKnowMoreData] = useState({});
  const { data, error } = useSWR('know/getKnow', ApiGet)
  const location = useLocation()

  useEffect(() => {
    if (knowMoreData?.length > 0) {
      knowMoreData?.forEach(x => {
        let name = x.name?.trim()?.toLowerCase().replace(/\s/g, "");
        let pname = location.pathname?.trim()?.toLowerCase().replace("/", "").replace(/\s/g, "");
        if (name === pname) setKnowMoreDataOne(x)
      });
    }
  }, [location, knowMoreData])

  useEffect(() => {
    setKnowMoreData(data?.data?.payload?.know);
    if (error){toast.error(error)}
  }, [data]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      // left: 0,
      // behavior: "smooth",
    });
  }, []);


  return (
    <div>
      <section className="privacy-policy-section-alignment">
        <div className="container">
          <div className="page-title">
            <h1>{knowMoreDataOne?.name}</h1>
            <p
              dangerouslySetInnerHTML={{
                __html: knowMoreDataOne?.description,
              }}
              className=""
            />
          </div>
        </div>
      </section>
    </div>
  );
}
