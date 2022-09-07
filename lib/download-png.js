import React from 'react';
import { saveAs } from 'file-saver';
import { PhotographIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';

export default class DownloadPNG extends React.Component {
    constructor(props) {
        super(props);
        const { fileName } = this.props;
        this.saveCanvas = this.saveCanvas.bind(this);
        this.state = {
            data: document.getElementById('canvas'),
            fileName,
        };
    }

    saveCanvas() {
        const { fileName } = this.state;
        // save to png
        const { data } = this.state;
        data.toBlob((blob) => {
            saveAs(blob, `${fileName}.png`);
        });
    }

    render() {
        return (
            <button
                onClick={this.saveCanvas}
                className="group flex rounded-md items-center w-full px-2 py-2 text-sm"
                type="button"
            >
                <PhotographIcon className="h-6 w-6 mr-2" aria-hidden />
                Download Image
            </button>
        );
    }
}

DownloadPNG.propTypes = {
    fileName: PropTypes.string.isRequired,
};
