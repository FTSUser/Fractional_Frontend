import React, { useState } from 'react'
import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton,
    EmailIcon,
    FacebookIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WhatsappIcon,
    WorkplaceIcon,
} from "react-share";
import { Modal } from "react-bootstrap";
import Carousel from "react-multi-carousel";

function SharePopertyModal(props) {
    const { modalShow, setmodalShow, property } = props;
    // const [modalShow, setmodalShow] = useState(false);
    const [urlLink, seturlLink] = useState(window.location.href);

    const copyData = (value) => {
        navigator.clipboard.writeText(value);
        seturlLink(window.location.pathname);
    };

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 8,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 8,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 8,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 6,
        },
      };
    return (
        <>
            <Modal show={modalShow} onHide={()=>setmodalShow(false)} centered>
                <Modal.Header>
                    <Modal.Title>
                        Share
                        <div className="closeButton" onClick={()=>setmodalShow(false)}>
                            X
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="itemCarousel">
                        <Carousel responsive={responsive}>
                            <div>
                                <EmailShareButton url={urlLink}>
                                    <EmailIcon round={true} size={50} />
                                </EmailShareButton>
                            </div>
                            <div>
                                <FacebookShareButton url={urlLink}>
                                    {" "}
                                    <FacebookIcon round={true} size={50} />
                                </FacebookShareButton>
                            </div>
                            <div>
                                <HatenaShareButton url={urlLink}>
                                    <HatenaIcon round={true} size={50} />
                                </HatenaShareButton>
                            </div>
                            <div>
                                <InstapaperShareButton url={urlLink}>
                                    <InstapaperIcon round={true} size={50} />
                                </InstapaperShareButton>
                            </div>
                            <div>
                                <LineShareButton url={urlLink}>
                                    <LineIcon round={true} size={50} />
                                </LineShareButton>
                            </div>
                            <div>
                                <LinkedinShareButton url={urlLink}>
                                    <LinkedinIcon round={true} size={50} />
                                </LinkedinShareButton>
                            </div>
                            <div>
                                <LivejournalShareButton url={urlLink}>
                                    <LivejournalIcon round={true} size={50} />
                                </LivejournalShareButton>
                            </div>
                            <div>
                                <MailruShareButton url={urlLink}>
                                    <MailruIcon round={true} size={50} />
                                </MailruShareButton>
                            </div>
                            <div>
                                <OKShareButton url={urlLink}>
                                    <OKIcon round={true} size={50} />
                                </OKShareButton>
                            </div>
                            <div>
                                <PinterestShareButton url={urlLink}>
                                    <PinterestIcon round={true} size={50} />
                                </PinterestShareButton>
                            </div>
                            <div>
                                <PocketShareButton url={urlLink}>
                                    <PocketIcon round={true} size={50} />
                                </PocketShareButton>
                            </div>
                            <div>
                                <RedditShareButton url={urlLink}>
                                    <RedditIcon round={true} size={50} />
                                </RedditShareButton>
                            </div>
                            <div>
                                <TelegramShareButton url={urlLink}>
                                    <TelegramIcon round={true} size={50} />
                                </TelegramShareButton>
                            </div>
                            <div>
                                <TumblrShareButton url={urlLink}>
                                    <TumblrIcon round={true} size={50} />
                                </TumblrShareButton>
                            </div>
                            <div>
                                <TwitterShareButton url={urlLink}>
                                    <TwitterIcon round={true} size={50} />
                                </TwitterShareButton>
                            </div>
                            <div>
                                <ViberShareButton url={urlLink}>
                                    <ViberIcon round={true} size={50} />
                                </ViberShareButton>
                            </div>
                            <div>
                                <WorkplaceShareButton url={urlLink}>
                                    <WorkplaceIcon round={true} size={50} />
                                </WorkplaceShareButton>
                            </div>
                            <div>
                                <WhatsappShareButton url={urlLink}>
                                    <WhatsappIcon round={true} size={50} />
                                </WhatsappShareButton>
                            </div>
                            <div>
                                <VKShareButton url={urlLink}>
                                    <VKIcon round={true} size={50} />
                                </VKShareButton>
                            </div>
                        </Carousel>
                    </div>

                    <div className="inputData">
                        <input value={urlLink} className="inputData-inputchange" disabled />
                        <div className="copytext" onClick={() => copyData(urlLink)}>
                            <img src="/copy.png"></img>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default SharePopertyModal