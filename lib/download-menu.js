import React from "react";
import { DownloadPNG } from "./download-png";
import { Menu } from "@headlessui/react";

export class DownloadMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Menu>
                <Menu.Button>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='btn btn-primary float-right bg-flat-color-1 h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                    >
                        <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
                    </svg>
                </Menu.Button>
                <Menu.Items>
                    <Menu.Item>
                        {({ active }) => (
                            <DownloadPNG fileName={this.props.fileName} />
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Menu>
        );
    }
}
