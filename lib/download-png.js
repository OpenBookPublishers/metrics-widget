import React from "react";
import { saveAs } from "file-saver";

export class DownloadPNG extends React.Component {
    constructor(props) {
        super(props);
        this.saveCanvas = this.saveCanvas.bind(this);
        this.state = {
            data: {},
            dataIsLoaded: false,
            fileName: "",
        };
    }

    componentDidMount() {
        this.setState({
            data: document.getElementById("canvas"),
            dataIsLoaded: true,
            fileName: this.props.fileName,
        });
    }

    saveCanvas() {
        const fileName = this.state.fileName;
        //save to png
        if (this.state.dataIsLoaded) {
            const data = this.state.data;
            data.toBlob(function (blob) {
                saveAs(blob, `${fileName}.png`);
            });
        }
    }

    render() {
        return (
            <a
                onClick={this.saveCanvas}
                class='btn btn-primary float-bottom bg-flat-color-1'
                title='Download as PNG'
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                >
                    <path
                        fillRule='evenodd'
                        d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                        clipRule='evenodd'
                    />
                </svg>
            </a>
        );
    }
}
