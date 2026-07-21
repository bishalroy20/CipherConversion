import CipherBlocks from "./Cipherblocks";
import CipherFAQ from "./CipherFAQ";
import CryptoTip from "./CryptoTip";
import Hero from "./Hero";


const Home = () => {

    return(
        <div>
            <Hero/>

            <CipherBlocks/>
            <CryptoTip/>
            <CipherFAQ/>
        </div>
    )
};

export default Home;