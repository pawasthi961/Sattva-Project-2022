/*eslint-disable*/
import React, { useEffect, useState } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
// import ImageListItemBar from '@mui/material/ImageListItemBar';
// react plugin for creating charts
import ChartistGraph from "react-chartist";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";

// core components
import Heading from "components/Heading/Heading.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Image1 from "assets/sattvaimg/1.png";
import Image2 from "assets/sattvaimg/2.png";
import Image3 from "assets/sattvaimg/3.png";
import Image4 from "assets/sattvaimg/4.png";
import Image5 from "assets/sattvaimg/5.png";
import Image6 from "assets/sattvaimg/6.png";
import Image7 from "assets/sattvaimg/7.png";
import Image8 from "assets/sattvaimg/8.png";
import Image9 from "assets/sattvaimg/9.png";
import Image10 from "assets/img/header-doc.jpeg";
import Image11 from "assets/img/sidebar-1.jpg";
import Image12 from "assets/img/sidebar-2.jpg";
import Image13 from "assets/img/sidebar-3.jpg";

import {
  roundedLineChart,
  straightLinesChart,
  simpleBarChart,
  colouredLineChart,
  multipleBarsChart,
  colouredLinesChart,
  pieChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-pro-react/views/chartsStyle.js";
import Image from "@material-ui/icons/Image";
import { isTemplateExpression } from "typescript";
import { ImageListItemBar } from "@mui/material";

const useStyles = makeStyles(styles);

export default function TwitterImages() {
  const classes = useStyles();
  const [tweetData, setTweetData] = useState([])

  useEffect(()=>{

    fetch("/data/tweet_data",{})
    .then(res => res.json())
    .then(result => {
      setTweetData(JSON.parse(result))

    })

  },[])
  return (
    <div>
      <Heading
        textAlign="center"
        title="Twitter Images"
        category={
          <span>
            Displays all the images posted on <b>Twitter</b> under the hashtag <b>#SattvaNFT</b><br />
            <small>Includes images which are rejected or in pending also.</small> 
          </span>
        }
      />
      <ImageList cols={4}>
        {tweetData.map((item) => (
          <ImageListItem key={item._id["$oid"]}>
            <img
              src={item.media_url}
              // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              subtitle={<span>by: {item.user_handle}</span>}
              actionIcon={
                <Tooltip title="info" placement="top-start">
                  <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.user_handle}`}
                  >
                  <InfoIcon />
                  </IconButton>
                </Tooltip>
                
            }
            />
          </ImageListItem>
        ))}
      </ImageList>
      
      
    </div>
  );
}
