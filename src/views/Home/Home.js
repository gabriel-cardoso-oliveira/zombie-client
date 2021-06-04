/*eslint-disable*/
import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MUIDataTable, { ExpandButton } from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import Close from "@material-ui/icons/Close";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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

import styles from "assets/jss/material-kit-react/views/onePage.js";

import image from "assets/img/bg-zombie.png";
import { columns } from "utils/columns.js";
// API RESTful
import api from "services/api.js";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function Home(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [survivors, setSurvivors] = useState([]);
  const [survivor, setSurvivor] = useState([]);
  const [modal, setModal] = useState(false);

  const history = useHistory();

  setTimeout(() => {
    setCardAnimation("");
  }, 950);

  const classes = useStyles();

  const { ...rest } = props;

  async function getSurvivors() {
    try {
      const { data } = await api.get("survivors");

      const survivorsTmp = data.map(survivo => {
        survivo.is_infected = survivo.is_infected ? "Infected" : "Not Infected";

        return survivo;
      });

      return setSurvivors(survivorsTmp);
    } catch (error) {
      toast.error("Could not connect to the server.");
    }
  }

  useEffect(() => {
    getSurvivors();
  }, []);

  const updateSurvivor = async survivor => {
    try {
      const values = {
        survivorId: Number(survivor[0]),
        name: survivor[1],
        email: survivor[2],
        birth_date: survivor[3],
        is_infected: survivor[4] === "Infected" ? false : true,
      };

      await api.put("survivors", values);

      getSurvivors();

      return toast.success("Survivor successfully changed", {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (error) {
      toast.error("Could not connect to the server.");
    }
  }

  const handleOpenModal = values => {
    setSurvivor(values);

    return setModal(true);
  };

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
              onClick={() => handleOpenModal(rowData)}
            >
              View
            </Button>
            <Button
              variant="contained"
              color="warning"
              style={{ marginLeft: 16, height: 32 }}
              onClick={() => updateSurvivor(rowData)}
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
      return (<ExpandButton {...props} />);
    },
  };

  const addSurvivor = () => {
    return history.push("/add");
  };

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
                  <GridContainer justify="center">
                    {/* <Button
                      onClick={addSurvivor}
                      simple
                      color="primary"
                      size="lg"
                    >
                      ADD SURVIVOR
                    </Button> */}
                  </GridContainer>
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
              <Dialog
                classes={{
                  root: classes.center,
                  paper: classes.modal,
                }}
                open={modal}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setModal(false)}
                aria-labelledby="classic-modal-slide-title"
                aria-describedby="classic-modal-slide-description"
              >
                <DialogTitle
                  id="classic-modal-slide-title"
                  disableTypography
                  className={classes.modalHeader}
                >
                  <IconButton
                    className={classes.modalCloseButton}
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => setModal(false)}
                  >
                    <Close className={classes.modalClose} />
                  </IconButton>
                  <h2 className={classes.modalTitle}>{survivor[1]}</h2>
                </DialogTitle>
                <DialogContent
                  id="classic-modal-slide-description"
                  className={classes.modalBody}
                >
                  <h3>All survivor data</h3>
                  <br />
                  <p><strong>E-mail:</strong> {survivor[2]}</p>
                  <p><strong>Birth Date:</strong> {survivor[3]}</p>
                  <p><strong>Status:</strong> {survivor[4]}</p>
                </DialogContent>
                <DialogActions className={classes.modalFooter}>
                  <Button
                    onClick={() => setModal(false)}
                    color="danger"
                    simple
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </GridItem>
          </GridContainer>
        </div>
        <ToastContainer />
        <Footer whiteFont />
      </div>
    </div>
  );
}
