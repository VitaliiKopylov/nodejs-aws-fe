import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Box } from "@material-ui/core";
import { Product } from "models/Product";
import { formatAsPrice } from "utils/utils";

import API_PATHS from "constants/apiPaths";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3, 0, 3),
  },
  cardImage: {
    maxWidth: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  imageWrapper: {
    paddingTop: "75%", // 16:9
    position: "relative",
  },
  pageTitle: {
    marginBottom: theme.spacing(2),
  },
}));

export default function PageProduct() {
  const classes = useStyles();

  const { id }: any = useParams();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    axios
      .get(`${API_PATHS.product}/products/${id}`)
      .then((res) => setProduct(res.data));
    // setProducts(productList);
  }, []);

  return (
    <div className={classes.content}>
      {product && (
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={5}>
            <Box
              
              sx={{
                paddingTop: "56.25%", // 16:9
                position: "relative",
              }}
            >
              <img
                src={product.thumnbnail}
                alt={product.title}
                loading="lazy"
                className={classes.cardImage}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={7}>
            <Typography
              variant="h3"
              component="h1"
              className={classes.pageTitle}
            >
              {product.title}
            </Typography>
            <Typography>{formatAsPrice(product.price)}</Typography>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
