import React, { useEffect } from "react";
import "./HowItWorks.scss";
import RightSideIcon from "../../../Assets/Images/right-side-arrow.png";
import { ApiGet } from "../../../Helpers/Api/ApiData";
import { toast } from "react-toastify";

export default function HowItWorks() {
  const [getDataAll, setData] = React.useState([]);

  const getallData = async (e) => {
    await ApiGet('howitwork/getAllHowitwork')
      .then((res) => {
        const data = res?.data?.payload?.howitwork && res?.data?.payload?.howitwork.filter((data) => { return data.isActive === true })
        setData(data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.howitwork);
      });
  };

  useEffect(() => {
    getallData()
  }, [])

  return (
    <div>
      <div className="how-it-works-section-alignment">
        <div className="container">
          <div className="page-title">
            <h1>How it Works?</h1>
          </div>
          <div className={getDataAll.length === 3 ? "grid" : getDataAll.length === 2 ? "grid grid-boxtwo" : "grid grid-boxOne"}>
            {getDataAll && getDataAll.map((data, index) => {
              if (index === getDataAll.length - 1) {
                return (<div className="grid-items">
                  <div className="icon-design-home">
                    <div className="hero-section-icon">
                      <img src={data.photo} alt="HomeIcon" />
                    </div>
                  </div>
                  <div>
                    <h1>{data.title}</h1>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: data?.description,
                      }}
                      className=""
                    />
                  </div>
                </div>)
              }

              return (
                <div className="grid-items">
                  <div className="icon-design-home">
                    <div className="hero-section-icon">
                      <img src={data.photo} alt="HomeIcon" />
                    </div>
                  </div>
                  <div>
                    <h1>{data.title}</h1>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: data?.description,
                      }}
                      className=""
                    />
                  </div>
                  <div className="right-side-icon-center-align">
                    <img src={RightSideIcon} alt="RightSideIcon" />
                  </div>
                </div>)
            })

            }
          </div>
        </div>
      </div>
    </div>
  );
}
