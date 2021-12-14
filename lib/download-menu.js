import React from "react";
import { DownloadPNG } from "./download-png";
import { Menu } from "@headlessui/react";

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
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                            >
                                <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
                            </svg>
                        </Menu.Button>
                    </div>
                    <Menu.Items className='w-1 text-right relative top-1'>
                        <Menu.Item>
                            {({ active }) => (
                                <DownloadPNG fileName={this.props.fileName} />
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Menu>
            </div>
        );
    }
}
