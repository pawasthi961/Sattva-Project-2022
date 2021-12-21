/*eslint-disable*/
import React, { useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import Icon from "@material-ui/core/Icon";

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
// import DummyPic from "https://as1.ftcdn.net/v2/jpg/02/35/35/40/1000_F_235354051_yz3envzxnH9dulycguP6l4Bh3Xx0BPZ0.jpg";

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

const useStyles = makeStyles(styles);

export default function Charts() {
  const [image, setImage] = useState({ preview: "", raw: "" });
  const classes = useStyles();
  
  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
    });
  };

  return (
    <div>
      <Heading
        textAlign="center"
        title="Upload Image"
        // category={
        //   <span>
        //     A react wrapper for{" "}
        //     <a
        //       target="_blank"
        //       href="https://gionkunz.github.io/chartist-js/?ref=creativetim"
        //     >
        //       Chartist.js
        //     </a>
        //     . Please checkout the{" "}
        //     <a
        //       href="https://gionkunz.github.io/chartist-js/getting-started.html?ref=creativetim"
        //       target="_blank"
        //     >
        //       full documentation of Chartist.js
        //     </a>{" "}
        //     and{" "}
        //     <a
        //       href="https://fraserxu.me/react-chartist/?ref=creativetim"
        //       target="_blank"
        //     >
        //       full documentation of react-chartist
        //     </a>
        //     .
        //   </span>
        // }
      />
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="rose">
              <ChartistGraph
                className="ct-chart-white-colors"
                data={roundedLineChart.data}
                type="Line"
                options={roundedLineChart.options}
                listener={roundedLineChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Rounded Line Chart</h4>
              <p className={classes.cardCategory}>Line Chart</p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart-white-colors"
                data={straightLinesChart.data}
                type="Line"
                options={straightLinesChart.options}
                listener={straightLinesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Straight Lines Chart</h4>
              <p className={classes.cardCategory}>Line Chart with Points</p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="info">
              <ChartistGraph
                className="ct-chart-white-colors"
                data={simpleBarChart.data}
                type="Bar"
                options={simpleBarChart.options}
                responsiveOptions={simpleBarChart.responsiveOptions}
                listener={simpleBarChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Simple Bar Chart</h4>
              <p className={classes.cardCategory}>Bar Chart</p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer> */}
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="info" icon>
              <CardIcon color="info">
                <Timeline />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Coloured Line Chart <small>- Rounded</small>
              </h4>
            </CardHeader>
            <CardBody>
              <ChartistGraph
                data={colouredLineChart.data}
                type="Line"
                options={colouredLineChart.options}
                listener={colouredLineChart.animation}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Timeline />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Multiple Bars Chart <small>- Bar Chart</small>
              </h4>
            </CardHeader>
            <CardBody>
              <ChartistGraph
                data={multipleBarsChart.data}
                type="Bar"
                options={multipleBarsChart.options}
                listener={multipleBarsChart.animation}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer> */}
      <GridContainer>
          <Card>
            <CardHeader color="info" icon>
              <CardIcon color="info">
              <Icon style={{ paddingLeft: "4px", paddingTop: "3px" }}> upload_icon </Icon>
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Upload the File <small>- in .png, .jpg, or .jpeg format</small>
              </h4>
            </CardHeader>
            <CardBody>
              {/* <ChartistGraph
                data={colouredLinesChart.data}
                type="Line"
                options={colouredLinesChart.options}
                listener={colouredLinesChart.animation}
              /> */}
              <div style={{ display:"flex", justifyContent:"center", alignContent:"center" }}> 
              <div style={{ display:"inline-block" }}>
                <label htmlFor="upload-button">
                  {image.preview ? (
                    <img src={image.preview} alt="dummy" width="300" height="300" />
                    ) : (
                      <>
                        {/* <span className="fa-stack fa-2x mt-3 mb-2">
                          <i className="fa fa-circle fa-stack-2x" />
                          <i className="fa fa-store fa-stack-1x fa-inverse" />
                        </span> */}
                        <Icon style={{ marginLeft:"40%" }}> upload_icon </Icon>
                        <h5 className="text-center">Upload your photo</h5>
                      </>
                      )}
                  </label>
                <input
                  type="file"
                  id="upload-button"
                  style={{ display: "none" }}
                  onChange={handleChange}
                />
                <br />
                <div style={{display:"flex", alignItems:"center", justifyContent:"center", margin:"10px"}}>
                  <button>Upload</button>
                </div>
              </div>
              </div>
            </CardBody>
          </Card>
        {/* <GridItem xs={12} sm={12} md={5}>
          <Card>
            <CardHeader color="danger" icon>
              <CardIcon color="danger">
                <Timeline />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Pie Chart</h4>
            </CardHeader>
            <CardBody>
              <ChartistGraph
                data={pieChart.data}
                type="Pie"
                options={pieChart.options}
              />
            </CardBody>
            <CardFooter stats className={classes.cardFooter}>
              <h6 className={classes.legendTitle}>Legend</h6>
              <i className={"fas fa-circle " + classes.info} /> Apple{` `}
              <i className={"fas fa-circle " + classes.warning} /> Samsung
              {` `}
              <i className={"fas fa-circle " + classes.danger} /> Windows Phone
              {` `}
            </CardFooter>
          </Card>
        </GridItem> */}
      </GridContainer>
    </div>
  );
}
