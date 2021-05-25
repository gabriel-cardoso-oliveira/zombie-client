/*eslint-disable*/
import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MUIDataTable, { ExpandButton } from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { toast } from "react-toastify";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg-zombie.png";
import { columns } from "utils/columns.js";
// API RESTful
import api from "services/api.js";

const useStyles = makeStyles(styles);

export default function Home(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [survivors, setSurvivors] = useState([]);

  setTimeout(() => {
    setCardAnimation("");
  }, 950);

  const classes = useStyles();

  const { ...rest } = props;

  const options = {
    selectableRows: "none",
    filterType: "checkbox",
    expandableRows: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: true,
    renderExpandableRow: (rowData) => {
      const colSpan = rowData.length + 1;
      return (
        <TableRow>
          <TableCell colSpan={colSpan}>
            Ações:
            <Button
              variant="contained"
              color="info"
              style={{ marginLeft: 16, height: 32 }}
              onClick={() => {}}
            >
              View
            </Button>
            <Button
              variant="contained"
              color="warning"
              style={{ marginLeft: 16, height: 32 }}
              onClick={() => {}}
            >
              {rowData[4] === "Infected" ? "Not Infected" : "Infected"}
            </Button>
          </TableCell>
        </TableRow>
      );
    },
  };

  const theme = createMuiTheme({
    overrides: {
      MUIDataTableSelectCell: {
        expandDisabled: {
          visibility: "hidden",
        },
      },
    },
  });

  const components = {
    ExpandButton: (props) => {
      if (props.dataIndex === 3 || props.dataIndex === 4) {
        return <div style={{ width: "24px" }} />;
      }

      return (<ExpandButton {...props} />);
    },
  };

  async function getSurvivors() {
    try {
      const { data } = await api.get("survivors");

      const survivorsTmp = data.map(survivo => {
        survivo.is_infected = survivo.is_infected ? "Infected" : "Not Infected";

        return survivo;
      });

      setSurvivors(survivorsTmp);
    } catch (error) {
      toast.error("Could not connect to the server.");
    }
  }

  useEffect(() => {
    getSurvivors();
  }, []);

  return (
    <div>
      <Header
        color="transparent"
        brand="React for Zombie"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 100,
          color: "white",
        }}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h3>Survivors</h3>
                  </CardHeader>
                  <CardBody>
                    <MuiThemeProvider theme={theme}>
                      <MUIDataTable
                        data={survivors}
                        columns={columns}
                        options={options}
                        components={components}
                      />
                    </MuiThemeProvider>
                  </CardBody>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
