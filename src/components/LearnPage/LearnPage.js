import React, { useEffect } from 'react'
import './LearnPage.scss';
import BuyersSection from './BuyersSection/BuyersSection';
import TimeShares from './TimeShares/TimeShares';
import EasyScheduling from './EasyScheduling/EasyScheduling';
import OwnersSection from './OwnersSection/OwnersSection';
import HowItWorks from '../home/HowItWorks/HowItWorks';
export default function LearnPage() {
    useEffect(() => {
        window.scrollTo({
          top: 0,
        });
      }, []);
    return (
        <div>
            <section className='learn-page-section-alignment'>
                <div className='container'>
                    <div className='page-title'>
                        <h1>Owning a Holiday Home, Made Easy</h1>
                        <p>
                        You own, we manage - the modern way to own a second home.
                        </p>
                    </div>
                </div>
            </section>
            <section className='learn-banner'></section>
             <>
                 <HowItWorks />
            </>
            <>
                <BuyersSection/>
            </>
            <>
                <TimeShares/>
            </>
            <>
                <EasyScheduling/>
            </>
            <>
                <OwnersSection/>
            </>
            <>
                {/* <ContactSection/> */}
            </>
        </div>
    )
}
