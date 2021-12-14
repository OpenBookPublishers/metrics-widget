import React from "react";
import { DownloadPNG } from "./download-png";
import { Menu } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import { DownloadCSV } from "./download-csv";

export class DownloadMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='w-1 text-right relative top-1'>
                <Menu as='div' className='relative inline-block text-left'>
                    <div>
                        <Menu.Button className='absolute top-0 bg-blue-500 text-white p-2 rounded hover:bg-blue-800 m-2'>
                            <span className='block px-1'>
                                <DotsVerticalIcon className='h-8 w-8 lg:h-6 lg:w-6 pt-1 mb-1 mx-auto block' />
                                <span className='lg:block text-xs pb-1 hidden'>
                                    Download Menu
                                </span>
                            </span>
                        </Menu.Button>
                    </div>
                    <Menu.Items className='w-1 text-right relative top-1'>
                        <Menu.Item>
                            {({ active }) => (
                                <DownloadPNG fileName={this.props.fileName} />
                            )}
                        </Menu.Item>
                    </Menu.Items>
                    <Menu.Items className='w-1 text-right relative top-1'>
                        <Menu.Item>
                            {({ active }) => (
                                <DownloadCSV
                                    data={this.props.data}
                                    fileName={this.props.fileName}
                                />
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Menu>
            </div>
        );
    }
}
