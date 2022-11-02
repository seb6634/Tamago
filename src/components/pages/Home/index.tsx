import "./home.css";
import Button from "../../parts/Button/Button";
import {Link} from "react-router-dom";
import React from "react";

const Home = () => {
  const handleSubmit = () => "TODO";

  return (
    <div className="bg-gradient-to-b from-blue-light to-blue-dark">
      <div className="bg-blue-light font-bold relative banner">
        <div className="w-max absolute top-1/3 right-1/2 translate-x-2/4 text-center">
          <h1 className="text-2xl md:text-5xl text-white mb-10">
            Bienvenue sur Tamago !
          </h1>
          <Link to="/login">
            <Button
              action={handleSubmit}
              color="btn-orange"
              text="Adopter un Tamago"
            />
          </Link>
        </div>
        <img
          alt="Chat"
          className="absolute cat"
          src="/assets/images/cute-cat.png"
        />
      </div>
      <div className="flex md:flex-row flex-col max-w-7xl pt-24 sm:pt-20 xl:pt-0 items-center w-full px-8  mx-auto mt-0 sm:mt-18  md:mt-24 lg:mt-40">
        <div className="basis-full mt-6 md:mt-0 ">
          <p className="text-2xl sm:text-3xl md:text-5xl text-white uppercase mb-4 font-bold">
            Lorem ipsum dlor !
          </p>
          <p className="leading-relaxed  md:mb-0 font-normal ">
            Ipsa, dolor iusto veritatis reprehenderit nisi porro illum omnis
            perferendis, vero quos voluptas.
          </p>
          <p className="mb-4">
            perferendis, vero quos asperiores animi voluptas.
          </p>
        </div>
        <div className="basis-full w-full relative max-w-md pb-6 mx-tamago">
          <img
            alt="Tamagotchi"
            className="h-full w-full object-cover relative z-10 tamago-img"
            src="/assets/images/tamagotchi.png"
          />
          <div className="tamago-shadow" />
          {/* <img
            alt="Brush"
            className="w-4/5 absolute bottom-0 right-0 brush-img"
            src="/assets/images/brush.png"
          /> */}
        </div>
      </div>
      <div className="flex md:flex-row flex-col max-w-7xl py-14 mx-auto items-center w-full px-8 flex-col-reverse mb-16">
        <div className="basis-full mr-0 md:mr-8 md:basis-1/3 h-54 max-w-xs">
          <img
            alt="Illustration corgi"
            className="h-full object-contain m-auto max-h-72 corgi-img"
            src="/assets/images/corgi.png"
          />
        </div>
        <div className="basis-full md:basis-2/3 mb-6 md:mb-0">
          <p className="text-2xl sm:text-3xl md:text-5xl text-white uppercase mb-4 font-bold">
            In amet corrupti ?
          </p>
          <p className="leading-relaxed font-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            consequuntur laboriosam, eum aliquam et eligendi repellat officiis
            veritatis delectus fuga !
          </p>
        </div>
      </div>
      <div className="text-center py-20 bg-blue-light">
        <h2 className="mb-6">Cumque minus consequatur eligendi repellat</h2>
        <Link to="/login">
          <Button
            action={handleSubmit}
            color="btn-orange"
            text="Jouer gratuitement"
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
