import './Home2.css';
import fondomano from '../../assets/img/image5.svg';
import React from 'react'
import LearnMore from './LearnMore/LearnMore';
import { useRef } from 'react';

const Home2 = () => {

    const learnMoreRef = useRef(null);
    const contactRef = useRef(null);

    const handleLearnMoreClick = () => {
        learnMoreRef.current.scrollIntoView({ behavior: 'smooth' });
    };



    return (
        <>

            <header className='headerCredit'>
                <div className='manodisplay'>

                    < h1 className='h1Home'>Invest In Your<br></br>Favourite Songs.</h1>
                    <p className='enhancetext'><span class="autotype"></span>Enhance your portfolio. Invest <br></br>in musical assets for recurring <br></br>revenue generation.</p>

                    <button className='buttondetalles' onClick={handleLearnMoreClick}>
                        Learn More
                    </button>
                    <img className="imagenMano" src={fondomano}></img>
                </div>
            </header>

            <section className='learn-more' ref={learnMoreRef}>
                <LearnMore contactRef={contactRef} />
            </section>

            <section className='resume'>

                <div className='card-resume'>
                    <p className='title-resume1'>Offer your Songs</p>
                    <p className='text-resume'>We will upload the song for sale in our marketplace. After a fast and easy process the song will be uploaded for sale.</p>

                </div>
                <div className='card-resume2'>
                    <p className='title-resume'>Buy and Sell</p>
                    <p className='text-resume'>Enjoy our marketplace full of unlimited possibilities. Help your favourite artists grow their project by investing in their songs.</p>

                </div>
                <div className='card-resume'>
                    <p className='title-resume1'>Royalties</p>
                    <p className='text-resume'>We take care of the distribution of royalties. Holders will recieve the royalties associated to the their song.</p>

                </div>

            </section>
            <section className='contactus' ref={contactRef} >
                <div className='containerhome'>
                    <div className='item'>
                        <div className='contact'>
                            <div className='first-text'>Let's get in touch.</div>

                        </div>

                        <div className='submit-form'>
                            <form action="https://formsubmit.co/info@creditsong.com" method="POST">
                                <div className='inputbox'>
                                    <input type='text' className='input' required></input>
                                    <label for=''>Name</label>
                                </div>
                                <div className='inputbox'>
                                    <input type='email' className='input' required></input>
                                    <label for=''>Email</label>
                                </div>
                                <div className='inputbox'>
                                    <input type='tel' className='input' required></input>
                                    <label for=''>Phone</label>
                                </div>
                                <div className='inputbox'>
                                    <textarea class='input' id='message' required cols='30' rows='10'></textarea>
                                    <label for=''>Message</label>
                                </div>
                                <input type='submit' className='btncontactus' value='Submit'></input>
                            </form>
                        </div>
                    </div>

                </div>
            </section>


        </>





    )




}

export default Home2;