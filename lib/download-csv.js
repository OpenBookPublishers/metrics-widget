import React from 'react';
import CsvDownload from 'react-json-to-csv';
import { DocumentIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';

export default class DownloadCSV extends React.Component {
    constructor(props) {
        super(props);
        const { data, fileName } = this.props;
        this.state = {
            data,
            fileName,
        };
    }

    render() {
        const { data, fileName } = this.state;
        return (
            <CsvDownload
                data={data}
                filename={`${fileName}.csv`}
                className="flex items-center group w-full px-2 py-2 text-sm"
                role="button"
            >
                <DocumentIcon className="h-6 w-6 mr-2" aria-hidden />
                Download CSV
            </CsvDownload>
        );
    }
}

DownloadCSV.propTypes = {
    fileName: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
};
