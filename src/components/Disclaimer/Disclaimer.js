import React, { useEffect } from "react";
import "./Disclaimer.scss";
export default function Disclaimer() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <section className="disclaimer-section-alignment">
      <div className="container">
        <div className="page-title">
          <h1>Disclaimer</h1>
        </div>
        <div className="child-text-style">
          <p>
            This disclaimer ("Disclaimer") will be applicable to this Website.
            By using or accessing this Website, viewer agrees with the
            Disclaimer without any qualification or limitation. The Company
            reserves the right to add, alter or delete any material or
            information from this Website at any time and may, at any time,
            revise these Terms without notification. Viewers are bound by any
            such amendments and the Company, therefore, advises that the viewer
            periodically visit this page to review the Terms.
          </p>
          <p>
            This Website and all its content are provided on an "as is" and "as
            available" basis. No information given under this Website creates a
            warranty or expand the scope of any warranty that cannot be
            disclaimed under applicable law. Use of this Website is solely at
            the viewer’s own risk. The content & information provided in this
            Website are indicative only. Nothing on this Website constitutes
            advertising, marketing, booking, selling or an offer for sale or
            invitation to purchase a unit in any project by the Company. It does
            not constitute part of an offer or contract. Design & specifications
            are subject to change without prior notice. Computer generated
            images are the artist’s impression and are only indicative of the
            designs intent.
          </p>
          <p>
            The particulars contained on the website mentions details of the
            Properties being analysed by the Company. Viewers are therefore
            required to verify all the details, including area, amenities,
            services, terms of sales and payments and other relevant terms
            independently with the Company in writing from the Company prior to
            arriving at any decision for buying any unit(s) in any of the said
            Properties. The said information will not be construed as an
            advertisement. To know more about Properties, please contact our
            sales team or visit our sales office during office hours and speak
            to one of our sales personnel.
          </p>
          <p>
            In no event will the Company be liable for any expense, loss or
            damage including, without limitation, indirect or consequential loss
            or damage, or any expense, loss or damage whatsoever arising from
            use, or loss of use, of data, arising out of or in connection with
            the use of this Website or any action taken by the viewer relying on
            such material/information on this Website.
          </p>
        </div>
      </div>
    </section>
  );
}
