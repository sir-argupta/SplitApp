import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
// material
import { styled, alpha } from "@mui/material/styles";
import {
  Input,
  Slide,
  Button,
  IconButton,
  InputAdornment,
  ClickAwayListener,
  TextField,
  CircularProgress ,
} from "@mui/material";
// component
import Iconify from "../../components/Iconify";
import { getEmailList } from "../../services/auth";
import { addUserFriend } from "../../services/friendsServices"

// ----------------------------------------------------------------------

const profile = JSON.parse(localStorage.getItem("profile"));
const emailId = profile?.emailId;

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: "100%",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  height: APPBAR_MOBILE,
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up("md")]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [emailOptions, setEmailOptions] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [isOpen, setOpen] = useState(false);
  const autocompleteService = { current: null };
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmails = async () => {
      const emails_response = await getEmailList();
      const emails = emails_response.data.user.filter(function (e) {
        return e !== emailId;
      });
      setEmailOptions(emails);
    };

    fetchEmails();
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedEmail(selectedOption);
  };

  const handleAddFriend = async () => {
    if (selectedEmail) {
        setLoading(true);
        try {
            await addUserFriend({ userEmail: emailId, friendEmail: selectedEmail });
        } finally {
            setLoading(false);
        }
    }
};

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" width={20} height={20} />
          </IconButton>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <Autocomplete
              options={emailOptions}
              onChange={(event, newValue) => {
                handleChange(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Search contacts with email..." />}
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search contacts with email..."
              noOptionsText="No Emails"
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: "text.disabled", width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: "fontWeightBold" }}
            />
            <Button variant="contained" onClick={handleAddFriend} disabled={!selectedEmail || loading}>
            {loading ? <CircularProgress size={24} /> : 'Add Friend'}
            </Button>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
