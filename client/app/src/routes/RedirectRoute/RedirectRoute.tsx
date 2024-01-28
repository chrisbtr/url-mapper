import React from "react";
import { useParams } from "react-router-dom";
import urlMappingsApi from "../../api/urlMappings";

type RedirectRouteParams = {
  urlKey: string;
};

const RedirectRoute: React.FC = () => {
  const { urlKey } = useParams<RedirectRouteParams>();

  // On component mount fetch the full URL using `urlKey` route parameter and redirect
  React.useEffect(() => {
    if (urlKey === undefined) {
      return;
    }

    urlMappingsApi
      .get(urlKey)
      .then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.fullURL !== urlKey) {
          window.location.replace(res.data.fullURL);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div>RedirectRoute</div>;
};

export default RedirectRoute;
