import React, { PureComponent } from 'react';

export default class MapBoxPopup extends PureComponent {

    render() {
        const { info } = this.props;

        return (
            <div>
                <div>
                    {info.popUpStr}
                    {/* <a target="_new"
                        href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayName}`}>
                        Wikipedia
                    </a> */}
                </div>
            </div>
        );
    }
}