import React from 'react'
import { useParams } from 'react-router-dom';

export type UrlMapping = { 
  fullURL: string,
  urlKey: string
}

type RedirectRouteParams = {
  urlKey: string;
}

const RedirectRoute: React.FC = () => {
  const { urlKey } = useParams<RedirectRouteParams>();

  React.useEffect(() => {
    const endpoint = process.env.REACT_APP_SERVER_ENDPOINT
    if (endpoint === undefined) {
      return;
    }

    fetch(`${endpoint}${urlKey}`, {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
      mode: "cors",
    }).then(res => {
      console.log(res)
      if (res.status === 200) {
        res.json().then((res: UrlMapping) => {
          console.log(res)
          if (res.fullURL !== urlKey) { 
            window.location.replace(res.fullURL)
          }
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div>RedirectRoute</div>
  )
}

export default RedirectRoute