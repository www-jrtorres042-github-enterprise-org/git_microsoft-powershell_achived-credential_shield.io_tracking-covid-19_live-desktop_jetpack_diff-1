/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

/**
 * Internal dependencies
 */
import './style.scss';
import PostDate from './components/post-date/';
import PostStatusLabel from './components/post-status-label/';

domReady( () => {
	const postRows = document.querySelectorAll( '.wp-list-table .entry' );
	if ( ! postRows?.length ) {
		return;
	}

	const postIds = [];
	postRows.forEach( postRow => {
		let postStatusLabelElement = postRow.querySelector( '.post-state' );
		const postDateElementWrapper = postRow.querySelector( '.column-date' );

		// Try to pick post data from custom column.
		let data;
		const rowDataContainer = postRow.querySelector(
			'.column-wp-admin-plus-column script[type="application/json"]'
		);
		try {
			data = JSON.parse( rowDataContainer.text );
		} catch ( e ) {
			// @TODO: improve error handling.
			// eslint-disable-next-line no-console
			return console.error( 'error parsing json: ', e );
		}

		// Clean data-container element.
		if ( data ) {
			rowDataContainer.remove();
		}

		// Populate component data with postIds.
		// @TODO: probably it's better doing it in the server-side.
		data = { ...data, postIds };

		// Collect all post ids in the current admin page.
		postIds.push( data.id );

		// Render post state component.
		if ( ! postStatusLabelElement ) {
			const postTitleLabelElement = postRow.querySelector( '.row-title' );

			// Inject element when it doesn't exist (publish state).
			if ( postTitleLabelElement ) {
				postStatusLabelElement = document.createElement( 'span' );
				postStatusLabelElement.classList.add( 'post-state' );
				postTitleLabelElement.parentNode.insertBefore( postStatusLabelElement, postTitleLabelElement.nextSibling );
				postTitleLabelElement.parentNode.insertBefore( document.createTextNode( ' — ' ), postTitleLabelElement.nextSibling );
			}

			render(
				<PostStatusLabel { ...data } fallbackText={ postStatusLabelElement.innerText } />,
				postStatusLabelElement
			);
		}


		// Render a component for each post row.
		if ( postDateElementWrapper ) {
			render(
				<PostDate { ...data } fallbackText={ postDateElementWrapper.innerText } />,
				postDateElementWrapper
			);
		}
	} );
} );