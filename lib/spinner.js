import React from "react";

const styles = {
    spinner: {
        background: "transparent none repeat scroll 0 0 !important",
        width: "100px",
        height: "100px",
        borderRadius: "100%",
        borderStyle: "solid",
        borderWidth: "2px",
        borderImage: "none 100% / 1 / 0 stretch",
        borderColor: "rgb(37, 99, 235) rgb(37, 99, 235) transparent",
        display: "inline-block",
        animation: "1.5s linear 0s infinite normal both running animation-s8tf20",
    },
    container: {
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    }
};

export default function Spinner() {
    return (
        <div style={styles.container}>
            <span style={styles.spinner} />
        </div>
    )
}