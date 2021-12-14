import React from "react";
import CsvDownload from "react-json-to-csv";

export class DownloadCSV extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            fileName: "",
        };
    }

    componentDidMount() {
        this.setState({
            data: this.props.data,
            fileName: this.props.fileName,
        });
    }

    render() {
        return (
            <CsvDownload
                data={this.state.data}
                filename={`${this.state.fileName}.csv`}
                style={{
                    //pass other props, like styles
                    boxShadow: "inset 0px 1px 0px 0px #e184f3",
                    background:
                        "linear-gradient(to bottom, #c123de 5%, #a20dbd 100%)",
                    backgroundColor: "#c123de",
                    borderRadius: "6px",
                    border: "1px solid #a511c0",
                    display: "inline-block",
                    cursor: "pointer",
                    color: "#ffffff",
                    fontSize: "15px",
                    fontWeight: "bold",
                    padding: "6px 24px",
                    textDecoration: "none",
                    textShadow: "0px 1px 0px #9b14b3",
                }}
            >
                Download CSV
            </CsvDownload>
        );
    }
}
