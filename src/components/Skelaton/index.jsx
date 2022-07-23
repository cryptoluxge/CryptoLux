import React from 'react'
import PropTypes from "prop-types";

const index = ({ width, height }) => {
  return (
    <div className={`animate-pulse h-${height} w-${width} rounded-lg bg-zinc-400 dark:bg-zinc-500`}></div>
  )
}

index.defaultProps = {
  width: "12",
  height: "4",
};

index.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default index