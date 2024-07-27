import { Grid, Typography, Container, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserContactService } from "../../services/friendsServices";
import Loading from "../loading";
import { Link as RouterLink } from 'react-router-dom';
import dataConfig from '../../config.json';
import ContactCards from "./contactCards";

const profile = JSON.parse(localStorage.getItem('profile'))
const emailId = profile?.emailId

export default function Contacts() {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [color] = useState(['primary', 'secondary', 'error', 'warning', 'info', 'success']);

  useEffect(() => {
    const getUserGroups = async () => {
      setLoading(true)
      const response_friend = await getUserContactService(profile.emailId)
      setContacts(response_friend.data.response)
      setLoading(false)
    }
    getUserGroups()
  }, []);

  const checkActive = (split) => {
    for (var key in split) {
      if (split.hasOwnProperty(key)) {
        if (Math.round(split[key]) != 0)
          return true
      }
    }
    return false
  }
  return (
    <Container>
      {loading ? <Loading /> :
        <>
          <Typography variant="h3" pb={2}>
            Your Contacts,
          </Typography>
          <Grid container spacing={4} >
            {contacts?.map(myContact => (
              <Grid item xs={12} md={6} lg={6} key={myContact?._id}>
                {/* <Link component={RouterLink}
                to={dataConfig.VIEW_CONTACT_URL+myContact?._id}
                sx={{ textDecoration: 'none' }}
              > */}
                <ContactCards
                  name={myContact?.firstName}
                  email={myContact?.emailId}
                  contactUrl={myContact?.emailId}
                  share={500}
                  currencyType={'INR'}
                  isContactActive={true}
                  color={color[Math.floor(Math.random() * 5)]}
                />
                {/* </Link> */}
              </Grid>
            ))}
          </Grid>
        </>}
    </Container>
  )
}
