import React from "react";
import CsvDownload from "react-json-to-csv";
import {DocumentIcon} from "@heroicons/react/outline";

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
            >
                <div className="flex items-center group w-full px-2 py-2 text-sm">
                    <DocumentIcon className='h-6 w-6 mr-2' />
                    Download CSV
                </div>
            </CsvDownload>
        );
    }
}
