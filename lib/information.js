import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import urlPropType from 'url-prop-type';
import doiPropType from 'doi-prop-type';
import dompurify from 'dompurify';
import Spinner from './spinner';
import packageJson from '../package.json';
import { formatLabel } from './utils';

export default class Information extends React.Component {
    constructor(props) {
        super(props);
        const params = 'events?aggregation=measure_uri&filter=work_uri:info:doi:';
        this.url = new URL(`${params}${props.doi}`, props.apiEndpoint);
        this.measuresUrl = new URL('measures', props.apiEndpoint);
        this.state = {
            data: [],
            dataIsLoaded: false,
        };
    }

    componentDidMount() {
        fetch(this.url)
            .then((res) => res.json())
            .then((jsonResponse) => {
                const measureUris = jsonResponse.data.map((m) => m.measure_uri);
                fetch(this.measuresUrl)
                    .then((res) => res.json())
                    .then((json) => {
                        const descriptions = json.data.filter((m) => measureUris.includes(m.measure_uri) && m.description.find((d) => d.locale_code === 'en_GB')).map((m) => {
                            const measure = m;
                            measure.description = m.description.find((d) => d.locale_code === 'en_GB').description;
                            return measure;
                        });
                        this.setState({
                            data: descriptions,
                            dataIsLoaded: true,
                        });
                    });
            });
    }

    render() {
        /* eslint-disable react/no-danger */
        const { dataIsLoaded, data } = this.state;
        if (!dataIsLoaded) return <Spinner />;
        const sanitizer = dompurify.sanitize;
        return (
            <div className="w-full h-full">
                <div className="w-full h-full overflow-y-auto bg-white rounded-2xl">
                    {data.length > 0 && (
                        <div>
                            <h1 className="text-lg bold p-4">Measures</h1>
                            {
                                data.map((measure) => {
                                    const description = sanitizer(measure.description);
                                    return (
                                        <Disclosure>
                                            {({ open }) => (
                                                <>
                                                    <Disclosure.Button
                                                        className="flex justify-between w-full px-4 py-2 text-sm border-1
                                                               border-blue-600 font-medium text-left text-blue-600
                                                               bg-white rounded-lg hover:bg-blue-100 focus:outline-none
                                                               focus-visible:ring focus-visible:ring-blue-600
                                                               focus:bg-blue-100 focus-visible:ring-opacity-75"
                                                    >
                                                        <span>{formatLabel(measure)}</span>
                                                        <ChevronUpIcon
                                                            className={`${
                                                                open ? 'transform rotate-180' : ''
                                                            } w-5 h-5 text-blue-600`}
                                                        />
                                                    </Disclosure.Button>
                                                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-600 bg-white">
                                                        <div
                                                            dangerouslySetInnerHTML={
                                                                { __html: description }
                                                            }
                                                        />
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    );
                                })
                            }
                            <hr />
                        </div>
                    )}
                    <div className="text-sm p-4">
                        <p>
                            {`Metrics Widget v${packageJson.version}`}
                        </p>
                        <p>
                            <a className="cursor-pointer underline" href="https://github.com/OpenBookPublishers/metrics-widget/">Source code</a>
                            {' '}
                            available under the MIT license.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

Information.propTypes = {
    apiEndpoint: urlPropType.isRequired,
    doi: doiPropType.isRequired,
};
