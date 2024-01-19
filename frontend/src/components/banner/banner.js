import banner1 from "../../images/banner1.png";
import banner2 from "../../images/banner2.png";
import ai from "../../images/ai-menuu.jpg";

export default function Banner({ setRegisterboxVisibility }) {
  const handleLetsStartClick = () => {
    setRegisterboxVisibility(true);
  };

  return (
    <section className="banner">
      <div className="container">
        <div className="banner__left">
          <h1>
          Get <b>special</b> meals for you with AI

          </h1>
          <p>
          This application aims to develop an artificial intelligence-based menu recommendation system for restaurants.
          </p>
          <h3>
            <a className="banner__left__button" onClick={handleLetsStartClick}>
              Let's Start
            </a>
          </h3>
        </div>
        <div className="banner__right">
          <img src={ai} alt="" />
       </div>
      </div>
    </section>
  );
}
