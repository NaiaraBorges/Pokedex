/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button, Card} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { toFirstCharUppercase } from "../constants/constants";

import axios from "axios";

import background from '../assets/background04.png';

const useStyles = makeStyles((theme) => ({

    container: {
        textAlign: "center",
        color: "#28527A",
        fontFamily: '"Segoe UI Emoji"',
    },

    info: {
        textAlign: "center",
        fontFamily: '"Segoe UI Emoji"',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },

    Button: {
      background: 'linear-gradient(to left, #66ffff 0%, #cc99ff 100%)',
      color: "white",
      fontFamily: '"Segoe UI Emoji"',

      paddingLeft: "8px",
      paddingRight: "8px",
      marginTop: "15px",
      marginBottom: "15px",
      borderRadius: 10,
      left: "600px",
    },

    arrowBackIcon: {
      alignSelf: "flex-end",
      marginBottom: "5px",
    },

    text: {
      gap: "10px",
      bordertopwidth: "10px",
      paddingbox: "35px",
      margin: "5px",
      borderWidth:"1px",  
      borderStyle:"dotted",
      borderColor: "#FFF",
     
      display: "flex",
      justifyContent: "center",
      color: "#28527A",
      fontFamily: 'Poppins', 
      fontSize: '16px',

    },

    title: {
      width: "100%",
      color: "#FFF",
      display: "flex",
      justifyContent: "center",
      fontFamily: 'Poppins', 
      fontSize: '18px',
      background: 'linear-gradient(to left, #66ffff 0%, #cc99ff 100%)',
    },

    principal : {
      justifyContent: "center",
      width: "700px",
      height: "750px",
      background: "#FFFFFF",
      borderradius: "8px",
      border: "1px solid #E6EAF6",
      position: "relative",
      boxsizing: "border-box",
      padding: "30px",
      left: "300px",
   
    },
  }));



const Pokemon = (props) => {
  const classes = useStyles();
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const { name, id, species, height, weight, types, sprites, abilities, stats } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { back_default, back_shiny, front_default, front_shiny } = sprites;
    /*const {} =  abilities; */

    return (
      <>
  
        <Typography className={classes.container} variant="h2">
          {`${id}.`} {toFirstCharUppercase(name)}
          <img src={front_default} />
        </Typography> 

        <Box display="flex" justifyContent="center" m={1} p={1}>
        <img style={{ width: "500px", height: "500px", justifyContent: "center", position:"relative"}} src={background} />
        <img style={{ width: "300px", height: "300px", paddingTop: "120px" , justifyContent: "center", position: "absolute" }} src={fullImageUrl} />
        </Box>

         <Card className={classes.principal} >

        <Typography className={classes.title}>
          {" I. Species:  " }    
            </Typography>
          <Typography className={classes.text}>
          <Link href= {species.url}> {species.name} </Link>
        </Typography>

        <Typography className={classes.title}> II. Height: </Typography>
        <Typography className={classes.text}> {height} </Typography>

        <Typography className={classes.title}> II. Weight: </Typography>
        <Typography className={classes.text}> {weight} </Typography>

        <Typography className={classes.title}  variant="h6"> IV. Type:</Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return <Typography className={classes.text} key={name}> {`${name}`}</Typography>;
        })}

        <Typography className={classes.title}  variant="h6"> V. Skills:</Typography>
        {abilities.map((habInfo) => {
          const { ability } = habInfo;
          const { name } = ability;
          return <Typography className={classes.text} key={name}> {`${name}`}</Typography>;
        })}

        <Typography className={classes.title}  variant="h6"> VI. Status:</Typography>
        {stats.map((stInfo) => {
          const { stat } = stInfo;
          const { name } = stat;
          return <Typography className={classes.text} key={name}> {`${name}`}</Typography>;
        })}
        <Typography className={classes.title}> VII. Sprites: </Typography>
        <Typography className={classes.text} variant="h6">
        {" "}
          <img src={front_default} />
          <img src={back_default} />
          <img src={front_shiny} />
          <img src={back_shiny} />
        </Typography>

        </Card>

      </>
    );
  };

  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}

      {pokemon !== undefined && (
        <Button className={classes.Button} variant="contained" onClick={() => history.push("/")}>
          <ArrowBackIcon className={classes.arrowBackIcon} />
          back to pokedex
        </Button>
      )}
    </>
  );
};

export default Pokemon;