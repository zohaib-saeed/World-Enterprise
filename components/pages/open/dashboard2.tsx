import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { AppBar, Autocomplete, AutocompleteRenderInputParams, Avatar, Button, CircularProgress, Container, createFilterOptions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, InputAdornment, InputBase, List, ListItemAvatar, ListItemButton, ListItemText, MenuItem, Paper, TextField, Toolbar, Typography, Unstable_Grid2 as Grid2, Menu } from '@mui/material'
import { AccountCircle, Add, ArrowForwardIos, Menu as MenuIcon, Person, Search } from '@mui/icons-material'
import { useDispatch, useSelector } from "react-redux";
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { selectEnterprisesState, setEnterpriseInfoState, resetAdminState, setTempEnterpriseState } from "../../../store/enterprisesSlice";
import { Enterprise } from "../../../store/types";
import { JoinModal } from "../../dialog";
import { request } from "https";
import { useWeb3React } from "@web3-react/core";
import { Input } from "../../input";

const DashBoard2: React.FC = () => {
  const { account, deactivate } = useWeb3React()
  const enterprisesState = useSelector(selectEnterprisesState)
  const router = useRouter()
  const dispatch = useDispatch()

  const [isMine, setIsMine] = useState(true)
  const [idx, setIdx] = useState(-1)
  const [dlgOpened, setDlgOpened] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchWord, setSearchWord] = useState("")

  const newHandler = () => {
    router.push("/create")
  }

  const searchHandler = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter') {
      // Prevent's default 'Enter' behavior.
      evt.preventDefault()
      // your handler code
    }
  }

  const onClickItem = (idx: number) => () => {
    console.log(idx)
    console.log(enterprisesState)
    if (enterprisesState[idx]) {
      if (!enterprisesState[idx].mine) {
        setIdx(idx)
        setDlgOpened(true)
      } else {
        requestHandler(idx)()
      }
    } 
  } 

  const requestHandler = (idx: number) => () => {
    const enterprise = enterprisesState[idx]
    console.log(enterprise)
    dispatch(setEnterpriseInfoState(enterprise.info))
    dispatch(resetAdminState(enterprise.admins))
    dispatch(setTempEnterpriseState(enterprise))
    router.push(`/${enterprise.info.wepID}/dashboard`)
  }

  const switchHandler = (isMine: boolean) => () => {
    setIsMine(isMine)
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDisconnect = () => {
    handleClose()
    deactivate()
  }

  const handleSearchInput: React.ChangeEventHandler<HTMLInputElement> = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value
    setSearchWord(value)
  }
  
  return (
    <>
      <Container sx={{  width: "100%", m:0, maxWidth: "5000px!important", }}>
        <AppBar component="div" position="static" sx={{ boxShadow: "none", px: 0, py: 2}}>
          <Toolbar sx={{px:"0!important"}}>
            <Typography variant="h1" component="div" sx={{ flexGrow: 1, px:"0!important" }}>
              World Enterprise
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ ml: 2, p: 0 }}
            >
              {account ? (
                <>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    // sx={{ mr: 1 }}
                  >
                    <AccountCircle fontSize="large" />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
                  </Menu>
                </>
                // <div>
                // </div>
              ) : (
                <MenuIcon fontSize="large"/>
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Container>
      <Container sx={{ display: "flex", px: 2, py: 0, width: "100%" }}
        maxWidth={false}
      >
        <Grid component="h2" container onClick={switchHandler(!isMine)}
          sx={{
            width: "100%",
            lineHeight: "40px",
            py: 0,
            my: 0,
            mr: 2,
            ml: 0,
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '15px',
            textAlign: 'center',
            borderRadius: "8px",
            border: "1px solid #E3E8EB",
            cursor: "pointer",
          }}
        >
          <Grid item xs={6} component="div" style={{
            display: "inline-block",
            borderRadius: "8px",
            backgroundColor: isMine ? "#3D61B0" : "#ffffff",
            color: isMine ? "#ffffff" : "#96A3AA",
          }}>
            My Enterprises
          </Grid>
          <Grid item xs={6} component="div" style={{
            display: "inline-block",
            borderRadius: "8px",
            backgroundColor: isMine ? "#ffffff" : "#3D61B0",
            color: isMine ? "#96A3AA" : "#ffffff",
          }}>
            All Enterprises
          </Grid>
        </Grid>
        <Button sx={{
          // marginLeft: "-51px",
          // paddingLeft: "-51px",
          p: 0,
          border: "1px solid #3D61B0",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          boxShadow: "0",
          
          minWidth: "42px",
          // "& .MuiTouchRipple-root": {
          //   width: "40px!important",
          //   background: "#ff0000",
          // },
          ":hover": {
            backgroundColor: "#ffffff",
          }
        }}
        onClick={newHandler}>
        <Add fontSize="large" htmlColor="#3D61B0" sx={{
            p: 0
          }} />
        </Button>
        {/* <IconButton>
        </IconButton> */}
      </Container>
      <Container sx={{ mt: 2, px: 2, width: "100%" }} maxWidth={false}>
        {/* <Paper
          component="div"
          sx={{ display: 'flex', alignItems: 'center', width: "100%" }}
        > */}
          <Autocomplete
            fullWidth
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={enterprisesState.filter((enterprise)=> !isMine || (isMine && enterprise.mine)).map((enterprise) => enterprise.info.name)}
            renderInput={(params: AutocompleteRenderInputParams) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search htmlColor="#96A3AA"/>
                    </InputAdornment>
                  )
                }}
                value={searchWord}
                onChange={handleSearchInput}
                placeholder="Search Enterprise"
                sx={{
                  height: "42px",
                  backgroundColor: "#FFFFFFFF",
                  border: '1px solid #E3E8EB',
                  borderRadius: "8px",

                  '& .MuiInputBase-root:hover': {
                    // borderColor: "#FF0000",
                    // WebkitTapHighlightColor: "#FF0000!important",
                    // backgroundColor: "#FF0000",
                  },

                  // backgroundColor: "#FF0000",
                  // borderColor: "#00FFFF",
                  '& input': {
                    // height: "42px",
                    // backgroundColor: "#FFFFFFFF",
                    boxShadow: "none",
                    color: "#4B4749",
                    fontSize: "15px!important",
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                    lineHeight: "18.29px",
                    padding: '0!important',
                  },
                  '& fieldset': {
                    height: "42px",

                    border: '1px solid #FFFFFFFF',
                    '& fieldset:focus': {
                      border: '1px solid #ced4da !important',
                    },
                    '&:focus': {
                      // boxShadow: `0 0 0 0.2rem`,
                    },
                  },
                }}
              />
            )}
            renderOption={(props, option, { inputValue }) => {
              console.log(props, option, { inputValue })
              const matches = match(option, inputValue, { insideWords: true });
              const parts = parse(option, matches);

              return (
                <>
                  <Divider/>
                  <li {...props} style={{ paddingLeft: "9px", }}>
                    <Search fontSize="small" htmlColor="#96A3AA" sx={{ mr: 1 }} />
                    <div>
                      {parts.map((part, index) => (
                        <span
                          key={index}
                          style={{
                            fontWeight: part.highlight ? 700 : 400,
                          }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </div>
                  </li>
                </>
              );
            }}
            onKeyDown={searchHandler}
            onSubmit={()=>{}}
          />
        {/* </Paper> */}
      </Container>
      <Grid2
        container
        component="main"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          p: 0,
          // mt: 4,
        }}
      >

        <List dense={true} sx={{ width: "100%", pt: 2, px: 0 }}>
          <Divider />
          {enterprisesState.map((enterprise: Enterprise, idx: number) => {
            console.log(enterprise.info.name.toLowerCase().indexOf(searchWord.toLowerCase()))
            if ((!isMine || (isMine && enterprise.mine)) && enterprise.info.name.toLowerCase().indexOf(searchWord.toLowerCase()) > -1) {
              return (
                <Item key={idx} avatar={enterprise.info.logo} title={enterprise.info.name} content={enterprise.info.tokenName} onClick={onClickItem(idx)} />
              )
            }

          })}
        </List>
      </Grid2>
      {enterprisesState[idx] && (
        <JoinModal
          open={dlgOpened}
          onClose={()=>{setDlgOpened(false)}}
          name={enterprisesState[idx].info.name}
          shareToBuy={150}
          offerPrice={1.5}
          request={requestHandler(idx)}
        />
      )}
    </>
  )
}

export const Item = ({avatar, title, content, onClick}: {avatar: string, title: string, content :string, onClick: Function}) => {
  return (
    <>
      <ListItemButton
        component="div"
        sx={{
          px: 3,
          py: 1,
        }}
        onClick={()=>{ onClick() }}
      >
        <ListItemAvatar sx={{ pr: 2}}>
          <Avatar sx={{ width: "63px", height: "63px" }}>
            {avatar == "" ? (
              <Person fontSize="large" htmlColor="#4B4749"/>
            ) : (  
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="" src={ avatar } style={{ width: "42px" }} />
            )}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={content}
          primaryTypographyProps={{
            fontFamily: "Montserrat",
            fontSize: "15px",
            fontWeight: "600",
            lineHeight: "18px",
            letterSpacing: "0px",
            textAlign: "left",
          }}
          secondaryTypographyProps={{
            mt: 1,
            fontFamily: "Montserrat",
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "15px",
            letterSpacing: "0px",
            textAlign: "left",
          }}
          sx={{
            display: "block",
            width: "100%"
          }}
        />
        <IconButton edge="end" aria-label="delete">
          <ArrowForwardIos fontSize="small"/>
        </IconButton>
      </ListItemButton>
      <Divider />
    </>
  )
}

export default DashBoard2