import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

type LoadingProps = {
  messagae: string;
};

const Loading = ({ messagae }: LoadingProps) => {
  return (
    <Backdrop
      open={true}
      sx={{
        display: "flex",
        flexDirection: "column",
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <CircularProgress color="inherit" />
      <p className="mt-2">{messagae}</p>
    </Backdrop>
  );
};

export default Loading;
