import React from 'react';
import { Menu } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import DownloadPNG from './download-png';
import DownloadCSV from './download-csv';
import { metricsDataPropType } from './utils';

export default function DownloadMenu(props) {
    const { fileName, data } = props;

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button
                    className="inline-flex justify-center w-full p-2 text-sm font-medium text-white bg-black
                    rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2
                    focus-visible:ring-white focus-visible:ring-opacity-75"
                    role="button"
                    aria-label="Download"
                >
                    <EllipsisVerticalIcon className="w-5 h-5" aria-label="Download" />
                </Menu.Button>
            </div>
            <Menu.Items className="absolute right-0 w-56 mt-2 p-1 text-sm origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                    {({ active }) => (
                        <div
                            className={`${
                                active ? 'text-blue-600' : 'text-gray-600'
                            } rounded-md`}
                        >
                            <DownloadPNG fileName={fileName} />
                        </div>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <div
                            className={`${
                                active ? 'text-blue-600' : 'text-gray-600'
                            } rounded-md`}
                        >
                            <DownloadCSV
                                data={data}
                                fileName={fileName}
                            />
                        </div>
                    )}
                </Menu.Item>
            </Menu.Items>
        </Menu>
    );
}

DownloadMenu.propTypes = {
    fileName: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(metricsDataPropType).isRequired,
};
