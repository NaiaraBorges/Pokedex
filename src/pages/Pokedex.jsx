import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Toolbar,
  AppBar,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "../constants/constants";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import pokemonLogo from '../assets/Pokemon_logo.svg';

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
    backgroundColor: "white",
  },

  card: {
    background: 'linear-gradient(to left, #66ffff 0%, #cc99ff 100%)',
    borderRadius: 20,
    margin: 5,
    cursor: "pointer",
  },

  cardMedia: {
    margin: "auto",
  },

  cardContent: {
    textAlign: "center",
    background: 'linear-gradient(to left, #66ffff 0%, #cc99ff 100%)',
    color: "#FFF",
  },

  searchContainer: {
    justifyContent: "flex-end",
    display: "flex",
    paddingLeft: "10px",
    paddingRight: "10px",
    marginTop: "5px",
    marginBottom: "5px",
    borderRadius: 10,
  },

  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
    color:'#cc99ff',
  },

  searchInput: {
    width: "200px",
    margin: "5px",
  },

  toolBar: {
    backgroundColor: "#FFF",
  },
  
}));

const Pokedex = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];
    return (
      <Grid item xs={2} key={pokemonId}>
        <Card className={classes.card}
        onClick={() => history.push(`/${id}`)}>
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{ width: "130px", height: "130px" }}
          />
          <CardContent className={classes.cardContent}>
            <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
        <img src={pokemonLogo} alt="Pokemon logo"></img>
          <div className={classes.searchContainer}>
            <SearchIcon className={classes.searchIcon} />
            <TextField
              className={classes.searchInput}
              onChange={handleSearchChange}
              label="Pesquisar"
              variant="standard"
            />
          </div>
        </Toolbar>
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map(
            (pokemonId) =>
              pokemonData[pokemonId].name.includes(filter) &&
              getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Pokedex;