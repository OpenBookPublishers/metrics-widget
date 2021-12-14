import React from "react";
import { saveAs } from "file-saver";
import { PhotographIcon } from "@heroicons/react/outline";

export class DownloadPNG extends React.Component {
    constructor(props) {
        super(props);
        this.saveCanvas = this.saveCanvas.bind(this);
        this.state = {
            data: {},
            fileName: "",
        };
    }

    componentDidMount() {
        this.setState({
            data: document.getElementById("canvas"),
            fileName: this.props.fileName,
        });
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
            <div className='flex bg-white'>
                <div className='flex-1 group'>
                    <div
                        onClick={this.saveCanvas}
                        className={
                            "flex items-end justify-center text-center mx-auto cursor-pointer lg:px-4 py-2  w-full group-hover:text-blue-600 border-b-2 group-hover:border-blue-600"
                        }
                    >
                        <span className='block px-1'>
                            <PhotographIcon className='h-8 w-8 lg:h-6 lg:w-6 pt-1 mb-1 mx-auto block' />
                            <span className='lg:block text-xs pb-1 hidden'>
                                Download Image
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
