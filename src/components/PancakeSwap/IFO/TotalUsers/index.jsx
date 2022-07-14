import React, { useState, useEffect, useRef } from 'react'
import { ifo } from '../../../../config/PancakeSwap/constants/ifo';
import Card from '../../../Cards/Card'

const Index = () => {
  const mountedRef = useRef(true);
  const [users, setUsers] = useState();

  const getUserParticipated = async () => {
    const urlToFetch = `https://deep-index.moralis.io/api/v2/${ifo.poolContract}/erc20/transfers?chain=bsc&from_block=${ifo.startBlock}&to_block=${ifo.endBlock}`;
    fetch(urlToFetch, {
      headers: {
        "X-API-Key": "l7H7MfYwlfi1e7MjCpxbWsEWzLTudxOmgxJl4HvNixTrUduN1dZRHyW9ehyN4PXK",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.total);
      });
  }

  useEffect(() => {
    getUserParticipated()

    return () => {
      mountedRef.current = false;
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Card className='p-3 mt-4'>
      <p className='text-lightText dark:text-darkText'>Private და Public Sale-ში მონაწილეობა მიიღო</p>
      <p className='text-lightText dark:text-darkText font-semibold'>{users} ადამიანმა</p>
    </Card>
  )
}

export default Index