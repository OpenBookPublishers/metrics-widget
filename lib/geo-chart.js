import React, { Component } from 'react';
import { Switch } from '@headlessui/react';
import urlPropType from 'url-prop-type';
import doiPropType from 'doi-prop-type';
import ContinentsChart from './continent-chart';
import CountryChart from './country-chart';

export default class GeoChart extends Component {
    constructor(props) {
        super(props);
        this.toggleTabContinent = this.toggleTabContinent.bind(this);
        this.toggleTabCountry = this.toggleTabCountry.bind(this);
        this.state = { tab: 'continent' };
    }

    toggleTabContinent() {
        this.setState({ tab: 'continent' });
    }

    toggleTabCountry() {
        this.setState({ tab: 'country' });
    }

    render() {
        const { tab } = this.state;
        const { doi, apiEndpoint } = this.props;

        return (
            <div className="h-full w-full">
                <div className="flex items-center justify-center mb-4">
                    <Switch
                        checked={tab !== 'continent'}
                        role="button"
                        tabIndex="0"
                        onChange={
                            tab !== 'continent'
                                ? this.toggleTabContinent
                                : this.toggleTabCountry
                        }
                        className={`${
                            tab !== 'continent'
                                ? 'text-gray-600 border-transparent'
                                : 'text-blue-600 border-blue-600'
                        } relative inline-flex items-center hover:text-blue-600 border-b-2 hover:border-blue-600 py-2 px-4 text-xs`}
                    >
                        <span>Usage By Continent</span>
                    </Switch>
                    <Switch
                        checked={tab === 'country'}
                        onChange={
                            tab === 'country'
                                ? this.toggleTabContinent
                                : this.toggleTabCountry
                        }
                        className={`${
                            tab !== 'country'
                                ? 'text-gray-600 border-transparent'
                                : 'text-blue-600 border-blue-600'
                        } relative inline-flex items-center hover:text-blue-600 border-b-2 hover:border-blue-600 py-2 px-4 text-xs`}
                    >
                        <span>Usage By Country</span>
                    </Switch>
                </div>
                <div className="h-5/6">
                    {tab === 'continent' && (
                        <ContinentsChart
                            apiEndpoint={apiEndpoint}
                            doi={doi}
                            showTitle={false}
                        />
                    )}
                    {tab === 'country' && (
                        <CountryChart
                            apiEndpoint={apiEndpoint}
                            doi={doi}
                            showTitle={false}
                        />
                    )}
                </div>
            </div>
        );
    }
}

GeoChart.propTypes = {
    apiEndpoint: urlPropType.isRequired,
    doi: doiPropType.isRequired,
};
