import React from 'react'
import PropTypes from 'prop-types';

const CButton = ({ color, textColor, contained, children, ...rest }) => {
	return (
		<div>{
			contained ?
				(<button {...rest} className={`border-2 border-${color} px-4 py-2 text-${textColor} rounded-lg duration-150 hover:scale-95 hover:bg-${color} shadow-lg hover:shadow-${color}/40`}>{children}</button>)
				:
				(<button {...rest} className={`bg-${color} px-4 py-2 text-${textColor} rounded-lg duration-150 hover:scale-95 shadow-lg hover:shadow-${color}/40`}>{children}</button>)}
		</div>
	)
}

CButton.defaultProps = {
	color: "primary",
	textColor: "white",
};

CButton.propTypes = {
	title: PropTypes.string,
	textColor: PropTypes.string,
};

export default CButton