import React from "react";
import { saveAs } from "file-saver";
import { PhotographIcon } from "@heroicons/react/outline";

export class DownloadPNG extends React.Component {
    constructor(props) {
        super(props);
        this.saveCanvas = this.saveCanvas.bind(this);
        this.state = {
            data: document.getElementById("canvas"),
            fileName: this.props.fileName,
        };
    }

    saveCanvas() {
        const fileName = this.state.fileName;
        //save to png
        const data = this.state.data;
        data.toBlob(function (blob) {
            saveAs(blob, `${fileName}.png`);
        });
    }

    render() {
        return (
            <button
                onClick={this.saveCanvas}
                className="group flex rounded-md items-center w-full px-2 py-2 text-sm"
                role="button"
            >
                <PhotographIcon className='h-6 w-6 mr-2' aria-hidden />
                Download Image
            </button>
        );
    }
}
