import { ListItem } from 'konsta/react';
import { useNavigate } from 'react-router-dom';
import { SiGithubsponsors } from 'react-icons/si';

const SponsorsListItem = () => {
  const navigate = useNavigate();

  return <ListItem media={<SiGithubsponsors size={26} />} title={'Sponsors'} link onClick={() => navigate('/sponsors')} />;
};

export default SponsorsListItem;
