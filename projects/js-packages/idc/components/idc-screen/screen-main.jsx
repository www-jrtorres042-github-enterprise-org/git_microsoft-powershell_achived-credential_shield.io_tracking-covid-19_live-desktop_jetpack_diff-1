/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { createInterpolateElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { getRedirectUrl } from '@automattic/jetpack-components';

/**
 * Internal dependencies
 */
import CardMigrate from '../card-migrate';
import CardFresh from '../card-fresh';
import SafeMode from '../safe-mode';
import customContentShape from '../../tools/custom-content-shape';

/**
 * Retrieve the main screen body.
 *
 * @param {object} props - The properties.
 * @returns {React.Component} The ScreenMain component.
 */
const ScreenMain = props => {
	const {
		wpcomHomeUrl,
		currentUrl,
		isMigrating,
		migrateCallback,
		isStartingFresh,
		startFreshCallback,
		customContent,
	} = props;

	return (
		<React.Fragment>
			<h2>{ customContent.mainTitle || __( 'Safe Mode has been activated', 'jetpack' ) }</h2>

			<p>
				{ customContent.mainBodyText ||
					createInterpolateElement(
						__(
							'Your site is in Safe Mode because you have 2 Jetpack-powered sites that appear to be duplicates. ' +
								'2 sites that are telling Jetpack they’re the same site. <safeModeLink>Learn more about safe mode.</safeModeLink>',
							'jetpack'
						),
						{
							safeModeLink: (
								<a
									href={ getRedirectUrl( 'jetpack-support-safe-mode' ) }
									rel="noopener noreferrer"
									target="_blank"
								/>
							),
						}
					) }
			</p>

			<h3>{ __( 'Please select an option', 'jetpack' ) }</h3>

			<div className="jp-idc__idc-screen__cards">
				<CardMigrate
					wpcomHomeUrl={ wpcomHomeUrl }
					currentUrl={ currentUrl }
					isMigrating={ isMigrating }
					migrateCallback={ migrateCallback }
					customContent={ customContent }
				/>
				<div className="jp-idc__idc-screen__cards-separator">or</div>
				<CardFresh
					wpcomHomeUrl={ wpcomHomeUrl }
					currentUrl={ currentUrl }
					isStartingFresh={ isStartingFresh }
					startFreshCallback={ startFreshCallback }
					customContent={ customContent }
				/>
			</div>

			<SafeMode />
		</React.Fragment>
	);
};

ScreenMain.propTypes = {
	/** The original site URL. */
	wpcomHomeUrl: PropTypes.string.isRequired,
	/** The current site URL */
	currentUrl: PropTypes.string.isRequired,
	/** Whether the migration is in progress. */
	isMigrating: PropTypes.bool.isRequired,
	/** Migration callback. */
	migrateCallback: PropTypes.func,
	/** Whether starting fresh is in progress. */
	isStartingFresh: PropTypes.bool.isRequired,
	/** "Start Fresh" callback. */
	startFreshCallback: PropTypes.func,
	/** Custom text content. */
	customContent: PropTypes.shape( customContentShape ),
};

ScreenMain.defaultProps = {
	isMigrating: false,
	isStartingFresh: false,
	customContent: {},
};

export default ScreenMain;
