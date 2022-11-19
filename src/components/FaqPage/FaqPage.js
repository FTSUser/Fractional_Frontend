import React, { useState, useEffect } from "react";
import {  toast } from "react-toastify";
import "./FaqPage.scss";
import { handleGetFaqByCategoryId, handleGetFaqCategory } from "../../Helpers/CommonAPI/CommonAPI";
export default function FaqPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      // left: 0,
      // behavior: "smooth",
    });
  }, []);

  const [textShow, setTextShow] = useState([]);
  const [textShowFaq, setTextShowFaq] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [faqCategory, setFaqCategory] = useState();
  const [categoryIdForFaq, setCategoryIdForFaq] = useState();
  const [loadind, setLoading] = useState(false);

  useEffect(() => {
    getFaqCategory();
  }, []);

  useEffect(() => {
    if (categoryIdForFaq !== undefined) {
      getFaqByCategory();
    }
  }, [categoryIdForFaq]);

  const getFaqByCategory = async () => {
    setLoading(true);
    handleGetFaqByCategoryId(categoryIdForFaq)
      .then((res) => {
        setFaqs(res?.faq);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const getFaqCategory = async () => {
    handleGetFaqCategory()
      .then((res) => {
        setFaqCategory(res?.faq);
        setCategoryIdForFaq(res?.faq[0]?._id);
      })
      .catch((err) => toast.error(err?.message));
  };

  const handleFaqCat = (category) => {
    setCategoryIdForFaq(category?._id);
    if (textShow === category?._id) {
      setTextShow();
    } else {
      setTextShow(category?._id);
    }
  };

  return (
    <div>
      <section className="faq-page-alignment">
        <div className="faq-banner">
          <div className="container">
            <div className="page-title">
              <h1>FAQs</h1>
              <div>
                <p>
                  In today’s life, luxury is time and space. The time we set
                  aside for our relaxation deserves to be spent in the choicest
                  of places. Our portfolio of second homes brings forth an
                  experience of bespoke luxury at a never-before price. This is
                  an innovatory and ingenious approach to owning a luxurious
                  lifestyle. We say: Be true to your desires; being happy never
                  goes out of style!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sticky-section">
        <div className="faq-top-bar">
          <div className="container">
            <div className="faq-list">
              <nav>
                <ul>
                  {faqCategory &&
                    faqCategory.map((category) => {
                      return (
                        <>
                          <li
                            className={
                              categoryIdForFaq === category?._id
                                ? "activeTab"
                                : ""
                            }
                            onClick={() => {
                              handleFaqCat(category);
                            }}
                          >
                            {category?.name}
                          </li>
                        </>
                      );
                    })}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section className="faq-section-bottom-alignment">
        <div className="container">
          <div className="cus-border-bottom">
            {!loadind && faqs.length === 0 && (
              <>
                <h3 className="no-faq-data">
                  {" "}
                  NO FAQ available for this category{" "}
                </h3>
              </>
            )}
            {!loadind &&
              faqs &&
              faqs?.map((faq) => {
                return (
                  <>
                    <div className="faq-border-bottom faq-border-bottom1">
                      <div className="faq-list-grid">
                        <div className="faq-list-grid-items">
                          <h2>{faq?.question}</h2>
                        </div>
                        <div className="faq-list-grid-items">
                          <div
                            className="icon-design"
                            onClick={() => {
                              if (textShowFaq === faq?._id) {
                                setTextShowFaq();
                              } else {
                                setTextShowFaq(faq?._id);
                              }
                            }}
                          >
                            <span>{textShowFaq === faq?._id ? "-" : "+"}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={
                          textShowFaq === faq?._id ? "text-show" : "text-hidden"
                        }
                      >
                        <div className="faq-text-style">
                          <p className="faqSectionAlignmentDesign">
                            {faq?.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}
