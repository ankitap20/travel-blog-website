import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const a = [
    "Dare to live the life you've always wanted",
    "Adventure awaits at every corner, go and explore!",
    "Let the journey unravel the mysteries of the world.",
    "Discover the world's wonders, one step at a time.",
    "Embrace the unknown and let wanderlust be your guide.",
    "Escape the ordinary and embrace the extraordinary in travel.",
    "Wanderlust: a strong desire to explore the beauty of the world.",
    "Travel far, travel wide, and let your soul come alive.",
    "Seek the unfamiliar and create lifelong memories on your journey.",
    "Roam free, wander far, and let the world be your playground.",
  ];
  
  const images=[
    "/Travel-img1.jpg",
    "/Travel-img2.jpg",
    "/Travel-img3.jpg",
    "/Travel-img4.jpg",
    "/Travel-img5.jpg",
    "/Travel-img6.jpg",
    "/Travel-img7.jpg",
    "/Travel-img8.jpg",
    "/Travel-img9.jpg",
    "/Travel-img10.jpg",
  ];
  
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % a.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [a.length]);


  return (
    <Box position={"relative"} width="100%" height="90vh">
      <img src={images[currentIndex]} alt="Road" width={"99%"} height="88%" style={{marginLeft:'0.5%',marginRight:'0.5%'}} />
      <Typography
        fontFamily={"Dancing Script,cursive"}
        variant="h3"
        fontWeight="bold"
        textAlign={"center"}
        width="100%"
        sx={{
          position: "absolute",
          top: "0px",
          color: "#111115de", // #111115de
          background: "white",
        }}
      >
        {a[currentIndex]}
      </Typography>
      <Box width="100%" height="12%" display={"flex"} flexDirection="column">
        {/* <Typography
          fontFamily={"quicksand"}
          textAlign={"center"}
          variant="h4"
          padding={4}
        >
          SHARE YOUR TRAVEL DIARIES WITH US
        </Typography> */}
        <Box margin="auto">
        {/* <Button variant="outlined" sx={{ mr: 2 }}>
            Share Your Story
          </Button> */}
          <Button
            LinkComponent={Link}
            to="/diaries"
            variant="contained"
            sx={{ ml: 2 }}
          >
            View Diaries
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
