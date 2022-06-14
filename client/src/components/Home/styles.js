import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    [theme.breakpoints.down("sm")]: {
        gridContainer: {
            flexDirection: "column-reverse",
        }
    },
    appBarSearch: {
        borderRadius: 4,
        marginBottom: '1rem',
        display: 'flex',
        padding: '16px',
    },
    pagination: {
        borderRadius: 4,
        marginTop: '1rem',
        padding: '16px',
    },
    searchButton: {
        marginTop: '1rem',
    }
}))