import Button from '@mui/material/Button';
import { getPersonExternalIds } from "../../api/tmdb-api";
import Spinner from '../spinner';
import { useQuery } from "react-query";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function MediaButton(person) {
  const { data, error, isLoading, isError } = useQuery(
    ["externalId", { id: person.person.id }],
    getPersonExternalIds
  );
  const externalIds = data;

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {externalIds.twitter_id ?
        (
          <Button size="small" href={`https://twitter.com/${externalIds.twitter_id}`}>
            <FacebookIcon color="primary" fontSize="large" />
          </Button>
        ) : null}
      {externalIds.facebook_id ?
        (
          <Button size="small" href={`https://facebook.com/${externalIds.facebook_id}`}>
            <TwitterIcon color="primary" fontSize="large" />
          </Button>
        ) : null}
      {externalIds.instagram_id ?
        (
          <Button size="small" href={`https://instagram.com/${externalIds.instagram_id}`}>
            <InstagramIcon color="primary" fontSize="large" />
          </Button>
        ) : null}
    </>
  );
}