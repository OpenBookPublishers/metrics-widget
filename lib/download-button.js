import React from "react";
import { saveAs } from "file-saver";

export class DownloadButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            dataIsLoaded: false,
        };
    }

    componentDidMount() {
        this.setState({
            data: document.getElementById(this.props.element),
            dataIsLoaded: true,
        });
    }

    saveCanvas() {
        //save to png
        if (this.state.dataIsLoaded) {
            const data = this.state.data;
            data.toBlob(function (blob) {
                saveAs(blob, "testing.png");
            });
        }
    }

    render() {
        return (
            <a
                onClick={this.saveCanvas}
                class='btn btn-primary float-right bg-flat-color-1'
                title='Download as PNG'
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='btn btn-primary float-right bg-flat-color-1 h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                >
                    <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
                </svg>
            </a>
        );
    }
}
