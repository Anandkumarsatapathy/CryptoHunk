import { useState } from "react";
import axios from "axios";
import {  makeStyles } from "@material-ui/core";
import { TrendingCoins } from "../../Config/api";
import { CryptoState } from "../../CryptoContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";

// Styles

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const useStyles = makeStyles(() => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textDecoration: "none",
      textTransform: "uppercase",
      color: "white",
    },
  }));
  const classes = useStyles();
  const { currency, symbol } = CryptoState();
  // console.log(currency);
  // Number to commass
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // fetching the TrendingCoin end point
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    
    setTrending(data);
  };

  // console.log(trending);
  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line
  }, [currency]);

  // items of bitcoins
  const items = trending.map((coin) => {
    //Profit
    let profit = coin?.price_change_percentage_24h >= 0;
    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14,203,129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontsize: 22, frontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  // responsiveness of Carousel
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
