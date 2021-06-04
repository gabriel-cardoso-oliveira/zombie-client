import React, { useState, useRef } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
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
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";

import styles from "assets/jss/material-kit-react/views/onePage.js";

import image from "assets/img/bg-zombie.png";

import api from "services/api.js";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState();
  const [isInfected, setIsInfected] = useState(false);

  const nameRef = useRef();

  const history = useHistory();

  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();

  const { ...rest } = props;

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string(),
    birth_date: Yup.date(),
    is_infected: Yup.boolean().required(),
  });

  async function addSurvivor() {
    try {
      const values = {
        name,
        email,
        birth_date: birthDate,
        is_infected: isInfected,
      };
      console.log(values);
      if (!(await schema.isValid(values))) {
        return toast.error("Check the data and try again!");
      }

      await api.post("survivors", values);

      toast.success("survivor successfully added!");

      return history.push("/");
    } catch (error) {
      return toast.error("Check the data and try again!");
    }
  }

  // const addTest = (e) => {
  //   console.log("change", name);
  //   return setName(e.target.value);
  // };

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
            <GridItem xs={12} sm={12} md={6}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Add Survivor</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Full Name..."
                      id="full"
                      ref={nameRef}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={name}
                      onChangeText={setName}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Birth Date..."
                      id="birth"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      inputProps={{
                        type: "date",
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <div>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={isInfected}
                            onChange={(e) => setIsInfected(e.target.checked)}
                            value="isInfected"
                            classes={{
                              switchBase: classes.switchBase,
                              checked: classes.switchChecked,
                              thumb: classes.switchIcon,
                              track: classes.switchBar,
                            }}
                          />
                        }
                        classes={{
                          label: classes.label,
                        }}
                        label="Is infected?"
                      />
                    </div>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      onClick={addSurvivor}
                      simple
                      color="primary"
                      size="lg"
                    >
                      Save
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <ToastContainer />
        <Footer whiteFont />
      </div>
    </div>
  );
}
