import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

export const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Container maxWidth="xl">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography>TO-DO app</Typography>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(location.pathname === "/profile" ? "/home" : "/profile")}
                  >
                     {location.pathname === "/profile" ? "Tasks" : "Registry"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => dispatch(setLogout())}
                  >
                    Log Out
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
