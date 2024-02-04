
import fotoprueba2 from '../../../assets/img/artists.jpg'
import fotoprueba3 from '../../../assets/img/investors.jpg'
import {
    web3ConnectWallet,
} from ".././../../../src/backend/web3api";
import React, { useEffect, useState } from "react";



function LearnMore({ contactRef }) {

    const [isConnected, setIsConnected] = useState(false)

    const apiConnectWallet = async () => {
        let selectedAccount = await web3ConnectWallet();
        setIsConnected(Boolean(selectedAccount));

    };

    const handleContactUsClick = () => {
        contactRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <section className='home-2'>

            <div className='container-section-info'>
                <figure>
                    <img className='img1-info' src={fotoprueba2} alt='img1' />
                </figure>
                <article className='article-info'>
                    <h2>For Artists.</h2>
                    <p>Credit Song is an online trading marketplace created for and by artists.
                        You can start sellingyour musical rights today.
                        Send us an email if you are interested and in a matter of days
                        your song will be uploaded for sale.</p>

                    <button onClick={handleContactUsClick} className='buttondetalles2'>Contact Us</button>

                </article>

            </div>
            <div className='container-section-info'>
                <article className='article-info'>
                    <h2>For Investors.</h2>
                    <p>Credit Song gives access to an unlimited amount of musical rights.
                        Every user can buy and sell musical rights trough Metamask while we take care of the distribution of royalties.
                        Start investing today.</p>

                    <button className='buttondetalles2' onClick={() => apiConnectWallet()}>Connect To Metamask</button>

                </article>
                <figure>
                    <img className='img1-info' src={fotoprueba3} alt='img1' />
                </figure>

            </div>
        </section>
    )
}

export default LearnMore