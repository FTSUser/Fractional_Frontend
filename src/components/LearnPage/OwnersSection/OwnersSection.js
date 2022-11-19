import React, { useState, useEffect } from "react";
import { ApiGet } from "../../../Helpers/Api/ApiData";
import { ToastContainer, toast } from "react-toastify";
import "./OwnersSection.scss";

export default function OwnersSection() {
  const [textShow, setTextShow] = useState([]);
  const [faqs, setFaqs] = useState([]);


  useEffect(() => {
    getFaqs();
  }, []);

  const getFaqs = async (e) => {
    await ApiGet(`faq/getAllFAQ`)
      .then((res) => {
        setFaqs(res?.data?.payload?.faq);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <div>
      {/* <ToastContainer /> */}
      <section className="frequently-question-alignment">
        <div className="container">
          <div className="page-title">
            <h1>Frequently asked questions</h1>
          </div>
          <div className="faq-left-right-align">
            {faqs?.length > 0 &&
              faqs?.map((faq, item) => {
                return (
                  <div className="faq-border-bottom">
                    <div className="faq-list-grid">
                      <div className="faq-list-grid-items">
                        <h2>{faq?.question}</h2>
                      </div>
                      <div className="faq-list-grid-items">
                        <div
                          className="icon-design"
                          onClick={() => {
                            if (textShow === faq?._id) {
                              setTextShow();
                            } else {
                              setTextShow(faq?._id);
                            }
                          }}
                        >
                          <span>+</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        textShow === faq?._id ? "text-show" : "text-hidden"
                      }
                    >
                      <div className="faq-text-style">
                        <p>{faq?.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}
