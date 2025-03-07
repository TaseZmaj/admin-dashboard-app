import { Button, Typography } from "@mui/material";
import { Link } from "react-router";

function Homepage() {
  return (
    <div>
      <Button>Click me!</Button>
      <Typography>Dashboard Homepage</Typography>
      <Button>
        <Link to="/goods">Goods page</Link>
      </Button>
    </div>
  );
}

export default Homepage;
