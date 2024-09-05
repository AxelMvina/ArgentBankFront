import { FeatureItem } from "../../Components/FeatureItem";
import FeatureImg1 from "../../assets/img/icon-chat.webp";
import FeatureImg2 from "../../assets/img/icon-money.webp";
import FeatureImg3 from "../../assets/img/icon-security.webp"

export function Home() {
    return (
        <main>
            <div className="hero">
                <section className="hero-content">
                    <h2 className="sr-only">Promoted Content</h2>
                    <p className="subtitle">No fees.</p>
                    <p className="subtitle">No minimum deposit.</p>
                    <p className="subtitle">High interest rates.</p>
                    <p className="text">Open a savings account with Argent Bank today!</p>
                </section>
            </div>
            <section className="features">
                <h2 className="sr-only">Features</h2>
                <FeatureItem image={FeatureImg1} alt='Chat Icon' title="You are our #1 priority" p="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes." />
                <FeatureItem image={FeatureImg2} alt="Money Icon" title="More savings means higher rates" p="The more you save with us, the higher your interest rate will be!" />
                <FeatureItem image={FeatureImg3} alt="Security Icon" title="Security you can trust" p="We use top of the line encryption to make sure your data and money is always safe." />
            </section>
        </main>
    )
}